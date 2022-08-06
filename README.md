# NestJS Sample

## 概要

[Nest](https://github.com/nestjs/nest)フレームワークを使ったサンプル

## 事前準備

- Node.js の導入
- SQLite3 の導入

## 導入

```bash
npm install
```

## 起動コマンド

```bash
# developmentモード
$ npm run start

# watchモード(ホットリロード)
$ npm run start:dev

# productionモード
$ npm run start:prod
```

## 静的解析

```bash
# 実行
$ npm run lint

# 強制的に修正
$ npm run fix
```

## テスト

```bash
# 単体テスト
$ npm run test

# e2eテスト
$ npm run test:e2e

# テストカバレッジ
$ npm run test:cov
```

## ドキュメント

### API仕様書

```bash
# 1.サーバをdevelopmentモードで起動する
$ npm run [start|start:dev]

# 2.以下URLにアクセスする
http://localhost:3000/api/
```

### 詳細設計書

```bash
# 1.以下コマンドでサーバを起動する
$ npm run start:compodoc

# 2.以下URLにアクセスする
http://localhost:8080/
```

### 静的ファイル生成(Optional)

```bash
# ドキュメントファイルを生成する
$ npm run doc

出力先: dist/docs/
```

## OpenAPI Generator

```bash
# API仕様書からコードを自動生成する
$ npm run gen

出力先: dist/client/angular/
```

## 生成ファイルのリセット

```bash
# distフォルダを削除
$ npm run clean
```

## Tips

### Non-class-based provider tokens

JavaScriptにはInterfaceが存在しないため、TypeScriptのInterfaceは値の型として使用することはできない。  
DIにTypeScriptのInterfaceを指定すると、トランスパイル後にはオブジェクトの値が空になってしまうが、  
Injectデコレータにトークンを値として提供することで、この問題を解決することができる。  
文字列だと定義自体が一意である必要があり考慮事項/ルールが増えるため、シンボルを使って定義する。  

```ts
// users.service.ts
export const USERS_SERVICE = Symbol('di-token');
export interface UsersService {
  // ...
}
```

```ts
// users.controller.ts
@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: UsersService,
  ) {}
  // ...
}
```

## 参考

### 公式ドキュメント

<https://docs.nestjs.com>

### 日本語訳(v7)

<https://zenn.dev/kisihara_c/books/nest-officialdoc-jp>

### 公式サンプル

<https://github.com/nestjs/nest/tree/master/sample>

### チュートリアル

<https://wanago.io/2020/05/11/nestjs-api-controllers-routing-module/>

### チュートリアルサンプル

<https://github.com/mwanago/nestjs-typescript>
