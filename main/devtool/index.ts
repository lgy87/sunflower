export default function (...args: Array<any>) {
  return args.reduce((a, b) => a + b, 0)
}
