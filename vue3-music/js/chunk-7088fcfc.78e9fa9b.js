(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7088fcfc"],{"74a6":function(e,t,c){"use strict";c("b0a0")},8298:function(e,t,c){},"859d":function(e,t,c){},a35f:function(e,t,c){"use strict";c("859d")},b0a0:function(e,t,c){},b988:function(e,t,c){"use strict";c.r(t);c("b0c0");var n=c("7a23"),a={class:"wrap global-bg"},i={class:"detail-mask",ref:"maskRef"},r={class:"detail-mask-inner"};function l(e,t,c,l,s,o){var u=Object(n["F"])("sub-header"),b=Object(n["F"])("detail-cover"),d=Object(n["F"])("detail-list"),f=Object(n["G"])("load");return Object(n["x"])(),Object(n["h"])("div",a,[Object(n["k"])(b,{isFixed:l.isFixed,onImgLoad:l.onImgLoad,pic:l.playlist.coverImgUrl,ref:"picRef"},{default:Object(n["Q"])((function(){return[Object(n["k"])(u,{class:"sub-header",ref:"navRef"},{default:Object(n["Q"])((function(){return[Object(n["j"])(Object(n["J"])(l.playlist&&l.playlist.name),1)]})),_:1},512)]})),_:1},8,["isFixed","onImgLoad","pic"]),l.playlist?(Object(n["x"])(),Object(n["f"])(d,{key:0,onScroll:l.onScroll,isPic:l.isPic,list:l.playlist.tracks,ref:"scrollRef"},null,8,["onScroll","isPic","list"])):Object(n["g"])("",!0),Object(n["i"])("div",i,[Object(n["R"])(Object(n["i"])("div",r,null,512),[[f,!l.isPicLoad]])],512)])}var s=c("1da1"),o=(c("96cf"),c("4795"),c("483a")),u={class:"header-top"},b={class:"mask",ref:"maskRef"},d=["src"],f={class:"singer"};function j(e,t,c,a,i,r){return Object(n["x"])(),Object(n["h"])(n["a"],null,[Object(n["i"])("div",u,[Object(n["E"])(e.$slots,"default",{},void 0,!0)]),Object(n["i"])("div",{class:Object(n["q"])(["cover-wrap",{"has-fixed":c.isFixed}])},[Object(n["i"])("div",b,null,512),Object(n["i"])("img",{ref:"picRef",src:c.pic,onLoad:t[0]||(t[0]=function(){return a.onImgLoad&&a.onImgLoad.apply(a,arguments)})},null,40,d),Object(n["i"])("h4",f,Object(n["J"])(c.singer),1)],2)],64)}var p={name:"detail-cover",props:["pic","singer","isFixed"],emits:["img-load"],setup:function(e,t){var c=t.emit,a=Object(n["C"])(!0),i=Object(n["C"])(null),r=Object(n["C"])(null),l=function(e){c("img-load"),r.value&&(r.value.style.height=e.target.clientHeight+"px")};return{picRef:i,maskRef:r,isShow:a,onImgLoad:l}}},O=(c("74a6"),c("6b0d")),v=c.n(O);const m=v()(p,[["render",j],["__scopeId","data-v-11e3d7af"]]);var y=m,g={class:"wrap-bg"},R={class:"header"},x=Object(n["j"])("音乐列表 "),h={class:"word"},k={class:"icon shunxu",ref:"playModeTypeRef"},C={class:"content"},S=["onClick"],w={key:0,class:"pic"},I={ref:"pic"},L={class:"desc"},P={class:"sub-name"};function F(e,t,c,a,i,r){var l=Object(n["F"])("mini-player-box"),s=Object(n["F"])("scroll"),o=Object(n["G"])("lazy");return Object(n["x"])(),Object(n["f"])(s,{class:"list-wrap","probe-type":"3",ref:"scrollRef",bounce:!0,onScroll:a.onScroll},{default:Object(n["Q"])((function(){return[Object(n["i"])("div",g,[Object(n["i"])("div",R,[x,Object(n["i"])("div",{class:"operate",onClick:t[0]||(t[0]=function(){return a.onPlayModeType&&a.onPlayModeType.apply(a,arguments)})},[Object(n["i"])("span",h,Object(n["J"])(a.calcCurrPlayModeType),1),Object(n["i"])("i",k,null,512)])]),Object(n["i"])("div",C,[(Object(n["x"])(!0),Object(n["h"])(n["a"],null,Object(n["D"])(c.list,(function(e){return Object(n["x"])(),Object(n["h"])("div",{class:"item",key:e.id,onClick:function(t){return a.onSelectItem(e)}},[c.isPic?(Object(n["x"])(),Object(n["h"])("div",w,[Object(n["R"])(Object(n["i"])("img",I,null,512),[[o,e.al.picUrl]])])):Object(n["g"])("",!0),Object(n["i"])("div",L,[Object(n["i"])("h4",{class:Object(n["q"])(["name",{active:a.currentSong.id===e.id}])},Object(n["J"])(e.name),3),Object(n["i"])("h4",P,Object(n["J"])(e.ar[0].name)+" - "+Object(n["J"])(e.al.name),1)])],8,S)})),128))])]),Object(n["k"])(l)]})),_:1},8,["onScroll"])}c("4160"),c("159b"),c("a15b"),c("d81d");var T=c("ef39"),J=c("5502"),M=c("d69f"),_=c("b7c5"),U=c("e7a0"),D=c("3325"),H=c("3a13"),N=c("753e"),Q={name:"detail-list",props:["list","isPic"],emits:["scroll"],components:{MiniPlayerBox:M["a"],Scroll:T["a"]},setup:function(e,t){var c=t.emit,a=Object(J["c"])(),i=Object(n["C"])(null),r=function(e){c("scroll",e)};Object(D["a"])({});var l=Object(N["a"])(),o=l.playListToId,u=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(c){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=JSON.parse(JSON.stringify(e.list)),n.forEach((function(e){e.picUrl=e.al.picUrl,e.singer=e.ar.map((function(e){return e.name})).join(" ")})),t.next=4,o(n,c.id);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),b=Object(n["C"])(null),d=Object(_["a"])({playModeTypeRef:b}),f=d.calcCurrPlayModeType,j=Object(U["a"])(),p=j.playSongs,O=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p(e.list);case 2:a.commit("setFullScreen",!0);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),v=Object(H["a"])(),m=v.currentSong;return{onScroll:r,pic:i,onSelectItem:u,playModeTypeRef:b,calcCurrPlayModeType:f,onPlayModeType:O,currentSong:m}}};c("a35f");const $=v()(Q,[["render",F],["__scopeId","data-v-4df85dbd"]]);var q=$,z=c("365c"),B=c("6c02"),E=(c("4de4"),function(){var e,t,c,a,i=Object(n["C"])(null),r=Object(n["C"])(null),l=Object(n["C"])(null);Object(n["v"])((function(){e=i.value.picRef.parentNode,t=r.value.$el,c=l.value.$el.getBoundingClientRect().y,a=t.clientHeight}));var s=function(n){var i=n.y;if(i>0)e.style.transform="scale(".concat(1+i/c,")");else{var r=-i/c;r>1.2&&(r=1),e.style.filter="sepia(".concat(r,")")}i<=-(c-a)?(t.classList.add("fixed"),e.classList.add("fixed")):(t.classList.remove("fixed"),e.classList.remove("fixed"))};return{picRef:i,navRef:r,onScroll:s,scrollRef:l}}),G={name:"Recommend-detail",components:{DetailList:q,DetailCover:y,SubHeader:o["a"]},setup:function(){var e=Object(B["c"])(),t=Object(n["C"])({}),c=Object(n["C"])(null),a=Object(n["C"])(!1),i=Object(n["C"])(!0),r=Object(n["C"])(null),l=Object(n["C"])(!1),o=function(){l.value=!0,setTimeout((function(){r.value&&r.value.classList.add("hide")}))},u=E(),b=u.onScroll,d=u.picRef,f=u.navRef,j=u.scrollRef;return Object(n["P"])(Object(s["a"])(regeneratorRuntime.mark((function c(){var n,a,r,l,s;return regeneratorRuntime.wrap((function(c){while(1)switch(c.prev=c.next){case 0:if(n=e.params.id,a=e.params.type,"personalized"!==a){c.next=7;break}return c.next=5,Object(z["j"])({id:n});case 5:r=c.sent,t.value=r.playlist;case 7:if("album"!==a){c.next=15;break}return i.value=!1,c.next=11,Object(z["b"])({id:n});case 11:l=c.sent,t.value=l.album,t.value.coverImgUrl=l.album.blurPicUrl,t.value.tracks=l.songs;case 15:if("singer"!==a){c.next=23;break}return i.value=!0,c.next=19,Object(z["o"])(n);case 19:s=c.sent,t.value.coverImgUrl=s.coverImgUrl,t.value.name=s.name,t.value.tracks=s.songs;case 23:case"end":return c.stop()}}),c)})))),{playlist:t,coverRef:c,onScroll:b,picRef:d,navRef:f,scrollRef:j,isFixed:a,isPic:i,isPicLoad:l,onImgLoad:o,maskRef:r}}};c("e879");const A=v()(G,[["render",l],["__scopeId","data-v-7fe4b5b6"]]);t["default"]=A},e879:function(e,t,c){"use strict";c("8298")}}]);