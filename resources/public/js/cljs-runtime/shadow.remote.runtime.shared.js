goog.provide('shadow.remote.runtime.shared');
shadow.remote.runtime.shared.init_state = (function shadow$remote$runtime$shared$init_state(client_info){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),(0),new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.PersistentArrayMap.EMPTY], null);
});
shadow.remote.runtime.shared.now = (function shadow$remote$runtime$shared$now(){
return Date.now();
});
shadow.remote.runtime.shared.get_client_id = (function shadow$remote$runtime$shared$get_client_id(p__45324){
var map__45325 = p__45324;
var map__45325__$1 = cljs.core.__destructure_map(map__45325);
var runtime = map__45325__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45325__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var or__5002__auto__ = new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("runtime has no assigned runtime-id",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null));
}
});
shadow.remote.runtime.shared.relay_msg = (function shadow$remote$runtime$shared$relay_msg(runtime,msg){
var self_id_45446 = shadow.remote.runtime.shared.get_client_id(runtime);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"to","to",192099007).cljs$core$IFn$_invoke$arity$1(msg),self_id_45446)){
shadow.remote.runtime.api.relay_msg(runtime,msg);
} else {
Promise.resolve((1)).then((function (){
var G__45327 = runtime;
var G__45328 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"from","from",1815293044),self_id_45446);
return (shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2 ? shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2(G__45327,G__45328) : shadow.remote.runtime.shared.process.call(null, G__45327,G__45328));
}));
}

return msg;
});
shadow.remote.runtime.shared.reply = (function shadow$remote$runtime$shared$reply(runtime,p__45329,res){
var map__45330 = p__45329;
var map__45330__$1 = cljs.core.__destructure_map(map__45330);
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45330__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45330__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var res__$1 = (function (){var G__45331 = res;
var G__45331__$1 = (cljs.core.truth_(call_id)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45331,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id):G__45331);
if(cljs.core.truth_(from)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45331__$1,new cljs.core.Keyword(null,"to","to",192099007),from);
} else {
return G__45331__$1;
}
})();
return shadow.remote.runtime.api.relay_msg(runtime,res__$1);
});
shadow.remote.runtime.shared.call = (function shadow$remote$runtime$shared$call(var_args){
var G__45334 = arguments.length;
switch (G__45334) {
case 3:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3 = (function (runtime,msg,handlers){
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4(runtime,msg,handlers,(0));
}));

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4 = (function (p__45335,msg,handlers,timeout_after_ms){
var map__45336 = p__45335;
var map__45336__$1 = cljs.core.__destructure_map(map__45336);
var runtime = map__45336__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45336__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
if(cljs.core.map_QMARK_(msg)){
} else {
throw (new Error("Assert failed: (map? msg)"));
}

if(cljs.core.map_QMARK_(handlers)){
} else {
throw (new Error("Assert failed: (map? handlers)"));
}

if(cljs.core.nat_int_QMARK_(timeout_after_ms)){
} else {
throw (new Error("Assert failed: (nat-int? timeout-after-ms)"));
}

var call_id = new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"handlers","handlers",79528781),handlers,new cljs.core.Keyword(null,"called-at","called-at",607081160),shadow.remote.runtime.shared.now(),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg,new cljs.core.Keyword(null,"timeout","timeout",-318625318),timeout_after_ms], null));

return shadow.remote.runtime.api.relay_msg(runtime,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id));
}));

(shadow.remote.runtime.shared.call.cljs$lang$maxFixedArity = 4);

