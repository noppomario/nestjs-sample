/**
 * レスポンスのmessageとstatusCodeの対応を定義したMap
 */
export const ResponseMessageMap = new Map()
  .set(200, '処理が成功しました。')
  .set(201, '処理が成功しました。')
  .set(
    400,
    '入力内容に誤りがあります。エラー内容を確認して再実施してください。',
  )
  .set(401, '認証エラーのため実施できませんでした。ログインしてください。')
  .set(403, '許可されていない操作のため実施できませんでした。')
  .set(
    404,
    '対象が見つかりませんでした。別のユーザによって削除された可能性があります。',
  )
  .set(409, '処理の競合が発生しました。しばらく待ってから再実施してください。')
  .set(500, 'サーバ内部エラーが発生しました。');