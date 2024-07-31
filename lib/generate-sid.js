import axios from 'axios';

export default async (url) => {
   return new Promise(async resolve => {
      try {
         const json = await (await axios.post('https://app.s.id/api/user/shorten', {
            data: {},
            expired_at: 0,
            link: url,
            password: "",
            title: "",
            utm_campaign: "",
            utm_medium: "",
            utm_source: ""
         }, {
            headers: {
               "Accept": "*/*",
               "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
               "Origin": "https://home.s.id",
               "Referer": "https://home.s.id/",
               "Referrer-Policy": "strict-origin-when-cross-origin",
               "ds": "1683190718,i2ir5z,f925c364c33880e01c78957bee98a34c",
               "x-rpc-lang": "en",
               "Cookie": "__gads=ID=dfd6f8af293e1c61-220d601aa6d800d9:T=1669457424:RT=1669457424:S=ALNI_MYrGQZRAmb-mAjQCdrkYlsyA2AtZQ; __gpi=UID=00000b839a90a43c:T=1669457424:RT=1672501928:S=ALNI_MaWgNKecuPM9FMtRDjjJVgePwlFoA; _ga=GA1.2.427759500.1669457419; _ga_98MWVCBDD7=GS1.1.1672501918.3.1.1672502505.25.0.0; _ga_LJQ0V44EV5=GS1.1.1672501918.3.1.1672502506.0.0.0; _ga_64WXGMF6D9=GS1.1.1672502013.1.1.1672502506.24.0.0; _ga_MG7WE41JFP=GS1.1.1672502014.1.1.1672502506.24.0.0; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODMyNzY5OTQsImlkIjoxODMxODg4LCJvcmlnX2lhdCI6IjIwMjMtMDUtMDRUMDg6NTY6MzQuMDU1MDcwMTA4WiIsInVpZCI6IjY0NTM3MzQyOTRhZWZjZGQyOTVlNTlmYyJ9.RZcQmd91DNlKk8u8Tnh1Z3LXs0MUKDgbjGgXoT4e-qw; token_r=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU4Njg5OTQsImlkIjoxODMxODg4LCJ1aWQiOiI2NDUzNzM0Mjk0YWVmY2RkMjk1ZTU5ZmQifQ.RXKLnJKcIiDwv1saJzeqMB2eI41-kfrVg2YZUUWZ0Vw"
            }
         })).data;
         if (!json.data.short) return resolve({
            creator: 'Ordiston',
            status: false,
            msg: `Error!`
         });
         resolve({
            creator: 'Ordiston',
            status: true,
            data: {
            	original: json.data.long_url,
            	url: 'https://s.id/' + json.data.short
            }
         });
      } catch (e) {
         console.error(e);
         resolve({
            creator: 'Ordiston',
            status: false,
            msg: e.message
         });
      }
   });
};