shadow.remote.runtime.shared.trigger_BANG_ = (function shadow$remote$runtime$shared$trigger_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___45461 = arguments.length;
var i__5727__auto___45462 = (0);
while(true){
if((i__5727__auto___45462 < len__5726__auto___45461)){
args__5732__auto__.push((arguments[i__5727__auto___45462]));

var G__45463 = (i__5727__auto___45462 + (1));
i__5727__auto___45462 = G__45463;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (p__45342,ev,args){
var map__45343 = p__45342;
var map__45343__$1 = cljs.core.__destructure_map(map__45343);
var runtime = map__45343__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45343__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var seq__45344 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__45347 = null;
var count__45348 = (0);
var i__45349 = (0);
while(true){
if((i__45349 < count__45348)){
var ext = chunk__45347.cljs$core$IIndexed$_nth$arity$2(null, i__45349);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__45467 = seq__45344;
var G__45468 = chunk__45347;
var G__45469 = count__45348;
var G__45470 = (i__45349 + (1));
seq__45344 = G__45467;
chunk__45347 = G__45468;
count__45348 = G__45469;
i__45349 = G__45470;
continue;
} else {
var G__45471 = seq__45344;
var G__45472 = chunk__45347;
var G__45473 = count__45348;
var G__45474 = (i__45349 + (1));
seq__45344 = G__45471;
chunk__45347 = G__45472;
count__45348 = G__45473;
i__45349 = G__45474;
continue;
}
} else {
var temp__5825__auto__ = cljs.core.seq(seq__45344);
if(temp__5825__auto__){
var seq__45344__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__45344__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__45344__$1);
var G__45475 = cljs.core.chunk_rest(seq__45344__$1);
var G__45476 = c__5525__auto__;
var G__45477 = cljs.core.count(c__5525__auto__);
var G__45478 = (0);
seq__45344 = G__45475;
chunk__45347 = G__45476;
count__45348 = G__45477;
i__45349 = G__45478;
continue;
} else {
var ext = cljs.core.first(seq__45344__$1);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__45480 = cljs.core.next(seq__45344__$1);
var G__45481 = null;
var G__45482 = (0);
var G__45483 = (0);
seq__45344 = G__45480;
chunk__45347 = G__45481;
count__45348 = G__45482;
i__45349 = G__45483;
continue;
} else {
var G__45484 = cljs.core.next(seq__45344__$1);
var G__45485 = null;
var G__45486 = (0);
var G__45487 = (0);
seq__45344 = G__45484;
chunk__45347 = G__45485;
count__45348 = G__45486;
i__45349 = G__45487;
continue;
}
}
} else {
return null;
}
}
break;
}
}));

(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$applyTo = (function (seq45339){
var G__45340 = cljs.core.first(seq45339);
var seq45339__$1 = cljs.core.next(seq45339);
var G__45341 = cljs.core.first(seq45339__$1);
var seq45339__$2 = cljs.core.next(seq45339__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__45340,G__45341,seq45339__$2);
}));

shadow.remote.runtime.shared.welcome = (function shadow$remote$runtime$shared$welcome(p__45364,p__45365){
var map__45366 = p__45364;
var map__45366__$1 = cljs.core.__destructure_map(map__45366);
var runtime = map__45366__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45366__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__45367 = p__45365;
var map__45367__$1 = cljs.core.__destructure_map(map__45367);
var msg = map__45367__$1;
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45367__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.assoc,new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"welcome","welcome",-578152123),true], 0));

var map__45368 = cljs.core.deref(state_ref);
var map__45368__$1 = cljs.core.__destructure_map(map__45368);
var client_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45368__$1,new cljs.core.Keyword(null,"client-info","client-info",1958982504));
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45368__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
shadow.remote.runtime.shared.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"hello","hello",-245025397),new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info], null));

