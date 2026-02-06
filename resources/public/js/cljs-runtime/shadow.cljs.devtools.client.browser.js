goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__5732__auto__ = [];
var len__5726__auto___48385 = arguments.length;
var i__5727__auto___48386 = (0);
while(true){
if((i__5727__auto___48386 < len__5726__auto___48385)){
args__5732__auto__.push((arguments[i__5727__auto___48386]));

var G__48388 = (i__5727__auto___48386 + (1));
i__5727__auto___48386 = G__48388;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic = (function (msg,args){
if(shadow.cljs.devtools.client.env.log){
if(cljs.core.seq(shadow.cljs.devtools.client.env.log_style)){
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [["%cshadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join(''),shadow.cljs.devtools.client.env.log_style], null),args)));
} else {
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["shadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join('')], null),args)));
}
} else {
return null;
}
}));

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq47819){
var G__47820 = cljs.core.first(seq47819);
var seq47819__$1 = cljs.core.next(seq47819);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__47820,seq47819__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__47826 = cljs.core.seq(sources);
var chunk__47827 = null;
var count__47828 = (0);
var i__47829 = (0);
while(true){
if((i__47829 < count__47828)){
var map__47841 = chunk__47827.cljs$core$IIndexed$_nth$arity$2(null, i__47829);
var map__47841__$1 = cljs.core.__destructure_map(map__47841);
var src = map__47841__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47841__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47841__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47841__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47841__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e47842){var e_48402 = e47842;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_48402);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_48402.message)].join('')));
}

var G__48403 = seq__47826;
var G__48404 = chunk__47827;
var G__48405 = count__47828;
var G__48406 = (i__47829 + (1));
seq__47826 = G__48403;
chunk__47827 = G__48404;
count__47828 = G__48405;
i__47829 = G__48406;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__47826);
if(temp__5825__auto__){
var seq__47826__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__47826__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__47826__$1);
var G__48407 = cljs.core.chunk_rest(seq__47826__$1);
var G__48408 = c__5525__auto__;
var G__48409 = cljs.core.count(c__5525__auto__);
var G__48410 = (0);
seq__47826 = G__48407;
chunk__47827 = G__48408;
count__47828 = G__48409;
i__47829 = G__48410;
continue;
} else {
var map__47847 = cljs.core.first(seq__47826__$1);
var map__47847__$1 = cljs.core.__destructure_map(map__47847);
var src = map__47847__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47847__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47847__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47847__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47847__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e47848){var e_48422 = e47848;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_48422);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_48422.message)].join('')));
}

var G__48425 = cljs.core.next(seq__47826__$1);
var G__48426 = null;
var G__48427 = (0);
var G__48428 = (0);
seq__47826 = G__48425;
chunk__47827 = G__48426;
count__47828 = G__48427;
i__47829 = G__48428;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.do_js_reload = (function shadow$cljs$devtools$client$browser$do_js_reload(msg,sources,complete_fn,failure_fn){
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(msg,new cljs.core.Keyword(null,"log-missing-fn","log-missing-fn",732676765),(function (fn_sym){
return null;
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"log-call-async","log-call-async",183826192),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call async ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
}),new cljs.core.Keyword(null,"log-call","log-call",412404391),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
})], 0)),(function (){
return shadow.cljs.devtools.client.browser.do_js_load(sources);
}),complete_fn,failure_fn);
});
/**
 * when (require '["some-str" :as x]) is done at the REPL we need to manually call the shadow.js.require for it
 * since the file only adds the shadow$provide. only need to do this for shadow-js.
 */
