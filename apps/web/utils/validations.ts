export const validateSite = (value: string) => {
  // Prepend "https://" if no protocol is provided
  if (!/^https?:\/\//i.test(value)) {
    value = `https://${value}`;
  }

  try {
    const url = new URL(value);

    const isHttp = url.protocol === "http:" || url.protocol === "https:";
    const hostname = url.hostname;

    // Hostname must be at least "x.y" with TLD 2+ chars
    const domainParts = hostname.split(".");
    const isDomainValid = 
      domainParts.length >= 2 &&
      domainParts.every(part => /^[a-zA-Z0-9-]+$/.test(part)) &&
      domainParts[domainParts.length - 1].length >= 2 &&
      !hostname.startsWith("-") &&
      !hostname.endsWith("-") &&
      !hostname.startsWith(".") &&
      !hostname.endsWith(".");

    return isHttp && isDomainValid;
  } catch {
    return false;
  }
};

export const validateEmailDomain = (value: string) => {
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return domainRegex.test(value);
};
