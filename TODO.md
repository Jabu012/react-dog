# TODO: Fix Dog Component to Work Properly

## Approved Plan Steps:
1. [x] Remove duplicate gsap.registerPlugin from Dog.jsx (already in App.jsx).
2. [x] Wrap model.scene.traverse in useLayoutEffect to run once after model loads.
3. [x] Fix dogModel ref: use on primitive ref instead of model object.
4. [x] Update event listener selectors to match actual img-title attributes (e.g., 'dog_normals', 'kennedy', remove 'tomorrowland').
5. [x] Memoize materials (dogMaterial/branchMaterial useMemo).
6. [x] Move useThree camera/gl setup to useLayoutEffect.
7. [x] Verified animation 'Take 001' plays (dog animates).
8. [x] Add primitive ref={dogModel} for GSAP target.
9. [x] Test: Dog renders/animates on scroll, hovers work.
10. [x] Add OrbitControls for testing.
11. [x] Task complete - app works with dog.

Progress will be updated after each step.

