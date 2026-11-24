---
'@mindulle/tokens': patch
---

합성 타이포 11건과 `state.error` 4건의 참조를 DTCG 경로로 바로잡는다 (MDS-71).
`build.js` 산출물은 동일하고, 해석기·트랜스파일러가 합성 타이포를 unresolved로
떨어뜨리던 문제만 사라진다.
