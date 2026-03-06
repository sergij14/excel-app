# Case Study: Excel App — Building a Spreadsheet Application with a Custom Vanilla JavaScript Framework

## 1. Project Overview

**Excel App** is a fully functional spreadsheet application built entirely with vanilla JavaScript — no UI frameworks, no state management libraries, no third-party runtime dependencies. The project implements a custom web framework from scratch that includes:

- **Component lifecycle management** (init, render, destroy)
- **Reactive state management** (Store with subscriber pattern)
- **Client-side routing** (hash-based SPA router)
- **Event-driven inter-component communication** (custom Emitter)
- **DOM abstraction layer** (jQuery-like wrapper)
- **Persistent storage layer** (LocalStorage with debounced writes)

### Feature Set

| Feature | Description |
|---------|-------------|
| Spreadsheet grid | 26 columns (A–Z) × 20 rows with editable cells |
| Column/row resizing | Drag-to-resize with visual boundaries and size tooltips |
| Cell selection | Click, Ctrl+click multi-select, keyboard navigation (arrow keys, Tab, Enter) |
| Formula bar | Synced input that reflects and updates the active cell's value |
| Formula parsing | `=` prefix triggers JavaScript expression evaluation |
| Text formatting | Bold, italic, underline, text alignment — applied per cell |
| Persistent state | All data auto-saved to LocalStorage with debounced writes |
| Multi-table support | Dashboard page lists all tables; create new or revisit existing ones |
| SPA routing | Hash-based routing between Dashboard and Excel pages |
| Table management | Rename, delete, and navigate between spreadsheets |

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | Vanilla JavaScript (ES Modules) |
| Styling | Tailwind CSS 3.4 with `@apply` directives |
| Bundler | Vite 6 |
| Testing | Vitest with jsdom |
| Icons | Font Awesome 6 |

---

## 2. Problem Statement & Motivation

The goal was not to build "another spreadsheet" — it was to demonstrate **deep understanding of how modern frontend frameworks work internally** by building one from scratch and using it to power a non-trivial application.

This project answers the question: *"If React, Vue, and Angular didn't exist, could you build a production-quality interactive application?"*

### Why Vanilla JavaScript?

1. **Framework internals understanding** — Building a Store, Router, Emitter, and component lifecycle from zero forces you to deeply understand the patterns that React/Vue abstract away.
2. **Architectural decision-making** — Without an opinionated framework, every design choice (how components communicate, how state flows, how DOM updates happen) must be made explicitly.
3. **Performance awareness** — No virtual DOM or reconciliation engine means you must think carefully about when and what to re-render.

---

## 3. Technical Decisions & Architecture

### High-Level Architecture

```
┌──────────────────────────────────────────────────────┐
│                     index.js                         │
│              (Router initialization)                 │
├──────────────┬───────────────────────────────────────┤
│  Dashboard   │            Excel Page                 │
│    Page      │  ┌─────────────────────────────────┐  │
│              │  │ Store (centralized state)        │  │
│              │  ├─────────────────────────────────┤  │
│              │  │ Excel (component orchestrator)   │  │
│              │  │  ├── Header                     │  │
│              │  │  ├── Toolbar                    │  │
│              │  │  ├── Formula                    │  │
│              │  │  └── Table                      │  │
│              │  │       └── TableSelection        │  │
│              │  ├─────────────────────────────────┤  │
│              │  │ Emitter (cross-component events) │  │
│              │  │ StateProcessor → LocalStorage    │  │
│              │  └─────────────────────────────────┘  │
└──────────────┴───────────────────────────────────────┘
```

### Class Hierarchy

```
Page
  └── DashboardPage
  └── ExcelPage

DomListener
  └── AppComponent
        └── AppStateComponent
              └── Toolbar
        └── Formula
        └── Header
        └── Table
```

### Key Architectural Decision: Inheritance over Composition for Components

The component system uses a class-based inheritance hierarchy:

- **`DomListener`** — Base class that handles addEventListener/removeEventListener with automatic method binding
- **`AppComponent`** extends DomListener — Adds lifecycle (init/destroy), emitter integration, and store access
- **`AppStateComponent`** extends AppComponent — Adds local state management with `setState()` and template re-rendering

This was a deliberate design choice: each layer of the inheritance chain adds exactly one responsibility, following the single-responsibility principle within an OOP paradigm.

---

## 4. Custom Framework Design

### 4.1 DOM Abstraction (`Dom` class)

The `Dom` class wraps native DOM elements with a chainable API, reducing boilerplate across the application.

