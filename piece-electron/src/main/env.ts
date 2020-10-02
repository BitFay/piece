const test = process.env.KEYSTORE_WEB_TEST;
const prodution = process.env.KEYSTORE_WEB;
const development = {
  "url": test || prodution || "http://localhost:8000/keystore/"
  // "url": "https://www.baidu.com/"
  // "url": "https://enterprise.keystore.dev/keystore/"
};

const production = {
  // "url": "http://localhost:8000/",
  "url": test || prodution || "https://enterprise.keystore.dev/keystore/"
};

interface Env {
  [key: string]: {
    url: string
  }
}

const env: Env = {
  development,
  production
};

export default env;