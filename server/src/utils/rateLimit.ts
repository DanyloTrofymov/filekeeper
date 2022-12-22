const history = new Map();

export const rateLimit = (ip: string, limit: number) => {
    const countIp = history.get(ip) || 0;
    if (history.get(ip) >= limit) {
      throw new Error();
    }
    history.set(ip, countIp + 1);
  };