```javascript
// Native DOM
const el = document.querySelector('.cell');
el.innerHTML = 'Hello';
el.style.width = '120px';
el.classList.add('selected');

// With Dom wrapper
$('.cell').html('Hello').css({ width: '120px' }).addClass('selected');
```

**Design decisions:**
- **Dual-purpose methods**: `.html()` with no args returns HTML; with args sets it. Same pattern for `.text()`. This mirrors jQuery's API philosophy.
- **Factory method**: `$.create('div', 'className')` as a static method for element creation, keeping the constructor focused on wrapping existing elements.
- **Input handling**: The `.text()` method intelligently handles both `contenteditable` divs (via `textContent`) and `<input>` elements (via `value`).

### 4.2 Event System (`DomListener`)

```javascript
class DomListener {
  initListeners() {
    this.listeners.forEach((listener) => {
      const method = `on${capitalize(listener)}`;  // "click" → "onClick"
      this[method] = this[method].bind(this);
      this.$el.on(listener, this[method]);
    });
  }
}
```

**Convention-based binding**: Components declare which DOM events they care about via a `listeners` array (e.g., `['mousedown', 'keydown', 'input']`). The system auto-binds methods following the `on{EventName}` naming convention. This is conceptually similar to how Angular's `@HostListener` works, but resolved at init-time rather than via decorators.

**Why this matters**: The developer never manually calls `addEventListener` or worries about `this` binding — two of the most common sources of bugs in vanilla JS applications.

### 4.3 Event Emitter

The `Emitter` class implements a pub/sub system for cross-component communication:

```javascript
// Table emits when a cell is selected
this.emit('Table:Select', { $cell, currentStyles });

// Formula subscribes to update its input
this.subscribe('Table:Select', ({ $cell }) => {
  this.$formula.text($cell.attr('data-value'));
});
```

**Design decisions:**
- **Numeric keys for listeners** instead of array indices — enables O(1) unsubscription via `delete` without array splicing
- **Returns unsubscribe function** — follows the same pattern as Redux's `store.subscribe()`, enabling clean teardown
- **Namespaced events** — `ComponentName:EventName` convention prevents collisions

### 4.4 Store (State Management)

The Store implements a simplified Redux-like pattern:

```javascript
class Store {
  setStore(value) {
    const currState = clone(this.state);
    const nextState = clone(
      typeof value === 'function' ? value(currState) : value
    );
    this.state = nextState;
    this.listeners.forEach(listener => listener(this.state));
  }
}
```

**Key design choices:**
- **Functional updates**: `setStore(prev => ({ ...prev, key: value }))` prevents stale state bugs — directly inspired by React's `setState` with updater functions
- **Deep cloning on read/write**: `getStore()` returns a clone, preventing accidental state mutation — enforcing immutability without Immer or Object.freeze
- **Flat subscriber list**: All listeners fire on every state change; the `StoreSubscriber` handles granular filtering

### 4.5 StoreSubscriber (Selective Re-rendering)

```javascript
subscribeComponents(components) {
  this.unsub = this.store.subscribe((state) => {
    Object.keys(state).forEach((key) => {
      if (!isEqual(this.prevState[key], state[key])) {
        components.forEach((component) => {
          if (component.storeSubscribedFields.includes(key)) {
            component.storeChanged({ [key]: state[key] });
          }
        });
      }
    });
    this.prevState = this.store.getStore();
  });
}
```

This solves the **performance problem** of notifying all components on every state change. Each component declares which state keys it cares about via `storeSubscribedFields`. The subscriber does a **shallow equality check** per key and only notifies components whose relevant state actually changed. This is conceptually equivalent to Redux's `mapStateToProps` or React's `useSyncExternalStoreWithSelector`.

### 4.6 Router

The Router implements hash-based SPA navigation with:

- **Async page rendering**: `await page.getContainer()` supports pages that need to fetch data before rendering (e.g., loading saved state from storage)
- **Loading and error states**: Displays a spinner during async operations and an error view on failure, with automatic redirect to home
- **Page lifecycle**: `getContainer()` → `afterRender()` → `destroy()` — a clean lifecycle that ensures components are properly initialized and torn down
- **Multi-path support**: Routes can match an array of paths (`["/", "dashboard"]`), enabling aliases without duplication

---

## 5. Key Engineering Challenges & Solutions

### Challenge 1: Column/Row Resizing with Synchronized Widths

**Problem**: When a column header is resized, all cells in that column must resize simultaneously. This requires finding and updating potentially hundreds of DOM elements during a drag operation.