return shadow.remote.runtime.shared.trigger_BANG_(runtime,new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125));
});
shadow.remote.runtime.shared.ping = (function shadow$remote$runtime$shared$ping(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"pong","pong",-172484958)], null));
});
shadow.remote.runtime.shared.request_supported_ops = (function shadow$remote$runtime$shared$request_supported_ops(p__45369,msg){
var map__45370 = p__45369;
var map__45370__$1 = cljs.core.__destructure_map(map__45370);
var runtime = map__45370__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45370__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"supported-ops","supported-ops",337914702),new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.disj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.set(cljs.core.keys(new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))),new cljs.core.Keyword(null,"welcome","welcome",-578152123),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),new cljs.core.Keyword(null,"tool-disconnect","tool-disconnect",189103996)], 0))], null));
});
shadow.remote.runtime.shared.unknown_relay_op = (function shadow$remote$runtime$shared$unknown_relay_op(msg){
return console.warn("unknown-relay-op",msg);
});
shadow.remote.runtime.shared.unknown_op = (function shadow$remote$runtime$shared$unknown_op(msg){
return console.warn("unknown-op",msg);
});
shadow.remote.runtime.shared.add_extension_STAR_ = (function shadow$remote$runtime$shared$add_extension_STAR_(p__45375,key,p__45376){
var map__45377 = p__45375;
var map__45377__$1 = cljs.core.__destructure_map(map__45377);
var state = map__45377__$1;
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45377__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
var map__45378 = p__45376;
var map__45378__$1 = cljs.core.__destructure_map(map__45378);
var spec = map__45378__$1;
var ops = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45378__$1,new cljs.core.Keyword(null,"ops","ops",1237330063));
var transit_write_handlers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45378__$1,new cljs.core.Keyword(null,"transit-write-handlers","transit-write-handlers",1886308716));
if(cljs.core.contains_QMARK_(extensions,key)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("extension already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"spec","spec",347520401),spec], null));
} else {
}

return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("op already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"op","op",-1882987955),op_kw], null));
} else {
}

return cljs.core.assoc_in(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null),op_handler);
}),cljs.core.assoc_in(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null),spec),ops);
});
shadow.remote.runtime.shared.add_extension = (function shadow$remote$runtime$shared$add_extension(p__45382,key,spec){
var map__45383 = p__45382;
var map__45383__$1 = cljs.core.__destructure_map(map__45383);
var runtime = map__45383__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45383__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,shadow.remote.runtime.shared.add_extension_STAR_,key,spec);

var temp__5829__auto___45502 = new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125).cljs$core$IFn$_invoke$arity$1(spec);
if((temp__5829__auto___45502 == null)){
} else {
var on_welcome_45503 = temp__5829__auto___45502;
if(cljs.core.truth_(new cljs.core.Keyword(null,"welcome","welcome",-578152123).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))){
(on_welcome_45503.cljs$core$IFn$_invoke$arity$0 ? on_welcome_45503.cljs$core$IFn$_invoke$arity$0() : on_welcome_45503.call(null, ));
} else {
}
}

return runtime;
});
shadow.remote.runtime.shared.add_defaults = (function shadow$remote$runtime$shared$add_defaults(runtime){
return shadow.remote.runtime.shared.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.shared","defaults","shadow.remote.runtime.shared/defaults",-1821257543),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"welcome","welcome",-578152123),(function (p1__45384_SHARP_){
return shadow.remote.runtime.shared.welcome(runtime,p1__45384_SHARP_);
}),new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),(function (p1__45385_SHARP_){
return shadow.remote.runtime.shared.unknown_relay_op(p1__45385_SHARP_);
}),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),(function (p1__45386_SHARP_){
return shadow.remote.runtime.shared.unknown_op(p1__45386_SHARP_);
}),new cljs.core.Keyword(null,"ping","ping",-1670114784),(function (p1__45387_SHARP_){
return shadow.remote.runtime.shared.ping(runtime,p1__45387_SHARP_);
}),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),(function (p1__45388_SHARP_){
return shadow.remote.runtime.shared.request_supported_ops(runtime,p1__45388_SHARP_);
})], null)], null));
});
shadow.remote.runtime.shared.del_extension_STAR_ = (function shadow$remote$runtime$shared$del_extension_STAR_(state,key){
var ext = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null));
if(cljs.core.not(ext)){
return state;
} else {
return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063)], null),cljs.core.dissoc,op_kw);
}),cljs.core.update.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.dissoc,key),new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(ext));
}
});
shadow.remote.runtime.shared.del_extension = (function shadow$remote$runtime$shared$del_extension(p__45392,key){
var map__45393 = p__45392;
var map__45393__$1 = cljs.core.__destructure_map(map__45393);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45393__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state_ref,shadow.remote.runtime.shared.del_extension_STAR_,key);
});
shadow.remote.runtime.shared.unhandled_call_result = (function shadow$remote$runtime$shared$unhandled_call_result(call_config,msg){
return console.warn("unhandled call result",msg,call_config);
});
shadow.remote.runtime.shared.unhandled_client_not_found = (function shadow$remote$runtime$shared$unhandled_client_not_found(p__45398,msg){
var map__45399 = p__45398;
var map__45399__$1 = cljs.core.__destructure_map(map__45399);
var runtime = map__45399__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45399__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic(runtime,new cljs.core.Keyword(null,"on-client-not-found","on-client-not-found",-642452849),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([msg], 0));
});
shadow.remote.runtime.shared.reply_unknown_op = (function shadow$remote$runtime$shared$reply_unknown_op(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg], null));
});
shadow.remote.runtime.shared.process = (function shadow$remote$runtime$shared$process(p__45407,p__45408){
var map__45409 = p__45407;
var map__45409__$1 = cljs.core.__destructure_map(map__45409);
var runtime = map__45409__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45409__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__45410 = p__45408;
var map__45410__$1 = cljs.core.__destructure_map(map__45410);
var msg = map__45410__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45410__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45410__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var state = cljs.core.deref(state_ref);
var op_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op], null));
if(cljs.core.truth_(call_id)){
var cfg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null));
var call_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cfg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"handlers","handlers",79528781),op], null));
if(cljs.core.truth_(call_handler)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([call_id], 0));

