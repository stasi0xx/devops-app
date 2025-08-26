import qs from "query-string";

interface formUrlProps {
  params: string;
  key: string;
  value: string;
}

interface removeKeysFromQueryProps {
  params: string;
  keyToRemove: string[];
}

export const formUrlQuery = ({ params, key, value }: formUrlProps) => {
  const queryString = qs.parse(params);
  queryString[key] = value;
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};

export const removeKeysFromQuery = ({
  params,
  keyToRemove,
}: removeKeysFromQueryProps) => {
  const queryString = qs.parse(params);
  keyToRemove.forEach((key) => {
    delete queryString[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true },
  );
};