shadow.cljs.devtools.client.browser.do_js_requires = (function shadow$cljs$devtools$client$browser$do_js_requires(js_requires){
var seq__47851 = cljs.core.seq(js_requires);
var chunk__47852 = null;
var count__47853 = (0);
var i__47854 = (0);
while(true){
if((i__47854 < count__47853)){
var js_ns = chunk__47852.cljs$core$IIndexed$_nth$arity$2(null, i__47854);
var require_str_48441 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_48441);


var G__48442 = seq__47851;
var G__48443 = chunk__47852;
var G__48444 = count__47853;
var G__48445 = (i__47854 + (1));
seq__47851 = G__48442;
chunk__47852 = G__48443;
count__47853 = G__48444;
i__47854 = G__48445;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__47851);
if(temp__5825__auto__){
var seq__47851__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__47851__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__47851__$1);
var G__48446 = cljs.core.chunk_rest(seq__47851__$1);
var G__48447 = c__5525__auto__;
var G__48448 = cljs.core.count(c__5525__auto__);
var G__48449 = (0);
seq__47851 = G__48446;
chunk__47852 = G__48447;
count__47853 = G__48448;
i__47854 = G__48449;
continue;
} else {
var js_ns = cljs.core.first(seq__47851__$1);
var require_str_48450 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_48450);


var G__48451 = cljs.core.next(seq__47851__$1);
var G__48452 = null;
var G__48453 = (0);
var G__48454 = (0);
seq__47851 = G__48451;
chunk__47852 = G__48452;
count__47853 = G__48453;
i__47854 = G__48454;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__47864){
var map__47867 = p__47864;
var map__47867__$1 = cljs.core.__destructure_map(map__47867);
var msg = map__47867__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47867__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47867__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5480__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__47871(s__47872){
return (new cljs.core.LazySeq(null,(function (){
var s__47872__$1 = s__47872;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__47872__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var map__47878 = cljs.core.first(xs__6385__auto__);
var map__47878__$1 = cljs.core.__destructure_map(map__47878);
var src = map__47878__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47878__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47878__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5476__auto__ = ((function (s__47872__$1,map__47878,map__47878__$1,src,resource_name,warnings,xs__6385__auto__,temp__5825__auto__,map__47867,map__47867__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__47871_$_iter__47873(s__47874){
return (new cljs.core.LazySeq(null,((function (s__47872__$1,map__47878,map__47878__$1,src,resource_name,warnings,xs__6385__auto__,temp__5825__auto__,map__47867,map__47867__$1,msg,info,reload_info){
return (function (){
var s__47874__$1 = s__47874;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__47874__$1);
if(temp__5825__auto____$1){
var s__47874__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__47874__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__47874__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__47876 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__47875 = (0);
while(true){
if((i__47875 < size__5479__auto__)){
var warning = cljs.core._nth(c__5478__auto__,i__47875);
cljs.core.chunk_append(b__47876,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__48459 = (i__47875 + (1));
i__47875 = G__48459;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__47876),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__47871_$_iter__47873(cljs.core.chunk_rest(s__47874__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__47876),null);
}
} else {
var warning = cljs.core.first(s__47874__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__47871_$_iter__47873(cljs.core.rest(s__47874__$2)));
}
} else {
return null;
}
break;
}
});})(s__47872__$1,map__47878,map__47878__$1,src,resource_name,warnings,xs__6385__auto__,temp__5825__auto__,map__47867,map__47867__$1,msg,info,reload_info))
,null,null));
});})(s__47872__$1,map__47878,map__47878__$1,src,resource_name,warnings,xs__6385__auto__,temp__5825__auto__,map__47867,map__47867__$1,msg,info,reload_info))
;
var fs__5477__auto__ = cljs.core.seq(iterys__5476__auto__(warnings));
if(fs__5477__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5477__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__47871(cljs.core.rest(s__47872__$1)));
} else {
var G__48460 = cljs.core.rest(s__47872__$1);
s__47872__$1 = G__48460;
continue;
}
} else {
var G__48461 = cljs.core.rest(s__47872__$1);
s__47872__$1 = G__48461;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(info));
})()));
if(shadow.cljs.devtools.client.env.log){
var seq__47882_48462 = cljs.core.seq(warnings);
var chunk__47883_48463 = null;
var count__47884_48464 = (0);
var i__47885_48465 = (0);
while(true){
if((i__47885_48465 < count__47884_48464)){
var map__47897_48467 = chunk__47883_48463.cljs$core$IIndexed$_nth$arity$2(null, i__47885_48465);
var map__47897_48468__$1 = cljs.core.__destructure_map(map__47897_48467);
var w_48469 = map__47897_48468__$1;
var msg_48470__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47897_48468__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_48471 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47897_48468__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_48472 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47897_48468__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_48473 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47897_48468__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_48473)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_48471),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_48472),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_48470__$1)].join(''));


var G__48479 = seq__47882_48462;
var G__48480 = chunk__47883_48463;
var G__48481 = count__47884_48464;
var G__48482 = (i__47885_48465 + (1));
seq__47882_48462 = G__48479;
chunk__47883_48463 = G__48480;
count__47884_48464 = G__48481;
i__47885_48465 = G__48482;
continue;
} else {
var temp__5825__auto___48483 = cljs.core.seq(seq__47882_48462);
if(temp__5825__auto___48483){
var seq__47882_48484__$1 = temp__5825__auto___48483;
if(cljs.core.chunked_seq_QMARK_(seq__47882_48484__$1)){
var c__5525__auto___48485 = cljs.core.chunk_first(seq__47882_48484__$1);
var G__48486 = cljs.core.chunk_rest(seq__47882_48484__$1);
var G__48487 = c__5525__auto___48485;
var G__48488 = cljs.core.count(c__5525__auto___48485);
var G__48489 = (0);
seq__47882_48462 = G__48486;
chunk__47883_48463 = G__48487;
count__47884_48464 = G__48488;
i__47885_48465 = G__48489;
continue;
} else {
var map__47898_48490 = cljs.core.first(seq__47882_48484__$1);
var map__47898_48491__$1 = cljs.core.__destructure_map(map__47898_48490);
var w_48492 = map__47898_48491__$1;
var msg_48493__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47898_48491__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_48494 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47898_48491__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_48495 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47898_48491__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_48496 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47898_48491__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_48496)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_48494),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_48495),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_48493__$1)].join(''));


var G__48497 = cljs.core.next(seq__47882_48484__$1);
var G__48498 = null;
var G__48499 = (0);
var G__48500 = (0);
seq__47882_48462 = G__48497;
chunk__47883_48463 = G__48498;
count__47884_48464 = G__48499;
i__47885_48465 = G__48500;
continue;
}
} else {
}
}
break;
}
} else {
}

