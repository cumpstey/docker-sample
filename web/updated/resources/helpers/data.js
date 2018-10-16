import { intify } from './xify';

export const mapRawMetaData = meta => {
  const mapped = {
    page: intify(meta.currentPage) || 1,
    pageSize: intify(meta.pageSize) || 1,
    totalCount: intify(meta.totalCount),
  };
  mapped.totalPages = Math.ceil(meta.totalCount / meta.pageSize);
  return mapped;
};
