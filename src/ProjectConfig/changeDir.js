const changeDir = (cfg) => {
  process.chdir(cfg.dir)
}

export const __useDefault = changeDir
export default __useDefault