if((!(shadow.cljs.devtools.client.env.autoload))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(((cljs.core.empty_QMARK_(warnings)) || (shadow.cljs.devtools.client.env.ignore_warnings))){
var sources_to_get = shadow.cljs.devtools.client.env.filter_reload_sources(info,reload_info);
if(cljs.core.not(cljs.core.seq(sources_to_get))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"after-load","after-load",-1278503285)], null)))){
} else {
shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("reloading code but no :after-load hooks are configured!",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["https://shadow-cljs.github.io/docs/UsersGuide.html#_lifecycle_hooks"], 0));
}

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__47863_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__47863_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
}));
}
} else {
return null;
}
}
});
shadow.cljs.devtools.client.browser.page_load_uri = (cljs.core.truth_(goog.global.document)?goog.Uri.parse(document.location.href):null);
shadow.cljs.devtools.client.browser.match_paths = (function shadow$cljs$devtools$client$browser$match_paths(old,new$){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("file",shadow.cljs.devtools.client.browser.page_load_uri.getScheme())){
var rel_new = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(new$,(1));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(old,rel_new)) || (clojure.string.starts_with_QMARK_(old,[rel_new,"?"].join(''))))){
return rel_new;
} else {
return null;
}
} else {
var node_uri = goog.Uri.parse(old);
var node_uri_resolved = shadow.cljs.devtools.client.browser.page_load_uri.resolve(node_uri);
var node_abs = node_uri_resolved.getPath();
var and__5000__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.browser.page_load_uri.hasSameDomainAs(node_uri))) || (cljs.core.not(node_uri.hasDomain())));
if(and__5000__auto__){
var and__5000__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(node_abs,new$);
if(and__5000__auto____$1){
return new$;
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__47908){
var map__47909 = p__47908;
var map__47909__$1 = cljs.core.__destructure_map(map__47909);
var msg = map__47909__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47909__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47909__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var seq__47910 = cljs.core.seq(updates);
var chunk__47912 = null;
var count__47913 = (0);
var i__47914 = (0);
while(true){
if((i__47914 < count__47913)){
var path = chunk__47912.cljs$core$IIndexed$_nth$arity$2(null, i__47914);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__48085_48508 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__48089_48509 = null;
var count__48090_48510 = (0);
var i__48091_48511 = (0);
while(true){
if((i__48091_48511 < count__48090_48510)){
var node_48512 = chunk__48089_48509.cljs$core$IIndexed$_nth$arity$2(null, i__48091_48511);
if(cljs.core.not(node_48512.shadow$old)){
var path_match_48514 = shadow.cljs.devtools.client.browser.match_paths(node_48512.getAttribute("href"),path);
if(cljs.core.truth_(path_match_48514)){
var new_link_48515 = (function (){var G__48135 = node_48512.cloneNode(true);
G__48135.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_48514),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__48135;
})();
(node_48512.shadow$old = true);

(new_link_48515.onload = ((function (seq__48085_48508,chunk__48089_48509,count__48090_48510,i__48091_48511,seq__47910,chunk__47912,count__47913,i__47914,new_link_48515,path_match_48514,node_48512,path,map__47909,map__47909__$1,msg,updates,reload_info){
return (function (e){
var seq__48137_48516 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__48139_48517 = null;
var count__48140_48518 = (0);
var i__48141_48519 = (0);
while(true){
if((i__48141_48519 < count__48140_48518)){
var map__48148_48520 = chunk__48139_48517.cljs$core$IIndexed$_nth$arity$2(null, i__48141_48519);
var map__48148_48521__$1 = cljs.core.__destructure_map(map__48148_48520);
var task_48522 = map__48148_48521__$1;
var fn_str_48523 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48148_48521__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_48524 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48148_48521__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_48525 = goog.getObjectByName(fn_str_48523,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_48524)].join(''));

(fn_obj_48525.cljs$core$IFn$_invoke$arity$2 ? fn_obj_48525.cljs$core$IFn$_invoke$arity$2(path,new_link_48515) : fn_obj_48525.call(null, path,new_link_48515));


var G__48526 = seq__48137_48516;
var G__48527 = chunk__48139_48517;
var G__48528 = count__48140_48518;
var G__48529 = (i__48141_48519 + (1));
seq__48137_48516 = G__48526;
chunk__48139_48517 = G__48527;
count__48140_48518 = G__48528;
i__48141_48519 = G__48529;
continue;
} else {
var temp__5825__auto___48530 = cljs.core.seq(seq__48137_48516);
if(temp__5825__auto___48530){
var seq__48137_48532__$1 = temp__5825__auto___48530;
if(cljs.core.chunked_seq_QMARK_(seq__48137_48532__$1)){
var c__5525__auto___48533 = cljs.core.chunk_first(seq__48137_48532__$1);
var G__48534 = cljs.core.chunk_rest(seq__48137_48532__$1);
var G__48535 = c__5525__auto___48533;
var G__48536 = cljs.core.count(c__5525__auto___48533);
var G__48537 = (0);
seq__48137_48516 = G__48534;
chunk__48139_48517 = G__48535;
count__48140_48518 = G__48536;
i__48141_48519 = G__48537;
continue;
} else {
var map__48152_48538 = cljs.core.first(seq__48137_48532__$1);
var map__48152_48539__$1 = cljs.core.__destructure_map(map__48152_48538);
var task_48540 = map__48152_48539__$1;
var fn_str_48541 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48152_48539__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_48542 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48152_48539__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_48543 = goog.getObjectByName(fn_str_48541,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_48542)].join(''));

(fn_obj_48543.cljs$core$IFn$_invoke$arity$2 ? fn_obj_48543.cljs$core$IFn$_invoke$arity$2(path,new_link_48515) : fn_obj_48543.call(null, path,new_link_48515));


var G__48544 = cljs.core.next(seq__48137_48532__$1);
var G__48545 = null;
var G__48546 = (0);
var G__48547 = (0);
seq__48137_48516 = G__48544;
chunk__48139_48517 = G__48545;
count__48140_48518 = G__48546;
i__48141_48519 = G__48547;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_48512);
});})(seq__48085_48508,chunk__48089_48509,count__48090_48510,i__48091_48511,seq__47910,chunk__47912,count__47913,i__47914,new_link_48515,path_match_48514,node_48512,path,map__47909,map__47909__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_48514], 0));

goog.dom.insertSiblingAfter(new_link_48515,node_48512);


var G__48548 = seq__48085_48508;
var G__48549 = chunk__48089_48509;
var G__48550 = count__48090_48510;
var G__48551 = (i__48091_48511 + (1));
seq__48085_48508 = G__48548;
chunk__48089_48509 = G__48549;
count__48090_48510 = G__48550;
i__48091_48511 = G__48551;
continue;
} else {
var G__48552 = seq__48085_48508;
var G__48553 = chunk__48089_48509;
var G__48554 = count__48090_48510;
var G__48555 = (i__48091_48511 + (1));
seq__48085_48508 = G__48552;
chunk__48089_48509 = G__48553;
count__48090_48510 = G__48554;
i__48091_48511 = G__48555;
continue;
}
} else {
var G__48556 = seq__48085_48508;
var G__48557 = chunk__48089_48509;
var G__48558 = count__48090_48510;
var G__48559 = (i__48091_48511 + (1));
seq__48085_48508 = G__48556;
chunk__48089_48509 = G__48557;
count__48090_48510 = G__48558;
i__48091_48511 = G__48559;
continue;
}
} else {
var temp__5825__auto___48560 = cljs.core.seq(seq__48085_48508);
if(temp__5825__auto___48560){
var seq__48085_48561__$1 = temp__5825__auto___48560;
if(cljs.core.chunked_seq_QMARK_(seq__48085_48561__$1)){
var c__5525__auto___48562 = cljs.core.chunk_first(seq__48085_48561__$1);
var G__48563 = cljs.core.chunk_rest(seq__48085_48561__$1);
var G__48564 = c__5525__auto___48562;
var G__48565 = cljs.core.count(c__5525__auto___48562);
var G__48566 = (0);
seq__48085_48508 = G__48563;
chunk__48089_48509 = G__48564;
count__48090_48510 = G__48565;
i__48091_48511 = G__48566;
continue;
} else {
var node_48567 = cljs.core.first(seq__48085_48561__$1);
if(cljs.core.not(node_48567.shadow$old)){
var path_match_48568 = shadow.cljs.devtools.client.browser.match_paths(node_48567.getAttribute("href"),path);
if(cljs.core.truth_(path_match_48568)){
var new_link_48569 = (function (){var G__48156 = node_48567.cloneNode(true);
G__48156.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_48568),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__48156;
})();
(node_48567.shadow$old = true);

(new_link_48569.onload = ((function (seq__48085_48508,chunk__48089_48509,count__48090_48510,i__48091_48511,seq__47910,chunk__47912,count__47913,i__47914,new_link_48569,path_match_48568,node_48567,seq__48085_48561__$1,temp__5825__auto___48560,path,map__47909,map__47909__$1,msg,updates,reload_info){
return (function (e){
var seq__48157_48570 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__48159_48571 = null;
var count__48160_48572 = (0);
var i__48161_48573 = (0);
while(true){
if((i__48161_48573 < count__48160_48572)){
var map__48165_48574 = chunk__48159_48571.cljs$core$IIndexed$_nth$arity$2(null, i__48161_48573);
var map__48165_48575__$1 = cljs.core.__destructure_map(map__48165_48574);
var task_48576 = map__48165_48575__$1;
var fn_str_48577 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48165_48575__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_48578 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48165_48575__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_48579 = goog.getObjectByName(fn_str_48577,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_48578)].join(''));

(fn_obj_48579.cljs$core$IFn$_invoke$arity$2 ? fn_obj_48579.cljs$core$IFn$_invoke$arity$2(path,new_link_48569) : fn_obj_48579.call(null, path,new_link_48569));


var G__48580 = seq__48157_48570;
var G__48581 = chunk__48159_48571;
var G__48582 = count__48160_48572;
var G__48583 = (i__48161_48573 + (1));
seq__48157_48570 = G__48580;
chunk__48159_48571 = G__48581;
count__48160_48572 = G__48582;
i__48161_48573 = G__48583;
continue;
} else {
var temp__5825__auto___48585__$1 = cljs.core.seq(seq__48157_48570);
if(temp__5825__auto___48585__$1){
var seq__48157_48588__$1 = temp__5825__auto___48585__$1;
if(cljs.core.chunked_seq_QMARK_(seq__48157_48588__$1)){
var c__5525__auto___48589 = cljs.core.chunk_first(seq__48157_48588__$1);
var G__48590 = cljs.core.chunk_rest(seq__48157_48588__$1);
var G__48591 = c__5525__auto___48589;
var G__48592 = cljs.core.count(c__5525__auto___48589);
var G__48593 = (0);
seq__48157_48570 = G__48590;
chunk__48159_48571 = G__48591;
count__48160_48572 = G__48592;
i__48161_48573 = G__48593;
continue;
} else {
var map__48167_48594 = cljs.core.first(seq__48157_48588__$1);
var map__48167_48595__$1 = cljs.core.__destructure_map(map__48167_48594);
var task_48596 = map__48167_48595__$1;
var fn_str_48597 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48167_48595__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_48598 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48167_48595__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_48599 = goog.getObjectByName(fn_str_48597,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_48598)].join(''));

(fn_obj_48599.cljs$core$IFn$_invoke$arity$2 ? fn_obj_48599.cljs$core$IFn$_invoke$arity$2(path,new_link_48569) : fn_obj_48599.call(null, path,new_link_48569));


var G__48600 = cljs.core.next(seq__48157_48588__$1);
var G__48601 = null;
var G__48602 = (0);
var G__48603 = (0);
seq__48157_48570 = G__48600;
chunk__48159_48571 = G__48601;
count__48160_48572 = G__48602;
i__48161_48573 = G__48603;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_48567);
});})(seq__48085_48508,chunk__48089_48509,count__48090_48510,i__48091_48511,seq__47910,chunk__47912,count__47913,i__47914,new_link_48569,path_match_48568,node_48567,seq__48085_48561__$1,temp__5825__auto___48560,path,map__47909,map__47909__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_48568], 0));

goog.dom.insertSiblingAfter(new_link_48569,node_48567);


var G__48607 = cljs.core.next(seq__48085_48561__$1);
var G__48608 = null;
var G__48609 = (0);
var G__48610 = (0);
seq__48085_48508 = G__48607;
chunk__48089_48509 = G__48608;
count__48090_48510 = G__48609;
i__48091_48511 = G__48610;
continue;
} else {
var G__48612 = cljs.core.next(seq__48085_48561__$1);
var G__48613 = null;
var G__48614 = (0);
var G__48615 = (0);
seq__48085_48508 = G__48612;
chunk__48089_48509 = G__48613;
count__48090_48510 = G__48614;
i__48091_48511 = G__48615;
continue;
}
} else {
var G__48616 = cljs.core.next(seq__48085_48561__$1);
var G__48617 = null;
var G__48618 = (0);
var G__48619 = (0);
seq__48085_48508 = G__48616;
chunk__48089_48509 = G__48617;
count__48090_48510 = G__48618;
i__48091_48511 = G__48619;
continue;
}
}
} else {
}
}
break;
}


