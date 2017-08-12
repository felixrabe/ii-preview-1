export default function delay(ms = 800) {
  return new Promise(res => setTimeout(() => res(), ms))
}