**Solution**: The resize handler uses `data-col` attributes to query all cells in a column:

```javascript
const $cells = $el.findAll(`[data-col="${$parent.dataset.col}"]`);
$cells.forEach((el) => $(el).css({ width: `${width}px` }));
```

The resize operation is wrapped in a Promise that only resolves on `mouseup`, and the state update happens **once** at the end — not on every `mousemove`. The visual feedback (resizer line, tooltip) updates during drag, but the store write only happens at completion.

### Challenge 2: Formula Parsing Without a Parser

**Problem**: Users expect `=2+2` to display `4`, `=Math.sqrt(16)` to display `4`, etc.

**Solution**: Used `eval()` for expression evaluation, wrapped in a try-catch:

```javascript
export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1));
    } catch (err) {
      return value;
    }
  }
  return value;
}
```

**Trade-off acknowledged**: `eval()` is a security concern in production. For this project, the trade-off was acceptable because (a) it's a client-only application with no server-side execution, (b) the user is only evaluating their own input, and (c) building a full expression parser was outside the scope. A production version would use a sandboxed expression evaluator or a proper AST-based parser.

### Challenge 3: Preventing State Update Storms

**Problem**: As users type in cells, every keystroke triggers a state update → store notification → subscriber checks → potential re-renders. This could cause performance issues.

**Solution**: Layered defense:

1. **`StoreSubscriber` with shallow equality** — Only notifies components whose subscribed state keys actually changed
2. **`storeSubscribedFields` whitelist** — Components opt-in to specific state keys (e.g., Formula only watches `currentText`)
3. **Debounced persistence** — `StateProcessor` wraps `LocalStorageClient.save()` with a 300ms debounce, batching rapid writes
4. **Debounced Header input** — The table title input is also debounced at 300ms

### Challenge 4: Clean Component Teardown

**Problem**: Navigating between pages means components must be fully destroyed — event listeners removed, store subscriptions cancelled, emitter subscriptions cleared. Memory leaks in SPAs are silent and cumulative.

**Solution**: Each layer handles its own cleanup:

```javascript
// AppComponent.destroy()
destroy() {
  this.removeListeners();         // DomListener: removes DOM event listeners
  this.unsubs.forEach(unsub => unsub());  // Emitter: removes event subscriptions
}

// ExcelPage.destroy()
destroy() {
  this.excel.destroy();    // Destroys all child components
  this.storeUnsub();       // Removes store → persistence subscription
}

// StoreSubscriber.unsubscribe()
unsubscribe() {
  this.unsub();  // Removes global store subscription
}
```

Every `subscribe()` call returns an unsubscribe function that is collected and called on destroy. This pattern ensures zero leaked listeners.

---

## 6. State Management Architecture

### State Shape

```javascript
{
  toolbar: {},           // (reserved for future toolbar state)
  colState: {            // Column widths: { colIndex: widthPx }
    "0": 200,
    "3": 150
  },
  rowState: {            // Row heights: { rowIndex: heightPx }  
    "5": 40
  },
  dataState: {           // Cell values: { "row:col": value }
    "0:0": "Hello",
    "0:1": "=2+2",
    "3:5": "World"
  },
  dataStyles: {          // Cell styles: { "row:col": styleObject }
    "0:0": { fontWeight: "bold", textAlign: "center" }
  },
  currentText: "",       // Currently active cell's raw value
  tableTitle: "Table Name",
  date: "12/28/2024, 10:30:00 AM"
}
```

### Data Flow

```
User Action → Component Handler → store.setStore(updater)
                                        ↓
                              Store notifies listeners
                                        ↓
                         ┌──────────────┼──────────────┐
                         ↓              ↓              ↓
                  StoreSubscriber   StateProcessor   (other)
                    (UI updates)   (debounced save)
                         ↓
              Component.storeChanged({ key: newValue })
                         ↓  
                    DOM update
```

This is a **unidirectional data flow** — the same pattern as Redux/Flux. Components never modify state directly; they dispatch updates through the Store, which notifies all subscribers. The `StateProcessor` subscribes to the Store like any other listener, transparently persisting every change.

---

## 7. Component Communication Patterns

The application uses **two** communication channels, each for a specific purpose:

### Emitter: Peer-to-Peer Component Events

Used when components need to react to each other's user interactions in real-time:

