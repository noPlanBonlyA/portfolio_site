// Last known pointer position (viewport px), shared without re-rendering.
// The custom cursor writes it; the achievements guide starts its flight from it.
export const pointer = { x: 0, y: 0, seen: false };