var G__48620 = seq__47910;
var G__48621 = chunk__47912;
var G__48622 = count__47913;
var G__48623 = (i__47914 + (1));
seq__47910 = G__48620;
chunk__47912 = G__48621;
count__47913 = G__48622;
i__47914 = G__48623;
continue;
} else {
var G__48624 = seq__47910;
var G__48625 = chunk__47912;
var G__48626 = count__47913;
var G__48627 = (i__47914 + (1));
seq__47910 = G__48624;
chunk__47912 = G__48625;
count__47913 = G__48626;
i__47914 = G__48627;
continue;
}
} else {
var temp__5825__auto__ = cljs.core.seq(seq__47910);
if(temp__5825__auto__){
var seq__47910__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__47910__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__47910__$1);
var G__48628 = cljs.core.chunk_rest(seq__47910__$1);
var G__48629 = c__5525__auto__;
var G__48630 = cljs.core.count(c__5525__auto__);
var G__48631 = (0);
seq__47910 = G__48628;
chunk__47912 = G__48629;
count__47913 = G__48630;
i__47914 = G__48631;
continue;
} else {
var path = cljs.core.first(seq__47910__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__48173_48632 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__48177_48633 = null;
var count__48178_48634 = (0);
var i__48179_48635 = (0);
while(true){
if((i__48179_48635 < count__48178_48634)){
var node_48636 = chunk__48177_48633.cljs$core$IIndexed$_nth$arity$2(null, i__48179_48635);
if(cljs.core.not(node_48636.shadow$old)){
var path_match_48637 = shadow.cljs.devtools.client.browser.match_paths(node_48636.getAttribute("href"),path);
if(cljs.core.truth_(path_match_48637)){
var new_link_48638 = (function (){var G__48236 = node_48636.cloneNode(true);
G__48236.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_48637),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__48236;
})();
(node_48636.shadow$old = true);

(new_link_48638.onload = ((function (seq__48173_48632,chunk__48177_48633,count__48178_48634,i__48179_48635,seq__47910,chunk__47912,count__47913,i__47914,new_link_48638,path_match_48637,node_48636,path,seq__47910__$1,temp__5825__auto__,map__47909,map__47909__$1,msg,updates,reload_info){
return (function (e){
var seq__48237_48640 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__48239_48641 = null;
var count__48240_48642 = (0);
var i__48241_48643 = (0);
while(true){
if((i__48241_48643 < count__48240_48642)){
var map__48246_48644 = chunk__48239_48641.cljs$core$IIndexed$_nth$arity$2(null, i__48241_48643);
var map__48246_48645__$1 = cljs.core.__destructure_map(map__48246_48644);
var task_48646 = map__48246_48645__$1;
var fn_str_48647 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48246_48645__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_48648 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48246_48645__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_48649 = goog.getObjectByName(fn_str_48647,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_48648)].join(''));

(fn_obj_48649.cljs$core$IFn$_invoke$arity$2 ? fn_obj_48649.cljs$core$IFn$_invoke$arity$2(path,new_link_48638) : fn_obj_48649.call(null, path,new_link_48638));


var G__48651 = seq__48237_48640;
var G__48652 = chunk__48239_48641;
var G__48653 = count__48240_48642;
var G__48654 = (i__48241_48643 + (1));
seq__48237_48640 = G__48651;
chunk__48239_48641 = G__48652;
count__48240_48642 = G__48653;
i__48241_48643 = G__48654;
continue;
} else {
var temp__5825__auto___48655__$1 = cljs.core.seq(seq__48237_48640);
if(temp__5825__auto___48655__$1){
var seq__48237_48656__$1 = temp__5825__auto___48655__$1;
if(cljs.core.chunked_seq_QMARK_(seq__48237_48656__$1)){
var c__5525__auto___48657 = cljs.core.chunk_first(seq__48237_48656__$1);
var G__48658 = cljs.core.chunk_rest(seq__48237_48656__$1);
var G__48659 = c__5525__auto___48657;
var G__48660 = cljs.core.count(c__5525__auto___48657);
var G__48661 = (0);
seq__48237_48640 = G__48658;
chunk__48239_48641 = G__48659;
count__48240_48642 = G__48660;
i__48241_48643 = G__48661;
continue;
} else {
var map__48252_48662 = cljs.core.first(seq__48237_48656__$1);
var map__48252_48663__$1 = cljs.core.__destructure_map(map__48252_48662);
var task_48664 = map__48252_48663__$1;
var fn_str_48665 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48252_48663__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_48666 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48252_48663__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_48667 = goog.getObjectByName(fn_str_48665,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_48666)].join(''));

(fn_obj_48667.cljs$core$IFn$_invoke$arity$2 ? fn_obj_48667.cljs$core$IFn$_invoke$arity$2(path,new_link_48638) : fn_obj_48667.call(null, path,new_link_48638));


var G__48668 = cljs.core.next(seq__48237_48656__$1);
var G__48669 = null;
var G__48670 = (0);
var G__48671 = (0);
seq__48237_48640 = G__48668;
chunk__48239_48641 = G__48669;
count__48240_48642 = G__48670;
i__48241_48643 = G__48671;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_48636);
});})(seq__48173_48632,chunk__48177_48633,count__48178_48634,i__48179_48635,seq__47910,chunk__47912,count__47913,i__47914,new_link_48638,path_match_48637,node_48636,path,seq__47910__$1,temp__5825__auto__,map__47909,map__47909__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_48637], 0));

goog.dom.insertSiblingAfter(new_link_48638,node_48636);


var G__48672 = seq__48173_48632;
var G__48673 = chunk__48177_48633;
var G__48674 = count__48178_48634;
var G__48675 = (i__48179_48635 + (1));
seq__48173_48632 = G__48672;
chunk__48177_48633 = G__48673;
count__48178_48634 = G__48674;
i__48179_48635 = G__48675;
continue;
} else {
var G__48676 = seq__48173_48632;
var G__48677 = chunk__48177_48633;
var G__48678 = count__48178_48634;
var G__48679 = (i__48179_48635 + (1));
seq__48173_48632 = G__48676;
chunk__48177_48633 = G__48677;
count__48178_48634 = G__48678;
i__48179_48635 = G__48679;
continue;
}
} else {
var G__48680 = seq__48173_48632;
var G__48681 = chunk__48177_48633;
var G__48682 = count__48178_48634;
var G__48683 = (i__48179_48635 + (1));
seq__48173_48632 = G__48680;
chunk__48177_48633 = G__48681;
count__48178_48634 = G__48682;
i__48179_48635 = G__48683;
continue;
}
} else {
var temp__5825__auto___48684__$1 = cljs.core.seq(seq__48173_48632);
if(temp__5825__auto___48684__$1){
var seq__48173_48685__$1 = temp__5825__auto___48684__$1;
if(cljs.core.chunked_seq_QMARK_(seq__48173_48685__$1)){
var c__5525__auto___48686 = cljs.core.chunk_first(seq__48173_48685__$1);
var G__48687 = cljs.core.chunk_rest(seq__48173_48685__$1);
var G__48688 = c__5525__auto___48686;
var G__48689 = cljs.core.count(c__5525__auto___48686);
var G__48690 = (0);
seq__48173_48632 = G__48687;
chunk__48177_48633 = G__48688;
count__48178_48634 = G__48689;
i__48179_48635 = G__48690;
continue;
} else {
var node_48691 = cljs.core.first(seq__48173_48685__$1);
if(cljs.core.not(node_48691.shadow$old)){
var path_match_48692 = shadow.cljs.devtools.client.browser.match_paths(node_48691.getAttribute("href"),path);
if(cljs.core.truth_(path_match_48692)){
var new_link_48693 = (function (){var G__48257 = node_48691.cloneNode(true);
G__48257.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_48692),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__48257;
})();
(node_48691.shadow$old = true);

(new_link_48693.onload = ((function (seq__48173_48632,chunk__48177_48633,count__48178_48634,i__48179_48635,seq__47910,chunk__47912,count__47913,i__47914,new_link_48693,path_match_48692,node_48691,seq__48173_48685__$1,temp__5825__auto___48684__$1,path,seq__47910__$1,temp__5825__auto__,map__47909,map__47909__$1,msg,updates,reload_info){
return (function (e){
var seq__48258_48694 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__48260_48695 = null;
var count__48261_48696 = (0);
var i__48262_48697 = (0);
while(true){
if((i__48262_48697 < count__48261_48696)){
var map__48269_48698 = chunk__48260_48695.cljs$core$IIndexed$_nth$arity$2(null, i__48262_48697);
var map__48269_48699__$1 = cljs.core.__destructure_map(map__48269_48698);
var task_48700 = map__48269_48699__$1;
var fn_str_48701 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48269_48699__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_48702 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48269_48699__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_48703 = goog.getObjectByName(fn_str_48701,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_48702)].join(''));

(fn_obj_48703.cljs$core$IFn$_invoke$arity$2 ? fn_obj_48703.cljs$core$IFn$_invoke$arity$2(path,new_link_48693) : fn_obj_48703.call(null, path,new_link_48693));


var G__48704 = seq__48258_48694;
var G__48705 = chunk__48260_48695;
var G__48706 = count__48261_48696;
var G__48707 = (i__48262_48697 + (1));
seq__48258_48694 = G__48704;
chunk__48260_48695 = G__48705;
count__48261_48696 = G__48706;
i__48262_48697 = G__48707;
continue;
} else {
var temp__5825__auto___48708__$2 = cljs.core.seq(seq__48258_48694);
if(temp__5825__auto___48708__$2){
var seq__48258_48709__$1 = temp__5825__auto___48708__$2;
if(cljs.core.chunked_seq_QMARK_(seq__48258_48709__$1)){
var c__5525__auto___48710 = cljs.core.chunk_first(seq__48258_48709__$1);
var G__48711 = cljs.core.chunk_rest(seq__48258_48709__$1);
var G__48712 = c__5525__auto___48710;
var G__48713 = cljs.core.count(c__5525__auto___48710);
var G__48714 = (0);
seq__48258_48694 = G__48711;
chunk__48260_48695 = G__48712;
count__48261_48696 = G__48713;
i__48262_48697 = G__48714;
continue;
} else {
var map__48272_48715 = cljs.core.first(seq__48258_48709__$1);
var map__48272_48716__$1 = cljs.core.__destructure_map(map__48272_48715);
var task_48717 = map__48272_48716__$1;
var fn_str_48718 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48272_48716__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_48719 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48272_48716__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_48720 = goog.getObjectByName(fn_str_48718,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_48719)].join(''));

(fn_obj_48720.cljs$core$IFn$_invoke$arity$2 ? fn_obj_48720.cljs$core$IFn$_invoke$arity$2(path,new_link_48693) : fn_obj_48720.call(null, path,new_link_48693));


var G__48721 = cljs.core.next(seq__48258_48709__$1);
var G__48722 = null;
var G__48723 = (0);
var G__48724 = (0);
seq__48258_48694 = G__48721;
chunk__48260_48695 = G__48722;
count__48261_48696 = G__48723;
i__48262_48697 = G__48724;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_48691);
});})(seq__48173_48632,chunk__48177_48633,count__48178_48634,i__48179_48635,seq__47910,chunk__47912,count__47913,i__47914,new_link_48693,path_match_48692,node_48691,seq__48173_48685__$1,temp__5825__auto___48684__$1,path,seq__47910__$1,temp__5825__auto__,map__47909,map__47909__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_48692], 0));

goog.dom.insertSiblingAfter(new_link_48693,node_48691);


var G__48725 = cljs.core.next(seq__48173_48685__$1);
var G__48726 = null;
var G__48727 = (0);
var G__48728 = (0);
seq__48173_48632 = G__48725;
chunk__48177_48633 = G__48726;
count__48178_48634 = G__48727;
i__48179_48635 = G__48728;
continue;
} else {
var G__48729 = cljs.core.next(seq__48173_48685__$1);
var G__48730 = null;
var G__48731 = (0);
var G__48732 = (0);
seq__48173_48632 = G__48729;
chunk__48177_48633 = G__48730;
count__48178_48634 = G__48731;
i__48179_48635 = G__48732;
continue;
}
} else {
var G__48733 = cljs.core.next(seq__48173_48685__$1);
var G__48734 = null;
var G__48735 = (0);
var G__48736 = (0);
seq__48173_48632 = G__48733;
chunk__48177_48633 = G__48734;
count__48178_48634 = G__48735;
i__48179_48635 = G__48736;
continue;
}
}
} else {
}
}
break;
}


