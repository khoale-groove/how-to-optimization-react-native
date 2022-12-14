import {useCallback, useEffect, useState} from 'react';

export type DataType = 'original' | 'small' | 'medium' | 'large';
export const dataTypeValues = ['small', 'medium', 'large', 'original'] as const;

export const useData = (type: DataType = 'original') => {
  const symbols = {
    original: '',
    small: 'w_400,c_scale/',
    medium: 'w_900,c_scale/',
    large: 'w_1400,c_scale/',
  };
  const symbol = symbols[type] || symbols.original;

  return [
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1660559198/rn-performance/images/wasa-crispbread-7vmICcFrYQ0-unsplash_yqhyxm.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1653908840/cld-sample-5.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1660559207/rn-performance/images/wasa-crispbread-RG1bNEuNABY-unsplash_dhj7nc.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1653908838/cld-sample.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1653908815/sample.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1660559212/rn-performance/images/trent-haaland-wpoUq1rnjjk-unsplash_byikas.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1660559200/rn-performance/images/wasa-crispbread-Xlo7N1ctmZc-unsplash_muambs.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1653908839/cld-sample-2.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1660559211/rn-performance/images/wasa-crispbread-f4kKHjf1Ke8-unsplash_zienpy.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1660559209/rn-performance/images/wasa-crispbread-cd_Q-EshUy0-unsplash_yee6k0.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1653908839/cld-sample-3.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1660559209/rn-performance/images/wasa-crispbread-QNw2-m-Q2bM-unsplash_dgwufl.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1660559206/rn-performance/images/trent-haaland-4lp5-LlxkIM-unsplash_dwyc2k.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1660559204/rn-performance/images/wasa-crispbread-Qyssxxvb51I-unsplash_kojig8.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1660559204/rn-performance/images/wasa-crispbread-Bnr_ZSmqbDY-unsplash_dgv2oz.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1660559200/rn-performance/images/wasa-crispbread-rR2YntJJOl4-unsplash_mqhbil.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1653908840/cld-sample-4.jpg`,
    `https://res.cloudinary.com/lnanhkhoa/image/upload/${symbol}v1660559199/rn-performance/images/wasa-crispbread-k0_NZJf2Knw-unsplash_gx6kxq.jpg`,
  ];
};

export const useInfiniteData = (type: DataType = 'original', pageSize = 10) => {
  const sampleData = useData(type);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(sampleData.slice(0, pageSize));
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const fetchData = useCallback(() => {
    const total = (page + 1) * pageSize;
    setLoadMore(true);
    setTimeout(() => {
      setLoadMore(false);
      setData(
        new Array(total)
          .fill(null)
          .map((_, index) => sampleData[index % sampleData.length]),
      );
      setPage(page + 1);
    }, 500);
  }, [page, pageSize, sampleData]);

  const resetData = useCallback(() => {
    setPage(1);
    setData([]);
    setLoading(true);
    const total = pageSize;
    setTimeout(() => {
      setLoading(false);
      setData(
        new Array(total)
          .fill(null)
          .map((_, index) => sampleData[index % sampleData.length]),
      );
    }, 500);
  }, [pageSize, sampleData]);

  return {loading, fetchData, resetData, data};
};
