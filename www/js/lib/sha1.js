function SHA1(r){function o(r,o){return r<<o|r>>>32-o}function e(r){var o,e="";for(o=7;0<=o;o--)e+=(r>>>4*o&15).toString(16);return e}function t(r){r=r.replace(/\r\n/g,"\n");for(var o="",e=0;e<r.length;e++){var t=r.charCodeAt(e);t<128?o+=String.fromCharCode(t):(127<t&&t<2048?o+=String.fromCharCode(t>>6|192):(o+=String.fromCharCode(t>>12|224),o+=String.fromCharCode(t>>6&63|128)),o+=String.fromCharCode(63&t|128))}return o}var a,h,n,C,c,f,d,A,u,g=new Array(80),i=1732584193,s=4023233417,S=2562383102,p=271733878,l=3285377520,m=(r=t(r)).length,v=new Array;for(h=0;h<m-3;h+=4)n=r.charCodeAt(h)<<24|r.charCodeAt(h+1)<<16|r.charCodeAt(h+2)<<8|r.charCodeAt(h+3),v.push(n);switch(m%4){case 0:h=2147483648;break;case 1:h=r.charCodeAt(m-1)<<24|8388608;break;case 2:h=r.charCodeAt(m-2)<<24|r.charCodeAt(m-1)<<16|32768;break;case 3:h=r.charCodeAt(m-3)<<24|r.charCodeAt(m-2)<<16|r.charCodeAt(m-1)<<8|128}for(v.push(h);v.length%16!=14;)v.push(0);for(v.push(m>>>29),v.push(m<<3&4294967295),a=0;a<v.length;a+=16){for(h=0;h<16;h++)g[h]=v[a+h];for(h=16;h<=79;h++)g[h]=o(g[h-3]^g[h-8]^g[h-14]^g[h-16],1);for(C=i,c=s,f=S,d=p,A=l,h=0;h<=19;h++)u=o(C,5)+(c&f|~c&d)+A+g[h]+1518500249&4294967295,A=d,d=f,f=o(c,30),c=C,C=u;for(h=20;h<=39;h++)u=o(C,5)+(c^f^d)+A+g[h]+1859775393&4294967295,A=d,d=f,f=o(c,30),c=C,C=u;for(h=40;h<=59;h++)u=o(C,5)+(c&f|c&d|f&d)+A+g[h]+2400959708&4294967295,A=d,d=f,f=o(c,30),c=C,C=u;for(h=60;h<=79;h++)u=o(C,5)+(c^f^d)+A+g[h]+3395469782&4294967295,A=d,d=f,f=o(c,30),c=C,C=u;i=i+C&4294967295,s=s+c&4294967295,S=S+f&4294967295,p=p+d&4294967295,l=l+A&4294967295}return(u=e(i)+e(s)+e(S)+e(p)+e(l)).toLowerCase()}function SHA1(r){function o(r,o){return r<<o|r>>>32-o}function e(r){var o,e="";for(o=7;0<=o;o--)e+=(r>>>4*o&15).toString(16);return e}var t,a,h,n,C,c,f,d,A,u=new Array(80),g=1732584193,i=4023233417,s=2562383102,S=271733878,p=3285377520,l=(r=function(r){r=r.replace(/\r\n/g,"\n");for(var o="",e=0;e<r.length;e++){var t=r.charCodeAt(e);t<128?o+=String.fromCharCode(t):(127<t&&t<2048?o+=String.fromCharCode(t>>6|192):(o+=String.fromCharCode(t>>12|224),o+=String.fromCharCode(t>>6&63|128)),o+=String.fromCharCode(63&t|128))}return o}(r)).length,m=new Array;for(a=0;a<l-3;a+=4)h=r.charCodeAt(a)<<24|r.charCodeAt(a+1)<<16|r.charCodeAt(a+2)<<8|r.charCodeAt(a+3),m.push(h);switch(l%4){case 0:a=2147483648;break;case 1:a=r.charCodeAt(l-1)<<24|8388608;break;case 2:a=r.charCodeAt(l-2)<<24|r.charCodeAt(l-1)<<16|32768;break;case 3:a=r.charCodeAt(l-3)<<24|r.charCodeAt(l-2)<<16|r.charCodeAt(l-1)<<8|128}for(m.push(a);m.length%16!=14;)m.push(0);for(m.push(l>>>29),m.push(l<<3&4294967295),t=0;t<m.length;t+=16){for(a=0;a<16;a++)u[a]=m[t+a];for(a=16;a<=79;a++)u[a]=o(u[a-3]^u[a-8]^u[a-14]^u[a-16],1);for(n=g,C=i,c=s,f=S,d=p,a=0;a<=19;a++)A=o(n,5)+(C&c|~C&f)+d+u[a]+1518500249&4294967295,d=f,f=c,c=o(C,30),C=n,n=A;for(a=20;a<=39;a++)A=o(n,5)+(C^c^f)+d+u[a]+1859775393&4294967295,d=f,f=c,c=o(C,30),C=n,n=A;for(a=40;a<=59;a++)A=o(n,5)+(C&c|C&f|c&f)+d+u[a]+2400959708&4294967295,d=f,f=c,c=o(C,30),C=n,n=A;for(a=60;a<=79;a++)A=o(n,5)+(C^c^f)+d+u[a]+3395469782&4294967295,d=f,f=c,c=o(C,30),C=n,n=A;g=g+n&4294967295,i=i+C&4294967295,s=s+c&4294967295,S=S+f&4294967295,p=p+d&4294967295}return(A=e(g)+e(i)+e(s)+e(S)+e(p)).toLowerCase()}