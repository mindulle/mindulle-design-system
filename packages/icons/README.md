# @mindulle/icons

Mindulle Design System (MDS) 공식 아이콘 패키지입니다.

## 네이밍 정책

- **`Mds*`가 정본(Canonical)입니다.** Figma, 코드, 문서 모두 `Mds*` 이름을 기준으로 관리합니다.
- **`Sng*`는 deprecated alias입니다.** 하위 호환을 위해 `src/index.ts`에서 alias export만 유지하며, **v2.0에서 제거 예정**입니다. 별도의 `Sng*.tsx` shim 파일은 두지 않습니다.

## 아이콘 매핑 표 (9종)

| codeName | legacyName (deprecated) | Figma instance | 설명 |
| --- | --- | --- | --- |
| `MdsAddIcon` | `SngAddIcon` | `Icon / MdsAddIcon / 2px` | 항목 추가, 플러스 동작 |
| `MdsArrowRightIcon` | `SngArrowRightIcon` | `Icon / MdsArrowRightIcon / 2px` | 다음 단계, 이동, 링크 |
| `MdsCheckIcon` | `SngCheckIcon` | `Icon / MdsCheckIcon / 2px` | 완료, 체크박스 확인 |
| `MdsCloseIcon` | `SngCloseIcon` | `Icon / MdsCloseIcon / 2px` | 닫기, 삭제, 모달 해제 |
| `MdsDocumentIcon` | `SngDocumentIcon` | `Icon / MdsDocumentIcon / 2px` | 문서, 사양서, 기술 아티클 |
| `MdsHomeIcon` | `SngHomeIcon` | `Icon / MdsHomeIcon / 2px` | 홈, 관문 대시보드 |
| `MdsMenuIcon` | `SngMenuIcon` | `Icon / MdsMenuIcon / 2px` | 햄버거 메뉴, 사이드바 토글 |
| `MdsSearchIcon` | `SngSearchIcon` | `Icon / MdsSearchIcon / 2px` | 검색 폼, 쿼리 탐색 |
| `MdsUserIcon` | `SngUserIcon` | `Icon / MdsUserIcon / 2px` | 사용자 프로필, 아틀리에 장인 |

## 교체 가이드

기존 `Sng*` import를 `Mds*`로 교체하세요.

```tsx
// Before (deprecated)
import { SngHomeIcon } from '@mindulle/icons';

// After (canonical)
import { MdsHomeIcon } from '@mindulle/icons';
```