var G__48737 = cljs.core.next(seq__47910__$1);
var G__48738 = null;
var G__48739 = (0);
var G__48740 = (0);
seq__47910 = G__48737;
chunk__47912 = G__48738;
count__47913 = G__48739;
i__47914 = G__48740;
continue;
} else {
var G__48741 = cljs.core.next(seq__47910__$1);
var G__48742 = null;
var G__48743 = (0);
var G__48744 = (0);
seq__47910 = G__48741;
chunk__47912 = G__48742;
count__47913 = G__48743;
i__47914 = G__48744;
continue;
}
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.global_eval = (function shadow$cljs$devtools$client$browser$global_eval(js){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("undefined",typeof(module))){
return eval(js);
} else {
return (0,eval)(js);;
}
});
shadow.cljs.devtools.client.browser.runtime_info = (((typeof SHADOW_CONFIG !== 'undefined'))?shadow.json.to_clj.cljs$core$IFn$_invoke$arity$1(SHADOW_CONFIG):null);
shadow.cljs.devtools.client.browser.client_info = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([shadow.cljs.devtools.client.browser.runtime_info,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"host","host",-1558485167),(cljs.core.truth_(goog.global.document)?new cljs.core.Keyword(null,"browser","browser",828191719):new cljs.core.Keyword(null,"browser-worker","browser-worker",1638998282)),new cljs.core.Keyword(null,"user-agent","user-agent",1220426212),[(cljs.core.truth_(goog.userAgent.OPERA)?"Opera":(cljs.core.truth_(goog.userAgent.product.CHROME)?"Chrome":(cljs.core.truth_(goog.userAgent.IE)?"MSIE":(cljs.core.truth_(goog.userAgent.EDGE)?"Edge":(cljs.core.truth_(goog.userAgent.GECKO)?"Firefox":(cljs.core.truth_(goog.userAgent.SAFARI)?"Safari":(cljs.core.truth_(goog.userAgent.WEBKIT)?"Webkit":null)))))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.VERSION)," [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.PLATFORM),"]"].join(''),new cljs.core.Keyword(null,"dom","dom",-1236537922),(!((goog.global.document == null)))], null)], 0));
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.browser !== 'undefined') && (typeof shadow.cljs.devtools.client.browser.ws_was_welcome_ref !== 'undefined')){
} else {
shadow.cljs.devtools.client.browser.ws_was_welcome_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
if(((shadow.cljs.devtools.client.env.enabled) && ((shadow.cljs.devtools.client.env.worker_client_id > (0))))){
(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$_js_eval$arity$2 = (function (this$,code){
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(code);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$3 = (function (this$,ns,p__48275){
var map__48276 = p__48275;
var map__48276__$1 = cljs.core.__destructure_map(map__48276);
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48276__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(js);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__48281,done,error){
var map__48282 = p__48281;
var map__48282__$1 = cljs.core.__destructure_map(map__48282);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48282__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null, ));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__48284,done,error){
var map__48285 = p__48284;
var map__48285__$1 = cljs.core.__destructure_map(map__48285);
var msg = map__48285__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48285__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48285__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48285__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__48290){
var map__48293 = p__48290;
var map__48293__$1 = cljs.core.__destructure_map(map__48293);
var src = map__48293__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48293__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__5000__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__5000__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__48307 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__48307) : done.call(null, G__48307));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__48312){
var map__48314 = p__48312;
var map__48314__$1 = cljs.core.__destructure_map(map__48314);
var msg__$1 = map__48314__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48314__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null, sources_to_load));
}catch (e48321){var ex = e48321;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null, ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__48330){
var map__48331 = p__48330;
var map__48331__$1 = cljs.core.__destructure_map(map__48331);
var env = map__48331__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48331__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var svc = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125),(function (){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,true);

shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.env.patch_goog_BANG_();

return shadow.cljs.devtools.client.browser.devtools_msg(["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(new cljs.core.Keyword(null,"state-ref","state-ref",2127874952).cljs$core$IFn$_invoke$arity$1(runtime))))," ready!"].join(''));
}),new cljs.core.Keyword(null,"on-disconnect","on-disconnect",-809021814),(function (e){
if(cljs.core.truth_(cljs.core.deref(shadow.cljs.devtools.client.browser.ws_was_welcome_ref))){
shadow.cljs.devtools.client.hud.connection_error("The Websocket connection was closed!");

return cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-reconnect","on-reconnect",1239988702),(function (e){
return shadow.cljs.devtools.client.hud.connection_error("Reconnecting ...");
}),new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"access-denied","access-denied",959449406),(function (msg){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);

return shadow.cljs.devtools.client.hud.connection_error(["Stale Output! Your loaded JS was not produced by the running shadow-cljs instance."," Is the watch for this build running?"].join(''));
}),new cljs.core.Keyword(null,"cljs-asset-update","cljs-asset-update",1224093028),(function (msg){
return shadow.cljs.devtools.client.browser.handle_asset_update(msg);
}),new cljs.core.Keyword(null,"cljs-build-configure","cljs-build-configure",-2089891268),(function (msg){
return null;
}),new cljs.core.Keyword(null,"cljs-build-start","cljs-build-start",-725781241),(function (msg){
shadow.cljs.devtools.client.hud.hud_hide();

shadow.cljs.devtools.client.hud.load_start();

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-start","build-start",-959649480)));
}),new cljs.core.Keyword(null,"cljs-build-complete","cljs-build-complete",273626153),(function (msg){
var msg__$1 = shadow.cljs.devtools.client.env.add_warnings_to_info(msg);
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.hud.hud_warnings(msg__$1);

shadow.cljs.devtools.client.browser.handle_build_complete(runtime,msg__$1);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-complete","build-complete",-501868472)));
}),new cljs.core.Keyword(null,"cljs-build-failure","cljs-build-failure",1718154990),(function (msg){
shadow.cljs.devtools.client.hud.load_end();

shadow.cljs.devtools.client.hud.hud_error(msg);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-failure","build-failure",-2107487466)));
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__48341){
var map__48342 = p__48341;
var map__48342__$1 = cljs.core.__destructure_map(map__48342);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48342__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48342__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-disconnect","client-disconnect",640227957),event_op)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,shadow.cljs.devtools.client.env.worker_client_id)))){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was stopped!");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-connect","client-connect",-1113973888),event_op)){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was restarted. Reload required!");
} else {
return null;
}
}
})], null)], null));

return svc;
}),(function (p__48351){
var map__48352 = p__48351;
var map__48352__$1 = cljs.core.__destructure_map(map__48352);
var svc = map__48352__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48352__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map
