import path from "path"

/**
 * コマンドのsrcからのパスを受け取り、ビルド時のパスを返す
 * @param  commandPath コマンドのsrcから見たパス
 * @returns ビルド時のパス
 */
export default function getCommandPath(commandPath: string) {
  return path.resolve(`build/${commandPath}.js`);
}