| Event | Producer | Consumer(s) | Purpose |
|-------|----------|-------------|---------|
| `Table:Select` | Table | Formula, Toolbar | Sync formula bar text, update toolbar button states |
| `Formula:Input` | Formula | Table | Update active cell content from formula bar |
| `Formula:InputDone` | Formula | Table | Return focus to cell after Enter/Tab in formula bar |
| `Toolbar:ApplyStyle` | Toolbar | Table | Apply bold/italic/underline/alignment to selected cells |

### Store: Centralized State Updates

Used for persistent state that must survive page navigation and be shared across the app:

| State Key | Written By | Read By |
|-----------|-----------|---------|
| `currentText` | Table | Formula |
| `colState` | Table (resize) | Table (render) |
| `rowState` | Table (resize) | Table (render) |
| `dataState` | Table | Table (render) |
| `dataStyles` | Table | Table (render) |
| `tableTitle` | Header | Header (render), Dashboard |

**Why two systems?** The Emitter handles **ephemeral UI synchronization** (e.g., "the user typed in the formula bar, update the cell") while the Store handles **persistent application state** (e.g., "save this cell's value so it survives a page refresh"). This separation prevents the Store from becoming a dumping ground for transient UI state.

---

## 8. Performance Optimizations

### 1. Selective Store Subscription
Components declare `storeSubscribedFields` to receive only relevant state changes. The `StoreSubscriber` does key-level `isEqual` checks before notifying:

```javascript
if (!isEqual(this.prevState[key], state[key])) { ... }
```

### 2. Debounced Persistence
State changes are written to LocalStorage through a 300ms debounce wrapper, preventing rapid-fire writes during typing:

```javascript
this.listen = debounce(this.listen, delay).bind(this);
```

### 3. Resize State Applied Once
During column/row resize, only CSS is updated on `mousemove`. The Store write happens only on `mouseup`, preventing hundreds of unnecessary state updates per drag operation.

### 4. Deep Clone Isolation
The Store deep-clones state on every read (`getStore()`) and write (`setStore()`). While this has a CPU cost, it provides **complete mutation safety** — no component can accidentally mutate shared state, eliminating an entire class of bugs.

### 5. Template Rendering
The Table generates its complete HTML string in a single pass using `createTable()`, then assigns it via `innerHTML`. This is **faster** than creating individual DOM nodes in a loop because the browser can batch-parse the HTML string.

---

## 9. Testing Strategy

### What Was Tested

**Store** — 6 test cases covering:
- Object creation and API surface
- Return type validation
- Default state initialization
- Functional state updates
- Subscriber notification
- Unsubscription cleanup

**Router** — 5 test cases covering:
- Object creation
- Default page rendering
- Hash-based page switching
- Multi-path route matching
- Fallback behavior for unknown routes

### Why Only Store and Router?

These are the **two framework primitives** that all other code depends on. If the Store or Router has a bug, everything breaks. Testing them provides the highest confidence-per-test-written ratio.

DOM-dependent component tests (Table, Formula, Toolbar) would require extensive jsdom mocking of `getBoundingClientRect`, `scrollIntoView`, contenteditable behavior, etc. — the effort-to-value ratio is poor for a project of this scope.

### Test Infrastructure

- **Vitest** with jsdom environment for DOM API availability
- **`vi.fn()`** for mock/spy assertions
- **Async test support** for Router's Promise-based page rendering

---

## 10. What I Would Do Differently

### In a Production Context

1. **Replace `eval()` with a proper expression parser** — Use a library like `math.js` or build a tokenizer/AST parser for formulas
2. **Virtual scrolling for large datasets** — The current approach renders all 520 cells upfront; a virtual scroller would be needed for thousands of rows
3. **Undo/Redo stack** — The Store's immutable update pattern makes this straightforward: maintain a state history array
4. **Cell references in formulas** — Support `=A1+B2` syntax by resolving cell references before evaluation
5. **Collaborative editing** — Replace LocalStorage with a backend + WebSocket layer
6. **Accessibility** — Add ARIA roles (`role="grid"`, `role="gridcell"`), keyboard shortcuts, screen reader support

### Architectural Improvements

1. **Composition over inheritance** — The 3-level class hierarchy works but becomes rigid. A mixin/composition approach would be more flexible for adding capabilities per-component
2. **Typed state with JSDoc or TypeScript** — The flat state object with string keys (`"row:col"`) works but lacks type safety
3. **Component-scoped CSS** — Currently all styles are global via Tailwind; CSS Modules or Shadow DOM would improve encapsulation
4. **More granular re-rendering** — Currently, Toolbar re-renders its entire template on state change. A diffing mechanism or targeted DOM updates would be more efficient at scale
