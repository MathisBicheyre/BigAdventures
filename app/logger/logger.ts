const INFO = "[INFO] ";
const WARNING = "[WARNING] ";
const ERROR = "[ERROR] ";

export function info(log: string, ...params: any[]) {
  console.log(INFO.concat(log), ...params);
}

export function warning(log: string, ...params: any[]) {
  console.warn(WARNING.concat(log), ...params);
}

export function error(log: string, ...params: any[]) {
  console.error(ERROR.concat(log), ...params);
}
