# NestJS Sample

## 概要

[Nest](https://github.com/nestjs/nest)フレームワークを使ったサンプル

## 事前準備

- Node.js の導入
- SQLite3 の導入

## 導入

```bash
$ npm install
```

## 起動コマンド

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## テスト

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Tips

### Non-class-based provider tokensについて

JavaScriptにはinterfaceが存在しないため、TypeScriptのinterfaceは値の型として使用することはできない。  
DIにTypeScriptのinterfaceを指定した場合、トランスパイル後にはオブジェクトの値が空になってしまう。  
しかし、別途トークンを値として提供し、injectデコレータを使用することで、この問題を解決することができる。  
文字列だと定義自体が一意である必要があり考慮事項/ルールが増えるため、シンボルを使って定義する。  

## 参考

### 公式ドキュメント

https://docs.nestjs.com

### 日本語訳(v7)

https://zenn.dev/kisihara_c/books/nest-officialdoc-jp

### 公式サンプル

https://github.com/nestjs/nest/tree/master/sample

### チュートリアル

https://wanago.io/2020/05/11/nestjs-api-controllers-routing-module/

### チュートリアルサンプル

https://github.com/mwanago/nestjs-typescript
