function LoadJSCodeBlob(e,t,n){var o=document.createElement("script"),i=URL.createObjectURL(e);n&&(Module.blobInfo||(Module.blobInfo={}),Module.blobInfo[i]=n),o.src=i,o.onload=function(){URL.revokeObjectURL(i),t&&t()},document.body.appendChild(o)}function LoadJSCode(e,t,n){if(!Math.fround&&n&&"asmUrl"==n.id){console.log("optimizing out Math.fround calls");for(var o={LOOKING_FOR_MODULE:0,SCANNING_MODULE_VARIABLES:1,SCANNING_MODULE_FUNCTIONS:2},i=["EMSCRIPTEN_START_ASM","EMSCRIPTEN_START_FUNCS","EMSCRIPTEN_END_FUNCS"],a="var",r="global.Math.fround;",s=0,d=o.LOOKING_FOR_MODULE,l=0,u=0;d<=o.SCANNING_MODULE_FUNCTIONS&&s<e.length;s++)if(47==e[s]&&47==e[s+1]&&32==e[s+2]&&String.fromCharCode.apply(null,e.subarray(s+3,s+3+i[d].length))===i[d])d++;else if(d!=o.SCANNING_MODULE_VARIABLES||u||61!=e[s]||String.fromCharCode.apply(null,e.subarray(s+1,s+1+r.length))!==r){if(u&&40==e[s]){for(var c=0;u>c&&e[s-1-c]==e[l-c];)c++;if(c==u){var f=e[s-1-c];if(36>f||f>36&&48>f||f>57&&65>f||f>90&&95>f||f>95&&97>f||f>122)for(;c;c--)e[s-c]=32}}}else{for(l=s-1;32!=e[l-u];)u++;u&&String.fromCharCode.apply(null,e.subarray(l-u-a.length,l-u))===a||(l=u=0)}}LoadJSCodeBlob(new Blob([e],{type:"text/javascript"}),t,n)}function DecompressAndLoadFile(e,t,n){e+=window.unityDecompressReleaseFileExtension;var o=new XMLHttpRequest;o.open("GET",e,!0),o.onprogress=n,o.responseType="arraybuffer",o.onload=function(){var n=new Uint8Array(o.response),i=(new Date).getTime(),a=window.unityDecompressReleaseFile(n),r=(new Date).getTime();console.log("Decompressed "+e+" in "+(r-i)+"ms. You can remove this delay if you configure your web server to host files using "+window.unityDecompressReleaseFileExtension+" compression."),t(a)},o.onerror=function(){console.log("Could not download "+e),didShowErrorMessage||0!=document.URL.indexOf("file:")||(alert("It seems your browser does not support running Unity WebGL content from file:// urls. Please upload it to an http server, or try a different browser."),didShowErrorMessage=!0)},o.send(null)}function LoadCompressedFile(e,t,n){if(CompressionState.current==CompressionState.Unsupported)return void DecompressAndLoadFile(e,t);if(CompressionState.current==CompressionState.Pending)return void CompressionState.pendingServerRequests.push(function(){LoadCompressedFile(e,t,n)});CompressionState.current==CompressionState.Uninitialized&&(CompressionState.current=CompressionState.Pending);var o=new XMLHttpRequest;o.open("GET",e,!0),o.responseType="arraybuffer",o.onprogress=function(e){n&&n(e),CompressionState.current==CompressionState.Pending&&(0==o.status||200==o.status?CompressionState.Set(CompressionState.Supported):CompressionState.Set(CompressionState.Unsupported))},o.onload=function(){if(0==o.status||200==o.status){CompressionState.Set(CompressionState.Supported);var i=new Uint8Array(o.response);t(i)}else CompressionState.Set(CompressionState.Unsupported),DecompressAndLoadFile(e,t,n)},o.onerror=function(){CompressionState.Set(CompressionState.Unsupported),DecompressAndLoadFile(e,t,n)};try{o.send(null)}catch(i){CompressionState.Set(CompressionState.Unsupported),DecompressAndLoadFile(e,t,n)}}function LoadCompressedJS(e,t,n){LoadCompressedFile(e,function(o){n&&(n.url=e),LoadJSCode(o,t,n)})}function fetchRemotePackageWrapper(e,t,n,o){LoadCompressedFile(e,function(e){n(e.buffer)},function(n){var o=e,i=t;if(n.total&&(i=n.total),n.loaded){Module.dataFileDownloads||(Module.dataFileDownloads={}),Module.dataFileDownloads[o]={loaded:n.loaded,total:i};var a=0,r=0,s=0;for(var d in Module.dataFileDownloads){var l=Module.dataFileDownloads[d];a+=l.total,r+=l.loaded,s++}a=Math.ceil(a*Module.expectedDataFileDownloads/s),Module.setStatus&&Module.setStatus("Downloading data... ("+r+"/"+a+")")}else Module.dataFileDownloads||Module.setStatus&&Module.setStatus("Downloading data...")})}function SetIndexedDBAndLoadCompressedJS(e){SetIndexedDBAndLoadCompressedJS.called||(SetIndexedDBAndLoadCompressedJS.called=!0,Module.indexedDB=e,Module.wasmBinaryFile&&"object"==typeof Wasm?LoadCompressedFile(Module.wasmBinaryFile,function(e){Module.wasmBinary=e,LoadCompressedJS(Module.codeUrl,null,{id:"codeUrl"})}):LoadCompressedJS(Module.asmUrl,function(){LoadCompressedJS(Module.codeUrl,null,{id:"codeUrl"})},{id:"asmUrl"}))}function LoadCode(){try{var e=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,t=e.open("/idbfs-test");t.onerror=function(e){e.preventDefault(),SetIndexedDBAndLoadCompressedJS()},t.onsuccess=function(){t.result.close(),SetIndexedDBAndLoadCompressedJS(e)},setTimeout(function(){SetIndexedDBAndLoadCompressedJS()},1e3)}catch(n){SetIndexedDBAndLoadCompressedJS()}}function CompatibilityCheck(){hasWebGL?mobile?confirm("Please note that Unity WebGL is not currently supported on mobiles. Press Ok if you wish to continue anyway.")||window.history.back():-1==browser.indexOf("Firefox")&&-1==browser.indexOf("Chrome")&&-1==browser.indexOf("Safari")&&(confirm("Please note that your browser is not currently supported for this Unity WebGL content. Try installing Firefox, or press Ok if you wish to continue anyway.")||window.history.back()):(alert("You need a browser which supports WebGL to run this content. Try installing Firefox."),window.history.back())}function UnityErrorHandler(e,t,n){return Module.errorhandler&&Module.errorhandler(e,t,n)||(console.log("Invoking error handler due to\n"+e),"function"==typeof dump&&dump("Invoking error handler due to\n"+e),didShowErrorMessage||-1!=e.indexOf("UnknownError")||-1!=e.indexOf("Program terminated with exit(0)"))?void 0:(didShowErrorMessage=!0,-1!=e.indexOf("DISABLE_EXCEPTION_CATCHING")?void alert("An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project's WebGL player settings to be able to catch the exception or see the stack trace."):-1!=e.indexOf("Cannot enlarge memory arrays")?void alert("Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings."):-1!=e.indexOf("Invalid array buffer length")||-1!=e.indexOf("Invalid typed array length")||-1!=e.indexOf("out of memory")?void alert("The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."):void alert("An error occurred running the Unity content on this page. See your browser's JavaScript console for more info. The error was:\n"+e))}function demangleSymbol(e){return Module.debugSymbols&&Module.debugSymbols[e]&&(e=Module.debugSymbols[e]),e.lastIndexOf("__Z",0)||(e=(Module.demangle||demangle)(e)),e}function demangleError(e){var t=-1!=browser.indexOf("Chrome")?"(\\s+at\\s+)(([\\w\\d_\\.]*?)([\\w\\d_$]+)(/[\\w\\d_\\./]+|))(\\s+\\[.*\\]|)\\s*\\((blob:.*)\\)":"(\\s*)(([\\w\\d_\\.]*?)([\\w\\d_$]+)(/[\\w\\d_\\./]+|))(\\s+\\[.*\\]|)\\s*@(blob:.*)",n=new RegExp(t,"g"),o=new RegExp("^"+t+"$");return e.replace(n,function(e){var t=e.match(o),n=demangleSymbol(t[4]),i=t[7].match(/^(blob:.*)(:\d+:\d+)$/),a=i&&Module.blobInfo&&Module.blobInfo[i[1]]&&Module.blobInfo[i[1]].url?Module.blobInfo[i[1]].url:"blob";return t[1]+n+(t[2]!=n?" ["+t[2]+"]":"")+" ("+(i?a.substr(a.lastIndexOf("/")+1)+i[2]:t[7])+")"})}function SetFullscreen(e){if("undefined"==typeof runtimeInitialized||!runtimeInitialized)return void console.log("Runtime not initialized yet.");if("undefined"==typeof JSEvents)return void console.log("Player not loaded yet.");var t=JSEvents.canPerformEventHandlerRequests;JSEvents.canPerformEventHandlerRequests=function(){return 1},Module.cwrap("SetFullscreen","void",["number"])(e),JSEvents.canPerformEventHandlerRequests=t}!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.pako=e()}}(function(){return function e(t,n,o){function i(r,s){if(!n[r]){if(!t[r]){var d="function"==typeof require&&require;if(!s&&d)return d(r,!0);if(a)return a(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[r]={exports:{}};t[r][0].call(u.exports,function(e){var n=t[r][1][e];return i(n?n:e)},u,u.exports,e,t,n,o)}return n[r].exports}for(var a="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}({1:[function(e,t,n){"use strict";var o="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;n.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var n=t.shift();if(n){if("object"!=typeof n)throw new TypeError(n+"must be non-object");for(var o in n)n.hasOwnProperty(o)&&(e[o]=n[o])}}return e},n.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,n,o,i){if(t.subarray&&e.subarray)return void e.set(t.subarray(n,n+o),i);for(var a=0;o>a;a++)e[i+a]=t[n+a]},flattenChunks:function(e){var t,n,o,i,a,r;for(o=0,t=0,n=e.length;n>t;t++)o+=e[t].length;for(r=new Uint8Array(o),i=0,t=0,n=e.length;n>t;t++)a=e[t],r.set(a,i),i+=a.length;return r}},a={arraySet:function(e,t,n,o,i){for(var a=0;o>a;a++)e[i+a]=t[n+a]},flattenChunks:function(e){return[].concat.apply([],e)}};n.setTyped=function(e){e?(n.Buf8=Uint8Array,n.Buf16=Uint16Array,n.Buf32=Int32Array,n.assign(n,i)):(n.Buf8=Array,n.Buf16=Array,n.Buf32=Array,n.assign(n,a))},n.setTyped(o)},{}],2:[function(e,t,n){"use strict";function o(e,t){if(65537>t&&(e.subarray&&r||!e.subarray&&a))return String.fromCharCode.apply(null,i.shrinkBuf(e,t));for(var n="",o=0;t>o;o++)n+=String.fromCharCode(e[o]);return n}var i=e("./common"),a=!0,r=!0;try{String.fromCharCode.apply(null,[0])}catch(s){a=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(s){r=!1}for(var d=new i.Buf8(256),l=0;256>l;l++)d[l]=l>=252?6:l>=248?5:l>=240?4:l>=224?3:l>=192?2:1;d[254]=d[254]=1,n.string2buf=function(e){var t,n,o,a,r,s=e.length,d=0;for(a=0;s>a;a++)n=e.charCodeAt(a),55296===(64512&n)&&s>a+1&&(o=e.charCodeAt(a+1),56320===(64512&o)&&(n=65536+(n-55296<<10)+(o-56320),a++)),d+=128>n?1:2048>n?2:65536>n?3:4;for(t=new i.Buf8(d),r=0,a=0;d>r;a++)n=e.charCodeAt(a),55296===(64512&n)&&s>a+1&&(o=e.charCodeAt(a+1),56320===(64512&o)&&(n=65536+(n-55296<<10)+(o-56320),a++)),128>n?t[r++]=n:2048>n?(t[r++]=192|n>>>6,t[r++]=128|63&n):65536>n?(t[r++]=224|n>>>12,t[r++]=128|n>>>6&63,t[r++]=128|63&n):(t[r++]=240|n>>>18,t[r++]=128|n>>>12&63,t[r++]=128|n>>>6&63,t[r++]=128|63&n);return t},n.buf2binstring=function(e){return o(e,e.length)},n.binstring2buf=function(e){for(var t=new i.Buf8(e.length),n=0,o=t.length;o>n;n++)t[n]=e.charCodeAt(n);return t},n.buf2string=function(e,t){var n,i,a,r,s=t||e.length,l=new Array(2*s);for(i=0,n=0;s>n;)if(a=e[n++],128>a)l[i++]=a;else if(r=d[a],r>4)l[i++]=65533,n+=r-1;else{for(a&=2===r?31:3===r?15:7;r>1&&s>n;)a=a<<6|63&e[n++],r--;r>1?l[i++]=65533:65536>a?l[i++]=a:(a-=65536,l[i++]=55296|a>>10&1023,l[i++]=56320|1023&a)}return o(l,i)},n.utf8border=function(e,t){var n;for(t=t||e.length,t>e.length&&(t=e.length),n=t-1;n>=0&&128===(192&e[n]);)n--;return 0>n?t:0===n?t:n+d[e[n]]>t?n:t}},{"./common":1}],3:[function(e,t,n){"use strict";function o(e,t,n,o){for(var i=65535&e|0,a=e>>>16&65535|0,r=0;0!==n;){r=n>2e3?2e3:n,n-=r;do i=i+t[o++]|0,a=a+i|0;while(--r);i%=65521,a%=65521}return i|a<<16|0}t.exports=o},{}],4:[function(e,t,n){t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],5:[function(e,t,n){"use strict";function o(){for(var e,t=[],n=0;256>n;n++){e=n;for(var o=0;8>o;o++)e=1&e?3988292384^e>>>1:e>>>1;t[n]=e}return t}function i(e,t,n,o){var i=a,r=o+n;e=-1^e;for(var s=o;r>s;s++)e=e>>>8^i[255&(e^t[s])];return-1^e}var a=o();t.exports=i},{}],6:[function(e,t,n){"use strict";function o(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}t.exports=o},{}],7:[function(e,t,n){"use strict";var o=30,i=12;t.exports=function(e,t){var n,a,r,s,d,l,u,c,f,h,m,p,b,w,g,v,k,y,_,S,x,M,C,E,D;n=e.state,a=e.next_in,E=e.input,r=a+(e.avail_in-5),s=e.next_out,D=e.output,d=s-(t-e.avail_out),l=s+(e.avail_out-257),u=n.dmax,c=n.wsize,f=n.whave,h=n.wnext,m=n.window,p=n.hold,b=n.bits,w=n.lencode,g=n.distcode,v=(1<<n.lenbits)-1,k=(1<<n.distbits)-1;e:do{15>b&&(p+=E[a++]<<b,b+=8,p+=E[a++]<<b,b+=8),y=w[p&v];t:for(;;){if(_=y>>>24,p>>>=_,b-=_,_=y>>>16&255,0===_)D[s++]=65535&y;else{if(!(16&_)){if(0===(64&_)){y=w[(65535&y)+(p&(1<<_)-1)];continue t}if(32&_){n.mode=i;break e}e.msg="invalid literal/length code",n.mode=o;break e}S=65535&y,_&=15,_&&(_>b&&(p+=E[a++]<<b,b+=8),S+=p&(1<<_)-1,p>>>=_,b-=_),15>b&&(p+=E[a++]<<b,b+=8,p+=E[a++]<<b,b+=8),y=g[p&k];n:for(;;){if(_=y>>>24,p>>>=_,b-=_,_=y>>>16&255,!(16&_)){if(0===(64&_)){y=g[(65535&y)+(p&(1<<_)-1)];continue n}e.msg="invalid distance code",n.mode=o;break e}if(x=65535&y,_&=15,_>b&&(p+=E[a++]<<b,b+=8,_>b&&(p+=E[a++]<<b,b+=8)),x+=p&(1<<_)-1,x>u){e.msg="invalid distance too far back",n.mode=o;break e}if(p>>>=_,b-=_,_=s-d,x>_){if(_=x-_,_>f&&n.sane){e.msg="invalid distance too far back",n.mode=o;break e}if(M=0,C=m,0===h){if(M+=c-_,S>_){S-=_;do D[s++]=m[M++];while(--_);M=s-x,C=D}}else if(_>h){if(M+=c+h-_,_-=h,S>_){S-=_;do D[s++]=m[M++];while(--_);if(M=0,S>h){_=h,S-=_;do D[s++]=m[M++];while(--_);M=s-x,C=D}}}else if(M+=h-_,S>_){S-=_;do D[s++]=m[M++];while(--_);M=s-x,C=D}for(;S>2;)D[s++]=C[M++],D[s++]=C[M++],D[s++]=C[M++],S-=3;S&&(D[s++]=C[M++],S>1&&(D[s++]=C[M++]))}else{M=s-x;do D[s++]=D[M++],D[s++]=D[M++],D[s++]=D[M++],S-=3;while(S>2);S&&(D[s++]=D[M++],S>1&&(D[s++]=D[M++]))}break}}break}}while(r>a&&l>s);S=b>>3,a-=S,b-=S<<3,p&=(1<<b)-1,e.next_in=a,e.next_out=s,e.avail_in=r>a?5+(r-a):5-(a-r),e.avail_out=l>s?257+(l-s):257-(s-l),n.hold=p,n.bits=b}},{}],8:[function(e,t,n){"use strict";function o(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function i(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new w.Buf16(320),this.work=new w.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=O,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new w.Buf32(me),t.distcode=t.distdyn=new w.Buf32(pe),t.sane=1,t.back=-1,D):L}function r(e){var t;return e&&e.state?(t=e.state,t.wsize=0,t.whave=0,t.wnext=0,a(e)):L}function s(e,t){var n,o;return e&&e.state?(o=e.state,0>t?(n=0,t=-t):(n=(t>>4)+1,48>t&&(t&=15)),t&&(8>t||t>15)?L:(null!==o.window&&o.wbits!==t&&(o.window=null),o.wrap=n,o.wbits=t,r(e))):L}function d(e,t){var n,o;return e?(o=new i,e.state=o,o.window=null,n=s(e,t),n!==D&&(e.state=null),n):L}function l(e){return d(e,we)}function u(e){if(ge){var t;for(p=new w.Buf32(512),b=new w.Buf32(32),t=0;144>t;)e.lens[t++]=8;for(;256>t;)e.lens[t++]=9;for(;280>t;)e.lens[t++]=7;for(;288>t;)e.lens[t++]=8;for(y(S,e.lens,0,288,p,0,e.work,{bits:9}),t=0;32>t;)e.lens[t++]=5;y(x,e.lens,0,32,b,0,e.work,{bits:5}),ge=!1}e.lencode=p,e.lenbits=9,e.distcode=b,e.distbits=5}function c(e,t,n,o){var i,a=e.state;return null===a.window&&(a.wsize=1<<a.wbits,a.wnext=0,a.whave=0,a.window=new w.Buf8(a.wsize)),o>=a.wsize?(w.arraySet(a.window,t,n-a.wsize,a.wsize,0),a.wnext=0,a.whave=a.wsize):(i=a.wsize-a.wnext,i>o&&(i=o),w.arraySet(a.window,t,n-o,i,a.wnext),o-=i,o?(w.arraySet(a.window,t,n-o,o,0),a.wnext=o,a.whave=a.wsize):(a.wnext+=i,a.wnext===a.wsize&&(a.wnext=0),a.whave<a.wsize&&(a.whave+=i))),0}function f(e,t){var n,i,a,r,s,d,l,f,h,m,p,b,me,pe,be,we,ge,ve,ke,ye,_e,Se,xe,Me,Ce=0,Ee=new w.Buf8(4),De=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return L;n=e.state,n.mode===W&&(n.mode=K),s=e.next_out,a=e.output,l=e.avail_out,r=e.next_in,i=e.input,d=e.avail_in,f=n.hold,h=n.bits,m=d,p=l,Se=D;e:for(;;)switch(n.mode){case O:if(0===n.wrap){n.mode=K;break}for(;16>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(2&n.wrap&&35615===f){n.check=0,Ee[0]=255&f,Ee[1]=f>>>8&255,n.check=v(n.check,Ee,2,0),f=0,h=0,n.mode=z;break}if(n.flags=0,n.head&&(n.head.done=!1),!(1&n.wrap)||(((255&f)<<8)+(f>>8))%31){e.msg="incorrect header check",n.mode=ce;break}if((15&f)!==B){e.msg="unknown compression method",n.mode=ce;break}if(f>>>=4,h-=4,_e=(15&f)+8,0===n.wbits)n.wbits=_e;else if(_e>n.wbits){e.msg="invalid window size",n.mode=ce;break}n.dmax=1<<_e,e.adler=n.check=1,n.mode=512&f?j:W,f=0,h=0;break;case z:for(;16>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(n.flags=f,(255&n.flags)!==B){e.msg="unknown compression method",n.mode=ce;break}if(57344&n.flags){e.msg="unknown header flags set",n.mode=ce;break}n.head&&(n.head.text=f>>8&1),512&n.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,n.check=v(n.check,Ee,2,0)),f=0,h=0,n.mode=N;case N:for(;32>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}n.head&&(n.head.time=f),512&n.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,Ee[2]=f>>>16&255,Ee[3]=f>>>24&255,n.check=v(n.check,Ee,4,0)),f=0,h=0,n.mode=T;case T:for(;16>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}n.head&&(n.head.xflags=255&f,n.head.os=f>>8),512&n.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,n.check=v(n.check,Ee,2,0)),f=0,h=0,n.mode=Z;case Z:if(1024&n.flags){for(;16>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}n.length=f,n.head&&(n.head.extra_len=f),512&n.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,n.check=v(n.check,Ee,2,0)),f=0,h=0}else n.head&&(n.head.extra=null);n.mode=P;case P:if(1024&n.flags&&(b=n.length,b>d&&(b=d),b&&(n.head&&(_e=n.head.extra_len-n.length,n.head.extra||(n.head.extra=new Array(n.head.extra_len)),w.arraySet(n.head.extra,i,r,b,_e)),512&n.flags&&(n.check=v(n.check,i,b,r)),d-=b,r+=b,n.length-=b),n.length))break e;n.length=0,n.mode=q;case q:if(2048&n.flags){if(0===d)break e;b=0;do _e=i[r+b++],n.head&&_e&&n.length<65536&&(n.head.name+=String.fromCharCode(_e));while(_e&&d>b);if(512&n.flags&&(n.check=v(n.check,i,b,r)),d-=b,r+=b,_e)break e}else n.head&&(n.head.name=null);n.length=0,n.mode=G;case G:if(4096&n.flags){if(0===d)break e;b=0;do _e=i[r+b++],n.head&&_e&&n.length<65536&&(n.head.comment+=String.fromCharCode(_e));while(_e&&d>b);if(512&n.flags&&(n.check=v(n.check,i,b,r)),d-=b,r+=b,_e)break e}else n.head&&(n.head.comment=null);n.mode=H;case H:if(512&n.flags){for(;16>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(f!==(65535&n.check)){e.msg="header crc mismatch",n.mode=ce;break}f=0,h=0}n.head&&(n.head.hcrc=n.flags>>9&1,n.head.done=!0),e.adler=n.check=0,n.mode=W;break;case j:for(;32>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}e.adler=n.check=o(f),f=0,h=0,n.mode=J;case J:if(0===n.havedict)return e.next_out=s,e.avail_out=l,e.next_in=r,e.avail_in=d,n.hold=f,n.bits=h,I;e.adler=n.check=1,n.mode=W;case W:if(t===C||t===E)break e;case K:if(n.last){f>>>=7&h,h-=7&h,n.mode=de;break}for(;3>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}switch(n.last=1&f,f>>>=1,h-=1,3&f){case 0:n.mode=Y;break;case 1:if(u(n),n.mode=te,t===E){f>>>=2,h-=2;break e}break;case 2:n.mode=V;break;case 3:e.msg="invalid block type",n.mode=ce}f>>>=2,h-=2;break;case Y:for(f>>>=7&h,h-=7&h;32>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if((65535&f)!==(f>>>16^65535)){e.msg="invalid stored block lengths",n.mode=ce;break}if(n.length=65535&f,f=0,h=0,n.mode=X,t===E)break e;case X:n.mode=$;case $:if(b=n.length){if(b>d&&(b=d),b>l&&(b=l),0===b)break e;w.arraySet(a,i,r,b,s),d-=b,r+=b,l-=b,s+=b,n.length-=b;break}n.mode=W;break;case V:for(;14>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(n.nlen=(31&f)+257,f>>>=5,h-=5,n.ndist=(31&f)+1,f>>>=5,h-=5,n.ncode=(15&f)+4,f>>>=4,h-=4,n.nlen>286||n.ndist>30){e.msg="too many length or distance symbols",n.mode=ce;break}n.have=0,n.mode=Q;case Q:for(;n.have<n.ncode;){for(;3>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}n.lens[De[n.have++]]=7&f,f>>>=3,h-=3}for(;n.have<19;)n.lens[De[n.have++]]=0;if(n.lencode=n.lendyn,n.lenbits=7,xe={bits:n.lenbits},Se=y(_,n.lens,0,19,n.lencode,0,n.work,xe),n.lenbits=xe.bits,Se){e.msg="invalid code lengths set",n.mode=ce;break}n.have=0,n.mode=ee;case ee:for(;n.have<n.nlen+n.ndist;){for(;Ce=n.lencode[f&(1<<n.lenbits)-1],be=Ce>>>24,we=Ce>>>16&255,ge=65535&Ce,!(h>=be);){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(16>ge)f>>>=be,h-=be,n.lens[n.have++]=ge;else{if(16===ge){for(Me=be+2;Me>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(f>>>=be,h-=be,0===n.have){e.msg="invalid bit length repeat",n.mode=ce;break}_e=n.lens[n.have-1],b=3+(3&f),f>>>=2,h-=2}else if(17===ge){for(Me=be+3;Me>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}f>>>=be,h-=be,_e=0,b=3+(7&f),f>>>=3,h-=3}else{for(Me=be+7;Me>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}f>>>=be,h-=be,_e=0,b=11+(127&f),f>>>=7,h-=7}if(n.have+b>n.nlen+n.ndist){e.msg="invalid bit length repeat",n.mode=ce;break}for(;b--;)n.lens[n.have++]=_e}}if(n.mode===ce)break;if(0===n.lens[256]){e.msg="invalid code -- missing end-of-block",n.mode=ce;break}if(n.lenbits=9,xe={bits:n.lenbits},Se=y(S,n.lens,0,n.nlen,n.lencode,0,n.work,xe),n.lenbits=xe.bits,Se){e.msg="invalid literal/lengths set",n.mode=ce;break}if(n.distbits=6,n.distcode=n.distdyn,xe={bits:n.distbits},Se=y(x,n.lens,n.nlen,n.ndist,n.distcode,0,n.work,xe),n.distbits=xe.bits,Se){e.msg="invalid distances set",n.mode=ce;break}if(n.mode=te,t===E)break e;case te:n.mode=ne;case ne:if(d>=6&&l>=258){e.next_out=s,e.avail_out=l,e.next_in=r,e.avail_in=d,n.hold=f,n.bits=h,k(e,p),s=e.next_out,a=e.output,l=e.avail_out,r=e.next_in,i=e.input,d=e.avail_in,f=n.hold,h=n.bits,n.mode===W&&(n.back=-1);break}for(n.back=0;Ce=n.lencode[f&(1<<n.lenbits)-1],be=Ce>>>24,we=Ce>>>16&255,ge=65535&Ce,!(h>=be);){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(we&&0===(240&we)){for(ve=be,ke=we,ye=ge;Ce=n.lencode[ye+((f&(1<<ve+ke)-1)>>ve)],be=Ce>>>24,we=Ce>>>16&255,ge=65535&Ce,!(h>=ve+be);){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}f>>>=ve,h-=ve,n.back+=ve}if(f>>>=be,h-=be,n.back+=be,n.length=ge,0===we){n.mode=se;break}if(32&we){n.back=-1,n.mode=W;break}if(64&we){e.msg="invalid literal/length code",n.mode=ce;break}n.extra=15&we,n.mode=oe;case oe:if(n.extra){for(Me=n.extra;Me>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}n.length+=f&(1<<n.extra)-1,f>>>=n.extra,h-=n.extra,n.back+=n.extra}n.was=n.length,n.mode=ie;case ie:for(;Ce=n.distcode[f&(1<<n.distbits)-1],be=Ce>>>24,we=Ce>>>16&255,ge=65535&Ce,!(h>=be);){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(0===(240&we)){for(ve=be,ke=we,ye=ge;Ce=n.distcode[ye+((f&(1<<ve+ke)-1)>>ve)],be=Ce>>>24,we=Ce>>>16&255,ge=65535&Ce,!(h>=ve+be);){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}f>>>=ve,h-=ve,n.back+=ve}if(f>>>=be,h-=be,n.back+=be,64&we){e.msg="invalid distance code",n.mode=ce;break}n.offset=ge,n.extra=15&we,n.mode=ae;case ae:if(n.extra){for(Me=n.extra;Me>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}n.offset+=f&(1<<n.extra)-1,f>>>=n.extra,h-=n.extra,n.back+=n.extra}if(n.offset>n.dmax){e.msg="invalid distance too far back",n.mode=ce;break}n.mode=re;case re:if(0===l)break e;if(b=p-l,n.offset>b){if(b=n.offset-b,b>n.whave&&n.sane){e.msg="invalid distance too far back",n.mode=ce;break}b>n.wnext?(b-=n.wnext,me=n.wsize-b):me=n.wnext-b,b>n.length&&(b=n.length),pe=n.window}else pe=a,me=s-n.offset,b=n.length;b>l&&(b=l),l-=b,n.length-=b;do a[s++]=pe[me++];while(--b);0===n.length&&(n.mode=ne);break;case se:if(0===l)break e;a[s++]=n.length,l--,n.mode=ne;break;case de:if(n.wrap){for(;32>h;){if(0===d)break e;d--,f|=i[r++]<<h,h+=8}if(p-=l,e.total_out+=p,n.total+=p,p&&(e.adler=n.check=n.flags?v(n.check,a,p,s-p):g(n.check,a,p,s-p)),p=l,(n.flags?f:o(f))!==n.check){e.msg="incorrect data check",n.mode=ce;break}f=0,h=0}n.mode=le;case le:if(n.wrap&&n.flags){for(;32>h;){if(0===d)break e;d--,f+=i[r++]<<h,h+=8}if(f!==(4294967295&n.total)){e.msg="incorrect length check",n.mode=ce;break}f=0,h=0}n.mode=ue;case ue:Se=R;break e;case ce:Se=F;break e;case fe:return U;case he:default:return L}return e.next_out=s,e.avail_out=l,e.next_in=r,e.avail_in=d,n.hold=f,n.bits=h,(n.wsize||p!==e.avail_out&&n.mode<ce&&(n.mode<de||t!==M))&&c(e,e.output,e.next_out,p-e.avail_out)?(n.mode=fe,U):(m-=e.avail_in,p-=e.avail_out,e.total_in+=m,e.total_out+=p,n.total+=p,n.wrap&&p&&(e.adler=n.check=n.flags?v(n.check,a,p,e.next_out-p):g(n.check,a,p,e.next_out-p)),e.data_type=n.bits+(n.last?64:0)+(n.mode===W?128:0)+(n.mode===te||n.mode===X?256:0),(0===m&&0===p||t===M)&&Se===D&&(Se=A),Se)}function h(e){if(!e||!e.state)return L;var t=e.state;return t.window&&(t.window=null),e.state=null,D}function m(e,t){var n;return e&&e.state?(n=e.state,0===(2&n.wrap)?L:(n.head=t,t.done=!1,D)):L}var p,b,w=e("../utils/common"),g=e("./adler32"),v=e("./crc32"),k=e("./inffast"),y=e("./inftrees"),_=0,S=1,x=2,M=4,C=5,E=6,D=0,R=1,I=2,L=-2,F=-3,U=-4,A=-5,B=8,O=1,z=2,N=3,T=4,Z=5,P=6,q=7,G=8,H=9,j=10,J=11,W=12,K=13,Y=14,X=15,$=16,V=17,Q=18,ee=19,te=20,ne=21,oe=22,ie=23,ae=24,re=25,se=26,de=27,le=28,ue=29,ce=30,fe=31,he=32,me=852,pe=592,be=15,we=be,ge=!0;n.inflateReset=r,n.inflateReset2=s,n.inflateResetKeep=a,n.inflateInit=l,n.inflateInit2=d,n.inflate=f,n.inflateEnd=h,n.inflateGetHeader=m,n.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":1,"./adler32":3,"./crc32":5,"./inffast":7,"./inftrees":9}],9:[function(e,t,n){"use strict";var o=e("../utils/common"),i=15,a=852,r=592,s=0,d=1,l=2,u=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],c=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],f=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,n,m,p,b,w,g){var v,k,y,_,S,x,M,C,E,D=g.bits,R=0,I=0,L=0,F=0,U=0,A=0,B=0,O=0,z=0,N=0,T=null,Z=0,P=new o.Buf16(i+1),q=new o.Buf16(i+1),G=null,H=0;for(R=0;i>=R;R++)P[R]=0;for(I=0;m>I;I++)P[t[n+I]]++;for(U=D,F=i;F>=1&&0===P[F];F--);if(U>F&&(U=F),0===F)return p[b++]=20971520,p[b++]=20971520,g.bits=1,0;for(L=1;F>L&&0===P[L];L++);for(L>U&&(U=L),O=1,R=1;i>=R;R++)if(O<<=1,O-=P[R],0>O)return-1;if(O>0&&(e===s||1!==F))return-1;for(q[1]=0,R=1;i>R;R++)q[R+1]=q[R]+P[R];for(I=0;m>I;I++)0!==t[n+I]&&(w[q[t[n+I]]++]=I);if(e===s?(T=G=w,x=19):e===d?(T=u,Z-=257,G=c,H-=257,x=256):(T=f,G=h,x=-1),N=0,I=0,R=L,S=b,A=U,B=0,y=-1,z=1<<U,_=z-1,e===d&&z>a||e===l&&z>r)return 1;for(var j=0;;){j++,M=R-B,w[I]<x?(C=0,E=w[I]):w[I]>x?(C=G[H+w[I]],E=T[Z+w[I]]):(C=96,E=0),v=1<<R-B,k=1<<A,L=k;do k-=v,p[S+(N>>B)+k]=M<<24|C<<16|E|0;while(0!==k);for(v=1<<R-1;N&v;)v>>=1;if(0!==v?(N&=v-1,N+=v):N=0,I++,0===--P[R]){if(R===F)break;R=t[n+w[I]]}if(R>U&&(N&_)!==y){for(0===B&&(B=U),S+=L,A=R-B,O=1<<A;F>A+B&&(O-=P[A+B],!(0>=O));)A++,O<<=1;if(z+=1<<A,e===d&&z>a||e===l&&z>r)return 1;y=N&_,p[y]=U<<24|A<<16|S-b|0}}return 0!==N&&(p[S+N]=R-B<<24|64<<16|0),g.bits=U,0}},{"../utils/common":1}],10:[function(e,t,n){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],11:[function(e,t,n){"use strict";function o(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}t.exports=o},{}],"/lib/inflate.js":[function(e,t,n){"use strict";function o(e,t){var n=new h(t);if(n.push(e,!0),n.err)throw n.msg;return n.result}function i(e,t){return t=t||{},t.raw=!0,o(e,t)}var a=e("./zlib/inflate.js"),r=e("./utils/common"),s=e("./utils/strings"),d=e("./zlib/constants"),l=e("./zlib/messages"),u=e("./zlib/zstream"),c=e("./zlib/gzheader"),f=Object.prototype.toString,h=function(e){this.options=r.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(t.windowBits>=0&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&0===(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new u,this.strm.avail_out=0;var n=a.inflateInit2(this.strm,t.windowBits);if(n!==d.Z_OK)throw new Error(l[n]);this.header=new c,a.inflateGetHeader(this.strm,this.header)};h.prototype.push=function(e,t){var n,o,i,l,u,c=this.strm,h=this.options.chunkSize;if(this.ended)return!1;o=t===~~t?t:t===!0?d.Z_FINISH:d.Z_NO_FLUSH,"string"==typeof e?c.input=s.binstring2buf(e):"[object ArrayBuffer]"===f.call(e)?c.input=new Uint8Array(e):c.input=e,c.next_in=0,c.avail_in=c.input.length;do{if(0===c.avail_out&&(c.output=new r.Buf8(h),c.next_out=0,c.avail_out=h),n=a.inflate(c,d.Z_NO_FLUSH),n!==d.Z_STREAM_END&&n!==d.Z_OK)return this.onEnd(n),this.ended=!0,!1;c.next_out&&(0===c.avail_out||n===d.Z_STREAM_END||0===c.avail_in&&(o===d.Z_FINISH||o===d.Z_SYNC_FLUSH))&&("string"===this.options.to?(i=s.utf8border(c.output,c.next_out),l=c.next_out-i,u=s.buf2string(c.output,i),c.next_out=l,c.avail_out=h-l,l&&r.arraySet(c.output,c.output,i,l,0),this.onData(u)):this.onData(r.shrinkBuf(c.output,c.next_out)))}while(c.avail_in>0&&n!==d.Z_STREAM_END);return n===d.Z_STREAM_END&&(o=d.Z_FINISH),o===d.Z_FINISH?(n=a.inflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===d.Z_OK):o===d.Z_SYNC_FLUSH?(this.onEnd(d.Z_OK),c.avail_out=0,!0):!0},h.prototype.onData=function(e){this.chunks.push(e)},h.prototype.onEnd=function(e){e===d.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=r.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},n.Inflate=h,n.inflate=o,n.inflateRaw=i,n.ungzip=o},{"./utils/common":1,"./utils/strings":2,"./zlib/constants":4,"./zlib/gzheader":6,"./zlib/inflate.js":8,"./zlib/messages":10,"./zlib/zstream":11}]},{},[])("/lib/inflate.js")}),window.unityDecompressReleaseFile=pako.inflate,window.unityDecompressReleaseFileExtension="gz";var CompressionState={Uninitialized:0,Pending:1,Unsupported:2,Supported:3,current:0,pendingServerRequests:[],Set:function(e){if(CompressionState.current==CompressionState.Pending){CompressionState.current=e;for(var t=0;t<CompressionState.pendingServerRequests.length;t++)CompressionState.pendingServerRequests[t]()}}};Module.memoryInitializerRequest={status:-1,response:null,callback:null,addEventListener:function(e,t){if("load"!=e)throw"Unexpected type "+e;this.callback=t}},LoadCompressedFile(Module.memUrl,function(e){Module.memoryInitializerRequest.status=200,Module.memoryInitializerRequest.response=e,Module.memoryInitializerRequest.callback&&Module.memoryInitializerRequest.callback()}),LoadCode();var browser=function(){var e,t=navigator.userAgent,n=t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];return/trident/i.test(n[1])?(e=/\brv[ :]+(\d+)/g.exec(t)||[],"IE "+(e[1]||"")):"Chrome"===n[1]&&(e=t.match(/\bOPR\/(\d+)/),null!=e)?"Opera "+e[1]:(n=n[2]?[n[1],n[2]]:[navigator.appName,navigator.appVersion,"-?"],null!=(e=t.match(/version\/(\d+)/i))&&n.splice(1,1,e[1]),n.join(" "))}(),hasWebGL=function(){if(!window.WebGLRenderingContext)return 0;var e=document.createElement("canvas"),t=e.getContext("webgl");return t||(t=e.getContext("experimental-webgl"))?1:0}(),mobile=function(e){return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4));
}(navigator.userAgent||navigator.vendor||window.opera);Module.compatibilitycheck?Module.compatibilitycheck():CompatibilityCheck();var didShowErrorMessage=!1;"function"!=typeof window.onerror&&(Error.stackTraceLimit=50,window.onerror=function(e,t,n){return!Module.debugSymbolsUrl||Module.debugSymbols?UnityErrorHandler(demangleError(e),t,n):void LoadCompressedJS(Module.debugSymbolsUrl,function(){UnityErrorHandler(demangleError(e),t,n)})}),Module.locateFile=function(e){return Module.dataUrl},Module.preRun=[],Module.postRun=[],Module.print=function(){return function(e){console.log(e)}}(),Module.printErr=function(e){console.error(e)},Module.canvas=document.getElementById("canvas"),Module.progress=null,Module.setStatus=function(e){if(null==this.progress){if("function"!=typeof UnityProgress)return;this.progress=new UnityProgress(canvas)}if(Module.setStatus.last||(Module.setStatus.last={time:Date.now(),text:""}),e!==Module.setStatus.text){this.progress.SetMessage(e);var t=e.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);t&&this.progress.SetProgress(parseInt(t[2])/parseInt(t[4])),""===e&&this.progress.Clear()}},Module.totalDependencies=0,Module.monitorRunDependencies=function(e){this.totalDependencies=Math.max(this.totalDependencies,e),Module.setStatus(e?"Preparing... ("+(this.totalDependencies-e)+"/"+this.totalDependencies+")":"All downloads complete.")},Module.setStatus("Downloading (0.0/1)");var Module;"undefined"==typeof Module&&(Module=eval("(function() { try { return Module || {} } catch(e) { return {} } })()")),Module.expectedDataFileDownloads||(Module.expectedDataFileDownloads=0,Module.finishedDataFileDownloads=0),Module.expectedDataFileDownloads++,function(){var e=function(e){function t(e){console.error("package error:",e)}function n(){function t(e,t){if(!e)throw t+(new Error).stack}function n(e,t,n,o){this.start=e,this.end=t,this.crunched=n,this.audio=o}function o(o){Module.finishedDataFileDownloads++,t(o,"Loading data file failed."),t(o instanceof ArrayBuffer,"bad input to processPackageData");var a=new Uint8Array(o);n.prototype.byteArray=a;var r=e.files;for(i=0;i<r.length;++i)n.prototype.requests[r[i].filename].onload();Module.removeRunDependency("datafile_build.data")}Module.FS_createPath("/","Il2CppData",!0,!0),Module.FS_createPath("/Il2CppData","Metadata",!0,!0),Module.FS_createPath("/","Resources",!0,!0),Module.FS_createPath("/","Managed",!0,!0),Module.FS_createPath("/Managed","mono",!0,!0),Module.FS_createPath("/Managed/mono","2.0",!0,!0),n.prototype={requests:{},open:function(e,t){this.name=t,this.requests[t]=this,Module.addRunDependency("fp "+this.name)},send:function(){},onload:function(){var e=this.byteArray.subarray(this.start,this.end);this.finish(e)},finish:function(e){var t=this;Module.FS_createDataFile(this.name,null,e,!0,!0,!0),Module.removeRunDependency("fp "+t.name),this.requests[this.name]=null}};var r=e.files;for(i=0;i<r.length;++i)new n(r[i].start,r[i].end,r[i].crunched,r[i].audio).open("GET",r[i].filename);Module.addRunDependency("datafile_build.data"),Module.preloadResults||(Module.preloadResults={}),Module.preloadResults[a]={fromCache:!1},l?(o(l),l=null):u=o}var o;if("object"==typeof window)o=window.encodeURIComponent(window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/");else{if("undefined"==typeof location)throw"using preloaded data can only be done on a web page or in a web worker";o=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}var a="build.data",r="build.data";"function"!=typeof Module.locateFilePackage||Module.locateFile||(Module.locateFile=Module.locateFilePackage,Module.printErr("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)"));var s="function"==typeof Module.locateFile?Module.locateFile(r):(Module.filePackagePrefixURL||"")+r,d=e.remote_package_size,l=(e.package_uuid,null),u=null;fetchRemotePackageWrapper(s,d,function(e){u?(u(e),u=null):l=e},t),Module.calledRun?n():(Module.preRun||(Module.preRun=[]),Module.preRun.push(n))};e({files:[{audio:0,start:0,crunched:0,end:504680,filename:"/data.unity3d"},{audio:0,start:504680,crunched:0,end:505051,filename:"/methods_pointedto_by_uievents.xml"},{audio:0,start:505051,crunched:0,end:508037,filename:"/preserved_derived_types.xml"},{audio:0,start:508037,crunched:0,end:2379909,filename:"/Il2CppData/Metadata/global-metadata.dat"},{audio:0,start:2379909,crunched:0,end:3114057,filename:"/Resources/unity_default_resources"},{audio:0,start:3114057,crunched:0,end:3141682,filename:"/Managed/mono/2.0/machine.config"}],remote_package_size:3141682,package_uuid:"f5c828dc-a091-461c-a069-e2456b0c7ba0"})}();