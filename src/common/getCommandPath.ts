import path from "path"

export default function getCommandPath(commandPath: string) {
  return path.resolve(`build/${commandPath}`)
}