return (call_handler.cljs$core$IFn$_invoke$arity$1 ? call_handler.cljs$core$IFn$_invoke$arity$1(msg) : call_handler.call(null, msg));
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null, msg));
} else {
return shadow.remote.runtime.shared.unhandled_call_result(cfg,msg);

}
}
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null, msg));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-not-found","client-not-found",-1754042614),op)){
return shadow.remote.runtime.shared.unhandled_client_not_found(runtime,msg);
} else {
return shadow.remote.runtime.shared.reply_unknown_op(runtime,msg);

}
}
}
});
shadow.remote.runtime.shared.run_on_idle = (function shadow$remote$runtime$shared$run_on_idle(state_ref){
var seq__45424 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__45426 = null;
var count__45427 = (0);
var i__45428 = (0);
while(true){
if((i__45428 < count__45427)){
var map__45436 = chunk__45426.cljs$core$IIndexed$_nth$arity$2(null, i__45428);
var map__45436__$1 = cljs.core.__destructure_map(map__45436);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45436__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null, ));


var G__45513 = seq__45424;
var G__45514 = chunk__45426;
var G__45515 = count__45427;
var G__45516 = (i__45428 + (1));
seq__45424 = G__45513;
chunk__45426 = G__45514;
count__45427 = G__45515;
i__45428 = G__45516;
continue;
} else {
var G__45517 = seq__45424;
var G__45518 = chunk__45426;
var G__45519 = count__45427;
var G__45520 = (i__45428 + (1));
seq__45424 = G__45517;
chunk__45426 = G__45518;
count__45427 = G__45519;
i__45428 = G__45520;
continue;
}
} else {
var temp__5825__auto__ = cljs.core.seq(seq__45424);
if(temp__5825__auto__){
var seq__45424__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__45424__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__45424__$1);
var G__45522 = cljs.core.chunk_rest(seq__45424__$1);
var G__45523 = c__5525__auto__;
var G__45524 = cljs.core.count(c__5525__auto__);
var G__45525 = (0);
seq__45424 = G__45522;
chunk__45426 = G__45523;
count__45427 = G__45524;
i__45428 = G__45525;
continue;
} else {
var map__45441 = cljs.core.first(seq__45424__$1);
var map__45441__$1 = cljs.core.__destructure_map(map__45441);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45441__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null, ));


var G__45529 = cljs.core.next(seq__45424__$1);
var G__45530 = null;
var G__45531 = (0);
var G__45532 = (0);
seq__45424 = G__45529;
chunk__45426 = G__45530;
count__45427 = G__45531;
i__45428 = G__45532;
continue;
} else {
var G__45533 = cljs.core.next(seq__45424__$1);
var G__45534 = null;
var G__45535 = (0);
var G__45536 = (0);
seq__45424 = G__45533;
chunk__45426 = G__45534;
count__45427 = G__45535;
i__45428 = G__45536;
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

//# sourceMappingURL=shadow.remote.runtime.shared.js.map
