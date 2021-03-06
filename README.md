# Vue3 Todo App Custom

## Page
- [Todo List](https://jude-ui.github.io/vue3-todo-app-custom/)
## Installation

```bash
# Default.
$ npx degit jude-ui/vue3-todo-app-custom <Project Name>

# Start!
$ cd <Project Name>
$ npm i
$ npm run dev
```

## Specs

- Vue3
- Webpack
- SCSS
- Babel
- PostCSS
- Autoprefixer
- ESLint

## Packages

__webpack__: 모듈(패키지) 번들러의 핵심 패키지<br>
__webpack-cli__: 터미널에서 Webpack 명령(CLI)을 사용할 수 있음<br>
__webpack-dev-server__: 개발용으로 Live Server를 실행(HMR)<br>

__html-webpack-plugin__: 최초 실행될 HTML 파일(템플릿)을 연결<br>
__copy-webpack-plugin__: 정적 파일(파비콘, 이미지 등)을 제품(`dist`) 폴더로 복사<br>

__sass-loader__: SCSS(Sass) 파일을 로드<br>
__postcss-loader__: PostCSS(Autoprefixer)로 스타일 파일을 처리<br>
__css-loader__: CSS 파일을 로드<br>
__style-loader__: 로드된 스타일(CSS)을 `<style>`로 `<head>`에 삽입<br>
__babel-loader__: JS 파일을 로드<br>
__vue-loader__: Vue 파일을 로드<br>
__vue-style-loader__: Vue 파일의 로드된 스타일(CSS)을 `<style>`로 `<head>`에 삽입<br>
__file-loader__: 지정된 파일(이미지)을 로드<br>

__@babel/core__: ES6 이상의 코드를 ES5 이하 버전으로 변환<br>
__@babel/preset-env__: Babel 지원 스펙을 지정<br>
__@babel/plugin-transform-runtime__: Async/Await 문법 지원<br>
__babel-plugin-transform-remove-console__: production 모드에서 콘솔을 모두 지워주는 기능을 가진 패키지<br>

__sass__: SCSS(Sass) 문법을 해석(스타일 전처리기)<br>
__postcss__: Autoprefixer 등의 다양한 스타일 후처리기 패키지<br>
__autoprefixer__: 스타일에 자동으로 공급 업체 접두사(Vendor prefix)를 적용하는 PostCSS의 플러그인<br>

__vue__: Vue.js 프레임워크<br>
__@vue/compiler-sfc__: .vue 파일(SFC, 3버전)을 해석<br>
__vuex__: Vue 중앙 집중식 데이터 관리 패키지<br>

__eslint__: 정적 코드 분석 도구 __(+ESLint)__<br>
__eslint-plugin-vue__: Vue.js 코드 분석 __(+ESLint)__<br>
__babel-eslint__: ES6 이상의 코드(Babel)를 분석 __(+ESLint)__<br>

__moment__: 다양한 양식의 시간 데이터 출력을 도와주는 패키지<br>
__shortid__: 고유한 id값을 랜덤으로 생성해주는 패키지<br>

__sortablejs__: 목록의 위치를 변경시켜주는 라이브러리<br>
__lodash__: 객체를 다양하게 조작하게 해주는 헬퍼 라이브러리<br>

## 주의사항!

- `webpack-dev-server`와 `webpack-cli`는 메이저 버전을 일치 시켜야 함!<br>
- `@vue/compiler-sfc`와 `vue`버전을 일치 시켜야 정상 작동을 보장함<br>
- `package.json` 옵션으로 `browserslist` 추가!<br>
- `.postcssrc.js` PostCSS 구성 옵션<br>
- `.babelrc.js` Babel 구성 옵션<br>
- `.eslintrc.js` ESLint 구성 옵션<br>

## ESLint Auto fix on save for VSCode

- 모든 명령 표시(Windows: `Ctrl`+`Shift`+`P` / macOS: `Cmd`+`Shift`+`P`)
- 모든 명령 표시에서 `settings` 검색
- `Preferences: Open Settings (JSON)` 선택
- 오픈된 `settings.json`파일에서 아래 코드 추가 및 저장

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 작업 과정

__[svelte 코드](https://github.com/jude-ui/svelte-todo-app-custom)를 뷰 코드로 변경하는 작업 진행__

- svelte 프로젝트에선 최신순, 과거순 정렬 버튼의 텍스트를 derived(getters)를 사용했지만 vue에서는 {{ }} 안에 삼항연산자로 다이렉트로 나오게 작성해봤다.
- vue는 svelte와 달리 store의 상태값을 변경하려면 스토어의 mutations을 호출하여 변경해야 해서 상태 자체를 바꾸는 updateState 함수와, 상태 상세 값을 변경할 수 있는 updateTodoItem 함수를 공통으로 mutations에 만들어야 했다.
- 목록을 뒤집는 reverse, unshift, push 등은 배열 자체를 변경하는 메소드라 mutations에 변경하는 함수를 별도로 생성해서 사용했다.
- svelte에서는 state인 배열 자체를 변경하고나서 할당을 안해주면 반응성이 생기지 않아서 $todos = $todos 라는 다소 이상해보이는 코드를 작성했던거에 비해 뷰에선 이런 코드는 없어도 괜찮다.
- todo를 수정할 때 title, time, isDone 과 같은 정보를 별도로 업데이트 처리해주기 위해서, 고유 id값을 통해 가려낸 객체에 정보를 업데이트 시켜주도록 mutations에 updateTodoItem 작성
- 공통 딤드 레이어의 버튼 이벤트들을 props로 함수 자체를 넘겨서 사용했었는데, emit 기능으로 수정
  - svelte 버전은 createEventDispatcher를 가져와서 부모, 자식 컴포넌트의 각 함수에서 각각 실행을 해줘야 하고 코드가 너무 늘어나는거 같아서 그냥 함수 전달로 남겨둠
- 공통 딤드 레이어의 제목을 props가 아닌 slot으로 수정