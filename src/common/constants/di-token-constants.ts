/**
 * DI用トークンの定数定義
 * DIしたいinterfaceを紐づけるトークンを記載する
 *
 * Non-class-based provider tokensについて:
 * JavaScriptにはinterfaceが存在しないため、TypeScriptのinterfaceは値の型として使用することはできない。
 * DIにTypeScriptのinterfaceを指定した場合、トランスパイル後にはオブジェクトの値が空になってしまう。
 * しかし、文字列のトークンを値として提供し、injectデコレータを使用することで、この問題を解決することができる。
 */
export enum DITokenConstants {
  USERS_SERVICE = 'UsersService',
  GLOBAL_CONFIG_SERVICE = 'GlobalConfigService',
  GLOBAL_CONFIG_REPOSITORY = 'GlobalConfigRepository',
  PARAMETER_FILE_SHARED_REPOSITORY = 'ParameterFileSharedRepository',
}
