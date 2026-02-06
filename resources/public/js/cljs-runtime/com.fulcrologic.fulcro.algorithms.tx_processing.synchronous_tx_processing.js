goog.provide('com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing');
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.fulcro !== 'undefined') && (typeof com.fulcrologic.fulcro.algorithms !== 'undefined') && (typeof com.fulcrologic.fulcro.algorithms.tx_processing !== 'undefined') && (typeof com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing !== 'undefined') && (typeof com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.apps_in_tx !== 'undefined')){
} else {
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.apps_in_tx = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}

/**
 * Get the current thread id on the JVM. Returns 0 on JS.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.current_thread_id = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$current_thread_id(){
return (0);
});
/**
 * Returns true if the current thread is running non-nested transaction processing code.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.top_level_QMARK_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$top_level_QMARK_(p__53039){
var map__53040 = p__53039;
var map__53040__$1 = cljs.core.__destructure_map(map__53040);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53040__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","id","com.fulcrologic.fulcro.application/id",-2008968625));
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),cljs.core.count(cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.apps_in_tx),id,cljs.core.PersistentVector.EMPTY)));
});
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_submission_queue_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$swap_submission_queue_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___53316 = arguments.length;
var i__5727__auto___53317 = (0);
while(true){
if((i__5727__auto___53317 < len__5726__auto___53316)){
args__5732__auto__.push((arguments[i__5727__auto___53317]));

var G__53318 = (i__5727__auto___53317 + (1));
i__5727__auto___53317 = G__53318;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_submission_queue_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_submission_queue_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (app,args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.swap_BANG_,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","config","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/config",-1878584178),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","submission-queue","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/submission-queue",-1259886916)], null)),args);
}));

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_submission_queue_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_submission_queue_BANG_.cljs$lang$applyTo = (function (seq53042){
var G__53043 = cljs.core.first(seq53042);
var seq53042__$1 = cljs.core.next(seq53042);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__53043,seq53042__$1);
}));

com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.reset_submission_queue_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$reset_submission_queue_BANG_(app,v){
return cljs.core.reset_BANG_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","config","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/config",-1878584178),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","submission-queue","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/submission-queue",-1259886916)], null)),v);
});
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.submission_queue = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$submission_queue(app){
return cljs.core.deref(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","config","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/config",-1878584178),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","submission-queue","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/submission-queue",-1259886916)], null)));
});
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_post_processing_steps_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$swap_post_processing_steps_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___53328 = arguments.length;
var i__5727__auto___53329 = (0);
while(true){
if((i__5727__auto___53329 < len__5726__auto___53328)){
args__5732__auto__.push((arguments[i__5727__auto___53329]));

var G__53330 = (i__5727__auto___53329 + (1));
i__5727__auto___53329 = G__53330;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_post_processing_steps_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_post_processing_steps_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (app,args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.swap_BANG_,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","config","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/config",-1878584178),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","post-processing-steps","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/post-processing-steps",1202501796)], null)),args);
}));

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_post_processing_steps_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_post_processing_steps_BANG_.cljs$lang$applyTo = (function (seq53053){
var G__53054 = cljs.core.first(seq53053);
var seq53053__$1 = cljs.core.next(seq53053);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__53054,seq53053__$1);
}));

com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.reset_post_processing_steps_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$reset_post_processing_steps_BANG_(app,v){
return cljs.core.reset_BANG_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","config","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/config",-1878584178),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","post-processing-steps","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/post-processing-steps",1202501796)], null)),v);
});
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.post_processing_steps = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$post_processing_steps(app){
return cljs.core.deref(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","config","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/config",-1878584178),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","post-processing-steps","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/post-processing-steps",1202501796)], null)));
});
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_active_queue_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$swap_active_queue_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___53332 = arguments.length;
var i__5727__auto___53333 = (0);
while(true){
if((i__5727__auto___53333 < len__5726__auto___53332)){
args__5732__auto__.push((arguments[i__5727__auto___53333]));

var G__53334 = (i__5727__auto___53333 + (1));
i__5727__auto___53333 = G__53334;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_active_queue_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_active_queue_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (app,args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.swap_BANG_,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","config","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/config",-1878584178),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","active-queue","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/active-queue",-1020610588)], null)),args);
}));

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_active_queue_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_active_queue_BANG_.cljs$lang$applyTo = (function (seq53063){
var G__53064 = cljs.core.first(seq53063);
var seq53063__$1 = cljs.core.next(seq53063);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__53064,seq53063__$1);
}));

com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.reset_active_queue_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$reset_active_queue_BANG_(app,v){
return cljs.core.reset_BANG_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","config","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/config",-1878584178),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","active-queue","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/active-queue",-1020610588)], null)),v);
});
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.active_queue = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$active_queue(app){
return cljs.core.deref(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","config","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/config",-1878584178),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","active-queue","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/active-queue",-1020610588)], null)));
});
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_send_queue_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$swap_send_queue_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___53335 = arguments.length;
var i__5727__auto___53336 = (0);
while(true){
if((i__5727__auto___53336 < len__5726__auto___53335)){
args__5732__auto__.push((arguments[i__5727__auto___53336]));

var G__53337 = (i__5727__auto___53336 + (1));
i__5727__auto___53336 = G__53337;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_send_queue_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_send_queue_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (app,remote,args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.swap_BANG_,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","config","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/config",-1878584178),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","send-queues","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/send-queues",-727474733),remote], null)),args);
}));

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_send_queue_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_send_queue_BANG_.cljs$lang$applyTo = (function (seq53066){
var G__53067 = cljs.core.first(seq53066);
var seq53066__$1 = cljs.core.next(seq53066);
var G__53068 = cljs.core.first(seq53066__$1);
var seq53066__$2 = cljs.core.next(seq53066__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__53067,G__53068,seq53066__$2);
}));

com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.reset_send_queue_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$reset_send_queue_BANG_(app,remote,v){
return cljs.core.reset_BANG_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","config","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/config",-1878584178),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","send-queues","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/send-queues",-727474733),remote], null)),v);
});
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.send_queue = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$send_queue(app,remote){
return cljs.core.deref(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","config","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/config",-1878584178),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","send-queues","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/send-queues",-727474733),remote], null)));
});
/**
 * Add `f` as a function that will run after the current transaction has been fully processed.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.run_after_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$run_after_BANG_(app,f){
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_post_processing_steps_BANG_.cljs$core$IFn$_invoke$arity$variadic(app,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),f], 0));
});
/**
 * Is there post processing to do?
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.post_processing_QMARK_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$post_processing_QMARK_(app){
return cljs.core.boolean$(cljs.core.seq(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.post_processing_steps(app)));
});
/**
 * Runs the queued post processing steps until the post-processing queue is empty.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.do_post_processing_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$do_post_processing_BANG_(app){
var steps = com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.post_processing_steps(app);
while(true){
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.reset_post_processing_steps_BANG_(app,cljs.core.PersistentVector.EMPTY);

var seq__53074_53341 = cljs.core.seq(steps);
var chunk__53075_53342 = null;
var count__53076_53343 = (0);
var i__53077_53344 = (0);
while(true){
if((i__53077_53344 < count__53076_53343)){
var f_53345 = chunk__53075_53342.cljs$core$IIndexed$_nth$arity$2(null, i__53077_53344);
try{(f_53345.cljs$core$IFn$_invoke$arity$0 ? f_53345.cljs$core$IFn$_invoke$arity$0() : f_53345.call(null, ));
}catch (e53081){var e_53347 = e53081;
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/algorithms/tx_processing/synchronous_tx_processing.cljc",144,11,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (seq__53074_53341,chunk__53075_53342,count__53076_53343,i__53077_53344,steps,e_53347,f_53345){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e_53347,"Post processing step failed. See https://book.fulcrologic.com/#err-stp-postproc-failed"], null);
});})(seq__53074_53341,chunk__53075_53342,count__53076_53343,i__53077_53344,steps,e_53347,f_53345))
,null)),null,(276),null,null,null);
}

var G__53349 = seq__53074_53341;
var G__53350 = chunk__53075_53342;
var G__53351 = count__53076_53343;
var G__53352 = (i__53077_53344 + (1));
seq__53074_53341 = G__53349;
chunk__53075_53342 = G__53350;
count__53076_53343 = G__53351;
i__53077_53344 = G__53352;
continue;
} else {
var temp__5825__auto___53353 = cljs.core.seq(seq__53074_53341);
if(temp__5825__auto___53353){
var seq__53074_53354__$1 = temp__5825__auto___53353;
if(cljs.core.chunked_seq_QMARK_(seq__53074_53354__$1)){
var c__5525__auto___53355 = cljs.core.chunk_first(seq__53074_53354__$1);
var G__53356 = cljs.core.chunk_rest(seq__53074_53354__$1);
var G__53357 = c__5525__auto___53355;
var G__53358 = cljs.core.count(c__5525__auto___53355);
var G__53359 = (0);
seq__53074_53341 = G__53356;
chunk__53075_53342 = G__53357;
count__53076_53343 = G__53358;
i__53077_53344 = G__53359;
continue;
} else {
var f_53360 = cljs.core.first(seq__53074_53354__$1);
try{(f_53360.cljs$core$IFn$_invoke$arity$0 ? f_53360.cljs$core$IFn$_invoke$arity$0() : f_53360.call(null, ));
}catch (e53082){var e_53361 = e53082;
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/algorithms/tx_processing/synchronous_tx_processing.cljc",144,11,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (seq__53074_53341,chunk__53075_53342,count__53076_53343,i__53077_53344,steps,e_53361,f_53360,seq__53074_53354__$1,temp__5825__auto___53353){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e_53361,"Post processing step failed. See https://book.fulcrologic.com/#err-stp-postproc-failed"], null);
});})(seq__53074_53341,chunk__53075_53342,count__53076_53343,i__53077_53344,steps,e_53361,f_53360,seq__53074_53354__$1,temp__5825__auto___53353))
,null)),null,(277),null,null,null);
}

var G__53362 = cljs.core.next(seq__53074_53354__$1);
var G__53363 = null;
var G__53364 = (0);
var G__53365 = (0);
seq__53074_53341 = G__53362;
chunk__53075_53342 = G__53363;
count__53076_53343 = G__53364;
i__53077_53344 = G__53365;
continue;
}
} else {
}
}
break;
}

var temp__5825__auto__ = cljs.core.seq(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.post_processing_steps(app));
if(temp__5825__auto__){
var next_steps = temp__5825__auto__;
var G__53366 = next_steps;
steps = G__53366;
continue;
} else {
return null;
}
break;
}
});
/**
 * Returns true if the current thread is in the midst of running the optimistic actions of a new transaction.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.in_transaction_QMARK_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$in_transaction_QMARK_(p__53083){
var map__53084 = p__53083;
var map__53084__$1 = cljs.core.__destructure_map(map__53084);
var app = map__53084__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53084__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","id","com.fulcrologic.fulcro.application/id",-2008968625));
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((0),cljs.core.count(cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.apps_in_tx),id,cljs.core.PersistentVector.EMPTY)));
});
/**
 * Is the current thread running the TX queue?
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.current_thread_running_tx_QMARK_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$current_thread_running_tx_QMARK_(p__53085){
var map__53086 = p__53085;
var map__53086__$1 = cljs.core.__destructure_map(map__53086);
var app = map__53086__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53086__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","id","com.fulcrologic.fulcro.application/id",-2008968625));
return cljs.core.contains_QMARK_(cljs.core.set(cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.apps_in_tx),id,cljs.core.PersistentVector.EMPTY)),com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.current_thread_id());
});
/**
 * Should be called after the application renders to ensure that transactions blocked until the next render become
 * unblocked. Schedules an activation.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.release_post_render_tasks_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$release_post_render_tasks_BANG_(app){
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_submission_queue_BANG_.cljs$core$IFn$_invoke$arity$variadic(app,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (queue){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (node){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(node,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","options","com.fulcrologic.fulcro.algorithms.tx-processing/options",2016767420),cljs.core.dissoc,new cljs.core.Keyword(null,"after-render?","after-render?",595994030));
}),queue);
})], 0));
});
/**
 * Figure out the dispatch routine to trigger for the given network result.  If it exists, send the result
 *   to it.
 * 
 *   Returns the tx-element with the remote marked complete.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.dispatch_result_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$dispatch_result_BANG_(app,tx_node,p__53087,remote){
var map__53088 = p__53087;
var map__53088__$1 = cljs.core.__destructure_map(map__53088);
var tx_element = map__53088__$1;
var results = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53088__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","results","com.fulcrologic.fulcro.algorithms.tx-processing/results",-1876101852));
var dispatch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53088__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","dispatch","com.fulcrologic.fulcro.algorithms.tx-processing/dispatch",-262239660));
var desired_ast_nodes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53088__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","desired-ast-nodes","com.fulcrologic.fulcro.algorithms.tx-processing/desired-ast-nodes",-1718643425));
var transmitted_ast_nodes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53088__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","transmitted-ast-nodes","com.fulcrologic.fulcro.algorithms.tx-processing/transmitted-ast-nodes",1065250687));
var original_ast_node = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53088__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","original-ast-node","com.fulcrologic.fulcro.algorithms.tx-processing/original-ast-node",2080944477));
var result_53373 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(results,remote);
var handler_53374 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(dispatch,new cljs.core.Keyword(null,"result-action","result-action",-1254630246));
if(cljs.core.truth_(handler_53374)){
var env_53375 = com.fulcrologic.fulcro.algorithms.tx_processing.build_env.cljs$core$IFn$_invoke$arity$3(app,tx_node,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),dispatch,new cljs.core.Keyword(null,"transacted-ast","transacted-ast",-442737948),original_ast_node,new cljs.core.Keyword(null,"mutation-ast","mutation-ast",1077959891),cljs.core.get.cljs$core$IFn$_invoke$arity$2(desired_ast_nodes,remote),new cljs.core.Keyword(null,"transmitted-ast","transmitted-ast",1828931690),cljs.core.get.cljs$core$IFn$_invoke$arity$2(transmitted_ast_nodes,remote),new cljs.core.Keyword(null,"result","result",1415092211),result_53373], null));
try{(handler_53374.cljs$core$IFn$_invoke$arity$1 ? handler_53374.cljs$core$IFn$_invoke$arity$1(env_53375) : handler_53374.call(null, env_53375));
}catch (e53089){var e_53377 = e53089;
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/algorithms/tx_processing/synchronous_tx_processing.cljc",182,13,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [e_53377,"The result-action mutation handler for mutation",new cljs.core.Keyword(null,"dispatch-key","dispatch-key",733619510).cljs$core$IFn$_invoke$arity$1(original_ast_node),"threw an exception. See https://book.fulcrologic.com/#err-stp-res-action-exc"], null);
}),null)),null,(278),null,null,null);
}} else {
}

return cljs.core.update.cljs$core$IFn$_invoke$arity$4(tx_element,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","complete?","com.fulcrologic.fulcro.algorithms.tx-processing/complete?",-311612706),cljs.core.conj,remote);
});
/**
 * Distribute results and mark the remotes for those elements as complete.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.distribute_element_results_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$distribute_element_results_BANG_(app,tx_node,p__53090){
var map__53091 = p__53090;
var map__53091__$1 = cljs.core.__destructure_map(map__53091);
var tx_element = map__53091__$1;
var results = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53091__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","results","com.fulcrologic.fulcro.algorithms.tx-processing/results",-1876101852));
var complete_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53091__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","complete?","com.fulcrologic.fulcro.algorithms.tx-processing/complete?",-311612706));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (new_element,remote){
if(cljs.core.truth_((complete_QMARK_.cljs$core$IFn$_invoke$arity$1 ? complete_QMARK_.cljs$core$IFn$_invoke$arity$1(remote) : complete_QMARK_.call(null, remote)))){
return new_element;
} else {
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.dispatch_result_BANG_(app,tx_node,new_element,remote);
}
}),tx_element,cljs.core.keys(results));
});
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.node_index = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$node_index(queue,txn_id){
var n = cljs.core.count(queue);
var idx = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (idx,p__53092){
var map__53093 = p__53092;
var map__53093__$1 = cljs.core.__destructure_map(map__53093);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53093__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","id","com.fulcrologic.fulcro.algorithms.tx-processing/id",1199810423));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(id,txn_id)){
return cljs.core.reduced(idx);
} else {
return (idx + (1));
}
}),(0),queue);
if((idx < n)){
return idx;
} else {
return null;
}
});
/**
 * Side-effects against the app state to distribute the result for txn-id element at ele-idx. This will call the result
 * handler and mark that remote as complete.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.distribute_results_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$distribute_results_BANG_(app,txn_id,ele_idx){
var active_queue = com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.active_queue(app);
var idx = com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.node_index(active_queue,txn_id);
var tx_node = cljs.core.get.cljs$core$IFn$_invoke$arity$2(active_queue,idx);
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_active_queue_BANG_.cljs$core$IFn$_invoke$arity$variadic(app,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","elements","com.fulcrologic.fulcro.algorithms.tx-processing/elements",-925101330),ele_idx], null),(function (p1__53094_SHARP_){
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.distribute_element_results_BANG_(app,tx_node,p1__53094_SHARP_);
})], 0));
});
/**
 * Deal with a network result on the given txn/element.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.record_result_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$record_result_BANG_(var_args){
var G__53096 = arguments.length;
switch (G__53096) {
case 6:
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.record_result_BANG_.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
case 5:
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.record_result_BANG_.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.record_result_BANG_.cljs$core$IFn$_invoke$arity$6 = (function (app,txn_id,ele_idx,remote,result,result_key){
var active_queue = com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.active_queue(app);
var txn_idx = com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.node_index(active_queue,txn_id);
var not_found_QMARK_ = (((txn_idx >= cljs.core.count(active_queue))) || (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(txn_id,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","id","com.fulcrologic.fulcro.algorithms.tx-processing/id",1199810423).cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(active_queue,txn_idx)))));
if(not_found_QMARK_){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/algorithms/tx_processing/synchronous_tx_processing.cljc",225,8,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Network result for",remote,"does not have a valid node on the active queue! See https://book.fulcrologic.com/#err-stp-res-lacks-valid-node"], null);
}),null)),null,(279),null,null,null);
} else {
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_active_queue_BANG_.cljs$core$IFn$_invoke$arity$variadic(app,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.assoc_in,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [txn_idx,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","elements","com.fulcrologic.fulcro.algorithms.tx-processing/elements",-925101330),ele_idx,result_key,remote], null),result], 0));

return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.distribute_results_BANG_(app,txn_id,ele_idx);
}
}));

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.record_result_BANG_.cljs$core$IFn$_invoke$arity$5 = (function (app,txn_id,ele_idx,remote,result){
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.record_result_BANG_.cljs$core$IFn$_invoke$arity$6(app,txn_id,ele_idx,remote,result,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","results","com.fulcrologic.fulcro.algorithms.tx-processing/results",-1876101852));
}));

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.record_result_BANG_.cljs$lang$maxFixedArity = 6);

/**
 * Removes the send node (if present) from the send queue on the given remote.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.remove_send_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$remove_send_BANG_(app,remote,txn_id,ele_idx){
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_send_queue_BANG_.cljs$core$IFn$_invoke$arity$variadic(app,remote,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (old_queue){
return cljs.core.filterv((function (p__53097){
var map__53098 = p__53097;
var map__53098__$1 = cljs.core.__destructure_map(map__53098);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53098__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","id","com.fulcrologic.fulcro.algorithms.tx-processing/id",1199810423));
var idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53098__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","idx","com.fulcrologic.fulcro.algorithms.tx-processing/idx",-1121773698));
return (!(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(txn_id,id)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ele_idx,idx)))));
}),old_queue);
})], 0));
});
/**
 * Generate a new send node and add it to the appropriate send queue.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.add_send_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$add_send_BANG_(app,p__53099,ele_idx,remote){
var map__53100 = p__53099;
var map__53100__$1 = cljs.core.__destructure_map(map__53100);
var tx_node = map__53100__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53100__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","id","com.fulcrologic.fulcro.algorithms.tx-processing/id",1199810423));
var options = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53100__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","options","com.fulcrologic.fulcro.algorithms.tx-processing/options",2016767420));
var update_handler = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$add_send_BANG__$_progress_handler_STAR_(result){
var id__52817__auto__ = new cljs.core.Keyword("com.fulcrologic.fulcro.application","id","com.fulcrologic.fulcro.application/id",-2008968625).cljs$core$IFn$_invoke$arity$1(app);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.apps_in_tx,cljs.core.update,id__52817__auto__,cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.current_thread_id()], 0));

try{com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.record_result_BANG_.cljs$core$IFn$_invoke$arity$6(app,id,ele_idx,remote,result,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","progress","com.fulcrologic.fulcro.algorithms.tx-processing/progress",1012736442));

var G__53101 = app;
var G__53102 = cljs.core.PersistentArrayMap.EMPTY;
return (com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.run_queue_BANG_.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.run_queue_BANG_.cljs$core$IFn$_invoke$arity$2(G__53101,G__53102) : com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.run_queue_BANG_.call(null, G__53101,G__53102));
}finally {cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.apps_in_tx,cljs.core.update,id__52817__auto__,cljs.core.pop);
}});
var ast = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tx_node,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","elements","com.fulcrologic.fulcro.algorithms.tx-processing/elements",-925101330),ele_idx,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","transmitted-ast-nodes","com.fulcrologic.fulcro.algorithms.tx-processing/transmitted-ast-nodes",1065250687),remote], null));
var handler = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$add_send_BANG__$_result_handler_STAR_(result){
if(cljs.core.truth_(new cljs.core.Keyword(null,"parallel?","parallel?",-25273892).cljs$core$IFn$_invoke$arity$1(options))){
if(cljs.core.truth_((function (){var and__5000__auto__ = (function (){var or__5002__auto__ = goog.DEBUG;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return com.fulcrologic.fulcro.inspect.inspect_client.INSPECT;
}
})();
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("disabled",com.fulcrologic.fulcro.inspect.inspect_client.INSPECT);
} else {
return and__5000__auto__;
}
})())){
try{var map__53104_53398 = result;
var map__53104_53399__$1 = cljs.core.__destructure_map(map__53104_53398);
var status_code_53400 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53104_53399__$1,new cljs.core.Keyword(null,"status-code","status-code",-1060410130));
var body_53401 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53104_53399__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),status_code_53400)){
com.fulcrologic.fulcro.inspect.inspect_client.send_finished_BANG_(app,remote,id,body_53401);
} else {
com.fulcrologic.fulcro.inspect.inspect_client.send_failed_BANG_(app,id,cljs.core.str.cljs$core$IFn$_invoke$arity$1(status_code_53400));
}
}catch (e53103){var e_53404 = e53103;
}} else {
}
} else {
}

var id__52817__auto__ = new cljs.core.Keyword("com.fulcrologic.fulcro.application","id","com.fulcrologic.fulcro.application/id",-2008968625).cljs$core$IFn$_invoke$arity$1(app);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.apps_in_tx,cljs.core.update,id__52817__auto__,cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.current_thread_id()], 0));

try{com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.record_result_BANG_.cljs$core$IFn$_invoke$arity$5(app,id,ele_idx,remote,result);

com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.remove_send_BANG_(app,remote,id,ele_idx);

var G__53105 = app;
var G__53106 = cljs.core.PersistentArrayMap.EMPTY;
return (com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.run_queue_BANG_.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.run_queue_BANG_.cljs$core$IFn$_invoke$arity$2(G__53105,G__53106) : com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.run_queue_BANG_.call(null, G__53105,G__53106));
}finally {cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.apps_in_tx,cljs.core.update,id__52817__auto__,cljs.core.pop);
}});
var send_node = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","id","com.fulcrologic.fulcro.algorithms.tx-processing/id",1199810423),id,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","idx","com.fulcrologic.fulcro.algorithms.tx-processing/idx",-1121773698),ele_idx,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","ast","com.fulcrologic.fulcro.algorithms.tx-processing/ast",1718830373),ast,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","options","com.fulcrologic.fulcro.algorithms.tx-processing/options",2016767420),options,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","active?","com.fulcrologic.fulcro.algorithms.tx-processing/active?",966679517),false,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","result-handler","com.fulcrologic.fulcro.algorithms.tx-processing/result-handler",-114902209),handler,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","update-handler","com.fulcrologic.fulcro.algorithms.tx-processing/update-handler",-1256285755),update_handler], null);
if(cljs.core.truth_(ast)){
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_send_queue_BANG_.cljs$core$IFn$_invoke$arity$variadic(app,remote,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),send_node], 0));
} else {
com.fulcrologic.fulcro.algorithms.scheduling.defer((function (){
return handler(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status-code","status-code",-1060410130),(200),new cljs.core.Keyword(null,"body","body",-2049205669),cljs.core.PersistentArrayMap.EMPTY], null));
}),(1));
}

return null;
});
/**
 * Queue all (unqueued) remote actions for the given element.  Returns the (possibly updated) node.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.queue_element_sends_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$queue_element_sends_BANG_(app,tx_node,p__53107){
var map__53108 = p__53107;
var map__53108__$1 = cljs.core.__destructure_map(map__53108);
var idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53108__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","idx","com.fulcrologic.fulcro.algorithms.tx-processing/idx",-1121773698));
var dispatch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53108__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","dispatch","com.fulcrologic.fulcro.algorithms.tx-processing/dispatch",-262239660));
var started_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53108__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","started?","com.fulcrologic.fulcro.algorithms.tx-processing/started?",1421241366));
var remotes = clojure.set.intersection.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.keys(dispatch)),com.fulcrologic.fulcro.algorithms.tx_processing.app__GT_remote_names(app));
var to_dispatch = clojure.set.difference.cljs$core$IFn$_invoke$arity$2(remotes,started_QMARK_);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (node,remote){
if(cljs.core.contains_QMARK_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(node,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","elements","com.fulcrologic.fulcro.algorithms.tx-processing/elements",-925101330),idx,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","started?","com.fulcrologic.fulcro.algorithms.tx-processing/started?",1421241366)], null),cljs.core.PersistentHashSet.EMPTY),remote)){
return node;
} else {
var updated_node = cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(node,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","elements","com.fulcrologic.fulcro.algorithms.tx-processing/elements",-925101330),idx], null),(function (tx_element){
return com.fulcrologic.fulcro.algorithms.tx_processing.compute_desired_ast_node(app,remote,node,tx_element);
})),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","elements","com.fulcrologic.fulcro.algorithms.tx-processing/elements",-925101330),idx,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","started?","com.fulcrologic.fulcro.algorithms.tx-processing/started?",1421241366)], null),cljs.core.conj,remote);
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.add_send_BANG_(app,updated_node,idx,remote);

return updated_node;
}
}),tx_node,to_dispatch);
});
/**
 * Finds any item(s) on the given node that are ready to be placed on the network queues and adds them. Non-optimistic
 *   multi-element nodes will only queue one remote operation at a time.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.queue_sends_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$queue_sends_BANG_(app,p__53109){
var map__53110 = p__53109;
var map__53110__$1 = cljs.core.__destructure_map(map__53110);
var tx_node = map__53110__$1;
var options = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53110__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","options","com.fulcrologic.fulcro.algorithms.tx-processing/options",2016767420));
var elements = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53110__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","elements","com.fulcrologic.fulcro.algorithms.tx-processing/elements",-925101330));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (node,element){
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.queue_element_sends_BANG_(app,node,element);
}),tx_node,elements);
});
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.process_tx_node_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$process_tx_node_BANG_(app,p__53111){
var map__53112 = p__53111;
var map__53112__$1 = cljs.core.__destructure_map(map__53112);
var tx_node = map__53112__$1;
var options = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53112__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","options","com.fulcrologic.fulcro.algorithms.tx-processing/options",2016767420));
if(com.fulcrologic.fulcro.algorithms.tx_processing.fully_complete_QMARK_(app,tx_node)){
return null;
} else {
return com.fulcrologic.fulcro.algorithms.tx_processing.update_progress_BANG_(app,com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.queue_sends_BANG_(app,com.fulcrologic.fulcro.algorithms.tx_processing.run_actions_BANG_(app,tx_node)));
}
});
/**
 * Process the send queues against the remotes, which will cause idle remotes with queued work to issue network requests.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.process_send_queues_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$process_send_queues_BANG_(app){
var _STAR_remove_send_STAR__orig_val__53113 = com.fulcrologic.fulcro.algorithms.tx_processing.batched_processing._STAR_remove_send_STAR_;
var _STAR_remove_send_STAR__temp_val__53114 = com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.remove_send_BANG_;
(com.fulcrologic.fulcro.algorithms.tx_processing.batched_processing._STAR_remove_send_STAR_ = _STAR_remove_send_STAR__temp_val__53114);

try{var remote_names = com.fulcrologic.fulcro.algorithms.tx_processing.app__GT_remote_names(app);
var operations = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var seq__53115_53422 = cljs.core.seq(remote_names);
var chunk__53116_53424 = null;
var count__53117_53425 = (0);
var i__53118_53426 = (0);
while(true){
if((i__53118_53426 < count__53117_53425)){
var remote_53427 = chunk__53116_53424.cljs$core$IIndexed$_nth$arity$2(null, i__53118_53426);
var send_queue_53428 = com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.send_queue(app,remote_53427);
var vec__53145_53429 = com.fulcrologic.fulcro.algorithms.tx_processing.batched_processing.extract_parallel(send_queue_53428);
var p_53430 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53145_53429,(0),null);
var serial_53431 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53145_53429,(1),null);
var front_53432 = cljs.core.first(serial_53431);
var seq__53148_53435 = cljs.core.seq(p_53430);
var chunk__53149_53436 = null;
var count__53150_53437 = (0);
var i__53151_53438 = (0);
while(true){
if((i__53151_53438 < count__53150_53437)){
var item_53439 = chunk__53149_53436.cljs$core$IIndexed$_nth$arity$2(null, i__53151_53438);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(operations,cljs.core.conj,((function (seq__53148_53435,chunk__53149_53436,count__53150_53437,i__53151_53438,seq__53115_53422,chunk__53116_53424,count__53117_53425,i__53118_53426,item_53439,send_queue_53428,vec__53145_53429,p_53430,serial_53431,front_53432,remote_53427,remote_names,operations,_STAR_remove_send_STAR__orig_val__53113,_STAR_remove_send_STAR__temp_val__53114){
return (function (){
return com.fulcrologic.fulcro.algorithms.tx_processing.batched_processing.net_send_BANG_(app,item_53439,remote_53427);
});})(seq__53148_53435,chunk__53149_53436,count__53150_53437,i__53151_53438,seq__53115_53422,chunk__53116_53424,count__53117_53425,i__53118_53426,item_53439,send_queue_53428,vec__53145_53429,p_53430,serial_53431,front_53432,remote_53427,remote_names,operations,_STAR_remove_send_STAR__orig_val__53113,_STAR_remove_send_STAR__temp_val__53114))
);


var G__53440 = seq__53148_53435;
var G__53441 = chunk__53149_53436;
var G__53442 = count__53150_53437;
var G__53443 = (i__53151_53438 + (1));
seq__53148_53435 = G__53440;
chunk__53149_53436 = G__53441;
count__53150_53437 = G__53442;
i__53151_53438 = G__53443;
continue;
} else {
var temp__5825__auto___53446 = cljs.core.seq(seq__53148_53435);
if(temp__5825__auto___53446){
var seq__53148_53447__$1 = temp__5825__auto___53446;
if(cljs.core.chunked_seq_QMARK_(seq__53148_53447__$1)){
var c__5525__auto___53448 = cljs.core.chunk_first(seq__53148_53447__$1);
var G__53449 = cljs.core.chunk_rest(seq__53148_53447__$1);
var G__53450 = c__5525__auto___53448;
var G__53451 = cljs.core.count(c__5525__auto___53448);
var G__53452 = (0);
seq__53148_53435 = G__53449;
chunk__53149_53436 = G__53450;
count__53150_53437 = G__53451;
i__53151_53438 = G__53452;
continue;
} else {
var item_53453 = cljs.core.first(seq__53148_53447__$1);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(operations,cljs.core.conj,((function (seq__53148_53435,chunk__53149_53436,count__53150_53437,i__53151_53438,seq__53115_53422,chunk__53116_53424,count__53117_53425,i__53118_53426,item_53453,seq__53148_53447__$1,temp__5825__auto___53446,send_queue_53428,vec__53145_53429,p_53430,serial_53431,front_53432,remote_53427,remote_names,operations,_STAR_remove_send_STAR__orig_val__53113,_STAR_remove_send_STAR__temp_val__53114){
return (function (){
return com.fulcrologic.fulcro.algorithms.tx_processing.batched_processing.net_send_BANG_(app,item_53453,remote_53427);
});})(seq__53148_53435,chunk__53149_53436,count__53150_53437,i__53151_53438,seq__53115_53422,chunk__53116_53424,count__53117_53425,i__53118_53426,item_53453,seq__53148_53447__$1,temp__5825__auto___53446,send_queue_53428,vec__53145_53429,p_53430,serial_53431,front_53432,remote_53427,remote_names,operations,_STAR_remove_send_STAR__orig_val__53113,_STAR_remove_send_STAR__temp_val__53114))
);


var G__53457 = cljs.core.next(seq__53148_53447__$1);
var G__53458 = null;
var G__53459 = (0);
var G__53460 = (0);
seq__53148_53435 = G__53457;
chunk__53149_53436 = G__53458;
count__53150_53437 = G__53459;
i__53151_53438 = G__53460;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","active?","com.fulcrologic.fulcro.algorithms.tx-processing/active?",966679517).cljs$core$IFn$_invoke$arity$1(front_53432))){
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.reset_send_queue_BANG_(app,remote_53427,serial_53431);
} else {
var map__53160_53462 = com.fulcrologic.fulcro.algorithms.tx_processing.batched_processing.combine_sends(app,remote_53427,serial_53431);
var map__53160_53463__$1 = cljs.core.__destructure_map(map__53160_53462);
var send_queue_53464__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53160_53463__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","send-queue","com.fulcrologic.fulcro.algorithms.tx-processing/send-queue",-1602123421));
var send_node_53465 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53160_53463__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","send-node","com.fulcrologic.fulcro.algorithms.tx-processing/send-node",1624648157));
if(cljs.core.truth_(send_node_53465)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(operations,cljs.core.conj,((function (seq__53115_53422,chunk__53116_53424,count__53117_53425,i__53118_53426,map__53160_53462,map__53160_53463__$1,send_queue_53464__$1,send_node_53465,send_queue_53428,vec__53145_53429,p_53430,serial_53431,front_53432,remote_53427,remote_names,operations,_STAR_remove_send_STAR__orig_val__53113,_STAR_remove_send_STAR__temp_val__53114){
return (function (){
return com.fulcrologic.fulcro.algorithms.tx_processing.batched_processing.net_send_BANG_(app,send_node_53465,remote_53427);
});})(seq__53115_53422,chunk__53116_53424,count__53117_53425,i__53118_53426,map__53160_53462,map__53160_53463__$1,send_queue_53464__$1,send_node_53465,send_queue_53428,vec__53145_53429,p_53430,serial_53431,front_53432,remote_53427,remote_names,operations,_STAR_remove_send_STAR__orig_val__53113,_STAR_remove_send_STAR__temp_val__53114))
);
} else {
}

com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.reset_send_queue_BANG_(app,remote_53427,send_queue_53464__$1);
}


var G__53468 = seq__53115_53422;
var G__53469 = chunk__53116_53424;
var G__53470 = count__53117_53425;
var G__53471 = (i__53118_53426 + (1));
seq__53115_53422 = G__53468;
chunk__53116_53424 = G__53469;
count__53117_53425 = G__53470;
i__53118_53426 = G__53471;
continue;
} else {
var temp__5825__auto___53472 = cljs.core.seq(seq__53115_53422);
if(temp__5825__auto___53472){
var seq__53115_53473__$1 = temp__5825__auto___53472;
if(cljs.core.chunked_seq_QMARK_(seq__53115_53473__$1)){
var c__5525__auto___53474 = cljs.core.chunk_first(seq__53115_53473__$1);
var G__53475 = cljs.core.chunk_rest(seq__53115_53473__$1);
var G__53476 = c__5525__auto___53474;
var G__53477 = cljs.core.count(c__5525__auto___53474);
var G__53478 = (0);
seq__53115_53422 = G__53475;
chunk__53116_53424 = G__53476;
count__53117_53425 = G__53477;
i__53118_53426 = G__53478;
continue;
} else {
var remote_53479 = cljs.core.first(seq__53115_53473__$1);
var send_queue_53482 = com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.send_queue(app,remote_53479);
var vec__53162_53483 = com.fulcrologic.fulcro.algorithms.tx_processing.batched_processing.extract_parallel(send_queue_53482);
var p_53484 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53162_53483,(0),null);
var serial_53485 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53162_53483,(1),null);
var front_53486 = cljs.core.first(serial_53485);
var seq__53165_53487 = cljs.core.seq(p_53484);
var chunk__53166_53488 = null;
var count__53167_53489 = (0);
var i__53168_53490 = (0);
while(true){
if((i__53168_53490 < count__53167_53489)){
var item_53493 = chunk__53166_53488.cljs$core$IIndexed$_nth$arity$2(null, i__53168_53490);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(operations,cljs.core.conj,((function (seq__53165_53487,chunk__53166_53488,count__53167_53489,i__53168_53490,seq__53115_53422,chunk__53116_53424,count__53117_53425,i__53118_53426,item_53493,send_queue_53482,vec__53162_53483,p_53484,serial_53485,front_53486,remote_53479,seq__53115_53473__$1,temp__5825__auto___53472,remote_names,operations,_STAR_remove_send_STAR__orig_val__53113,_STAR_remove_send_STAR__temp_val__53114){
return (function (){
return com.fulcrologic.fulcro.algorithms.tx_processing.batched_processing.net_send_BANG_(app,item_53493,remote_53479);
});})(seq__53165_53487,chunk__53166_53488,count__53167_53489,i__53168_53490,seq__53115_53422,chunk__53116_53424,count__53117_53425,i__53118_53426,item_53493,send_queue_53482,vec__53162_53483,p_53484,serial_53485,front_53486,remote_53479,seq__53115_53473__$1,temp__5825__auto___53472,remote_names,operations,_STAR_remove_send_STAR__orig_val__53113,_STAR_remove_send_STAR__temp_val__53114))
);


var G__53494 = seq__53165_53487;
var G__53495 = chunk__53166_53488;
var G__53496 = count__53167_53489;
var G__53497 = (i__53168_53490 + (1));
seq__53165_53487 = G__53494;
chunk__53166_53488 = G__53495;
count__53167_53489 = G__53496;
i__53168_53490 = G__53497;
continue;
} else {
var temp__5825__auto___53498__$1 = cljs.core.seq(seq__53165_53487);
if(temp__5825__auto___53498__$1){
var seq__53165_53499__$1 = temp__5825__auto___53498__$1;
if(cljs.core.chunked_seq_QMARK_(seq__53165_53499__$1)){
var c__5525__auto___53501 = cljs.core.chunk_first(seq__53165_53499__$1);
var G__53503 = cljs.core.chunk_rest(seq__53165_53499__$1);
var G__53504 = c__5525__auto___53501;
var G__53505 = cljs.core.count(c__5525__auto___53501);
var G__53506 = (0);
seq__53165_53487 = G__53503;
chunk__53166_53488 = G__53504;
count__53167_53489 = G__53505;
i__53168_53490 = G__53506;
continue;
} else {
var item_53507 = cljs.core.first(seq__53165_53499__$1);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(operations,cljs.core.conj,((function (seq__53165_53487,chunk__53166_53488,count__53167_53489,i__53168_53490,seq__53115_53422,chunk__53116_53424,count__53117_53425,i__53118_53426,item_53507,seq__53165_53499__$1,temp__5825__auto___53498__$1,send_queue_53482,vec__53162_53483,p_53484,serial_53485,front_53486,remote_53479,seq__53115_53473__$1,temp__5825__auto___53472,remote_names,operations,_STAR_remove_send_STAR__orig_val__53113,_STAR_remove_send_STAR__temp_val__53114){
return (function (){
return com.fulcrologic.fulcro.algorithms.tx_processing.batched_processing.net_send_BANG_(app,item_53507,remote_53479);
});})(seq__53165_53487,chunk__53166_53488,count__53167_53489,i__53168_53490,seq__53115_53422,chunk__53116_53424,count__53117_53425,i__53118_53426,item_53507,seq__53165_53499__$1,temp__5825__auto___53498__$1,send_queue_53482,vec__53162_53483,p_53484,serial_53485,front_53486,remote_53479,seq__53115_53473__$1,temp__5825__auto___53472,remote_names,operations,_STAR_remove_send_STAR__orig_val__53113,_STAR_remove_send_STAR__temp_val__53114))
);


var G__53510 = cljs.core.next(seq__53165_53499__$1);
var G__53511 = null;
var G__53512 = (0);
var G__53513 = (0);
seq__53165_53487 = G__53510;
chunk__53166_53488 = G__53511;
count__53167_53489 = G__53512;
i__53168_53490 = G__53513;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","active?","com.fulcrologic.fulcro.algorithms.tx-processing/active?",966679517).cljs$core$IFn$_invoke$arity$1(front_53486))){
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.reset_send_queue_BANG_(app,remote_53479,serial_53485);
} else {
var map__53178_53514 = com.fulcrologic.fulcro.algorithms.tx_processing.batched_processing.combine_sends(app,remote_53479,serial_53485);
var map__53178_53515__$1 = cljs.core.__destructure_map(map__53178_53514);
var send_queue_53516__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53178_53515__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","send-queue","com.fulcrologic.fulcro.algorithms.tx-processing/send-queue",-1602123421));
var send_node_53517 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53178_53515__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","send-node","com.fulcrologic.fulcro.algorithms.tx-processing/send-node",1624648157));
if(cljs.core.truth_(send_node_53517)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(operations,cljs.core.conj,((function (seq__53115_53422,chunk__53116_53424,count__53117_53425,i__53118_53426,map__53178_53514,map__53178_53515__$1,send_queue_53516__$1,send_node_53517,send_queue_53482,vec__53162_53483,p_53484,serial_53485,front_53486,remote_53479,seq__53115_53473__$1,temp__5825__auto___53472,remote_names,operations,_STAR_remove_send_STAR__orig_val__53113,_STAR_remove_send_STAR__temp_val__53114){
return (function (){
return com.fulcrologic.fulcro.algorithms.tx_processing.batched_processing.net_send_BANG_(app,send_node_53517,remote_53479);
});})(seq__53115_53422,chunk__53116_53424,count__53117_53425,i__53118_53426,map__53178_53514,map__53178_53515__$1,send_queue_53516__$1,send_node_53517,send_queue_53482,vec__53162_53483,p_53484,serial_53485,front_53486,remote_53479,seq__53115_53473__$1,temp__5825__auto___53472,remote_names,operations,_STAR_remove_send_STAR__orig_val__53113,_STAR_remove_send_STAR__temp_val__53114))
);
} else {
}

com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.reset_send_queue_BANG_(app,remote_53479,send_queue_53516__$1);
}


var G__53520 = cljs.core.next(seq__53115_53473__$1);
var G__53521 = null;
var G__53522 = (0);
var G__53523 = (0);
seq__53115_53422 = G__53520;
chunk__53116_53424 = G__53521;
count__53117_53425 = G__53522;
i__53118_53426 = G__53523;
continue;
}
} else {
}
}
break;
}

var seq__53180 = cljs.core.seq(cljs.core.deref(operations));
var chunk__53181 = null;
var count__53182 = (0);
var i__53183 = (0);
while(true){
if((i__53183 < count__53182)){
var op = chunk__53181.cljs$core$IIndexed$_nth$arity$2(null, i__53183);
(op.cljs$core$IFn$_invoke$arity$0 ? op.cljs$core$IFn$_invoke$arity$0() : op.call(null, ));


var G__53526 = seq__53180;
var G__53527 = chunk__53181;
var G__53528 = count__53182;
var G__53529 = (i__53183 + (1));
seq__53180 = G__53526;
chunk__53181 = G__53527;
count__53182 = G__53528;
i__53183 = G__53529;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__53180);
if(temp__5825__auto__){
var seq__53180__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__53180__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__53180__$1);
var G__53532 = cljs.core.chunk_rest(seq__53180__$1);
var G__53533 = c__5525__auto__;
var G__53534 = cljs.core.count(c__5525__auto__);
var G__53535 = (0);
seq__53180 = G__53532;
chunk__53181 = G__53533;
count__53182 = G__53534;
i__53183 = G__53535;
continue;
} else {
var op = cljs.core.first(seq__53180__$1);
(op.cljs$core$IFn$_invoke$arity$0 ? op.cljs$core$IFn$_invoke$arity$0() : op.call(null, ));


var G__53536 = cljs.core.next(seq__53180__$1);
var G__53537 = null;
var G__53538 = (0);
var G__53539 = (0);
seq__53180 = G__53536;
chunk__53181 = G__53537;
count__53182 = G__53538;
i__53183 = G__53539;
continue;
}
} else {
return null;
}
}
break;
}
}finally {(com.fulcrologic.fulcro.algorithms.tx_processing.batched_processing._STAR_remove_send_STAR_ = _STAR_remove_send_STAR__orig_val__53113);
}});
/**
 * Run through the active queue and do a processing step.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.process_queue_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$process_queue_BANG_(p__53188){
var map__53190 = p__53188;
var map__53190__$1 = cljs.core.__destructure_map(map__53190);
var app = map__53190__$1;
var state_atom = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53190__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366));
var runtime_atom = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53190__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772));
var old_queue = com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.active_queue(app);
var new_queue = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$process_queue_BANG__$__STAR_pstep(new_queue,n){
var temp__5823__auto__ = com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.process_tx_node_BANG_(app,n);
if(cljs.core.truth_(temp__5823__auto__)){
var new_node = temp__5823__auto__;
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(new_queue,new_node);
} else {
return new_queue;
}
}),cljs.core.PersistentVector.EMPTY,old_queue);
var accumulate = (function (r,items){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.set(r),items);
});
var remotes = com.fulcrologic.fulcro.algorithms.tx_processing.app__GT_remote_names(app);
var explicit_refresh = com.fulcrologic.fulcro.algorithms.tx_processing.requested_refreshes(app,new_queue);
var remotes_active_QMARK_ = com.fulcrologic.fulcro.algorithms.tx_processing.active_remotes(new_queue,remotes);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old_queue,com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.active_queue(app))){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/algorithms/tx_processing/synchronous_tx_processing.cljc",346,7,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Old queue changed! See https://book.fulcrologic.com/#err-stp-old-queue-chng"], null);
}),null)),null,(280),null,null,null);
} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_atom,cljs.core.assoc,new cljs.core.Keyword("com.fulcrologic.fulcro.application","active-remotes","com.fulcrologic.fulcro.application/active-remotes",873903005),remotes_active_QMARK_);

com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.reset_active_queue_BANG_(app,new_queue);

if(cljs.core.seq(explicit_refresh)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(runtime_atom,cljs.core.update,new cljs.core.Keyword("com.fulcrologic.fulcro.application","to-refresh","com.fulcrologic.fulcro.application/to-refresh",-967758829),accumulate,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([explicit_refresh], 0));
} else {
}

com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.process_send_queues_BANG_(app);

return null;
});
/**
 * Returns true if the submission queue has work on it that can proceed without any restrictions.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.available_work_QMARK_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$available_work_QMARK_(app){
var map__53200 = cljs.core.group_by(cljs.core.comp.cljs$core$IFn$_invoke$arity$3(cljs.core.boolean$,new cljs.core.Keyword(null,"after-render?","after-render?",595994030),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","options","com.fulcrologic.fulcro.algorithms.tx-processing/options",2016767420)),com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.submission_queue(app));
var map__53200__$1 = cljs.core.__destructure_map(map__53200);
var ready = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53200__$1,false);
return cljs.core.boolean$(cljs.core.seq(ready));
});
/**
 * Activate all of the transactions that have been submitted since the last activation. After the items are activated
 *   a single processing step will run for the active queue.
 * 
 *   Activation can be blocked by the tx-node options for things like waiting for the next render frame.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.activate_submissions_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$activate_submissions_BANG_(app){
var map__53204 = cljs.core.group_by(cljs.core.comp.cljs$core$IFn$_invoke$arity$3(cljs.core.boolean$,new cljs.core.Keyword(null,"after-render?","after-render?",595994030),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","options","com.fulcrologic.fulcro.algorithms.tx-processing/options",2016767420)),com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.submission_queue(app));
var map__53204__$1 = cljs.core.__destructure_map(map__53204);
var blocked = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53204__$1,true);
var ready = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53204__$1,false);
var _ = com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.reset_submission_queue_BANG_(app,cljs.core.vec(blocked));
var dispatched_nodes = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__53202_SHARP_){
return com.fulcrologic.fulcro.algorithms.tx_processing.dispatch_elements(p1__53202_SHARP_,com.fulcrologic.fulcro.algorithms.tx_processing.build_env.cljs$core$IFn$_invoke$arity$2(app,p1__53202_SHARP_),com.fulcrologic.fulcro.mutations.mutate);
}),ready);
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_active_queue_BANG_.cljs$core$IFn$_invoke$arity$variadic(app,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.into,cljs.core.PersistentVector.EMPTY),dispatched_nodes], 0));

return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.process_queue_BANG_(app);
});
/**
 * Runs the submission queue. If the submission queue's optimistic actions submit more to the submission queue, then those
 * are processed as well until the submission queue remains empty. This can start network requests.
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.run_all_immediate_work_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$run_all_immediate_work_BANG_(app){
try{return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.activate_submissions_BANG_(app);
}catch (e53208){var e = e53208;
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/algorithms/tx_processing/synchronous_tx_processing.cljc",379,7,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,"Error processing tx queue! See https://book.fulcrologic.com/#err-stp-err-processing-tx-q"], null);
}),null)),null,(281),null,null,null);
}});
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.run_queue_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$run_queue_BANG_(app,p__53220){
while(true){
var map__53224 = p__53220;
var map__53224__$1 = cljs.core.__destructure_map(map__53224);
var options = map__53224__$1;
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53224__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var synchronous_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53224__$1,new cljs.core.Keyword(null,"synchronous?","synchronous?",1705588391));
while(true){
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.run_all_immediate_work_BANG_(app);

if(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.available_work_QMARK_(app)){
continue;
} else {
}
break;
}

if(cljs.core.truth_((function (){var and__5000__auto__ = synchronous_QMARK_;
if(cljs.core.truth_(and__5000__auto__)){
return component;
} else {
return and__5000__auto__;
}
})())){
var temp__5825__auto___53556 = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(app,new cljs.core.Keyword(null,"refresh-component!","refresh-component!",-872161039));
if(cljs.core.truth_(temp__5825__auto___53556)){
var refresh_component_BANG__53559 = temp__5825__auto___53556;
(refresh_component_BANG__53559.cljs$core$IFn$_invoke$arity$1 ? refresh_component_BANG__53559.cljs$core$IFn$_invoke$arity$1(component) : refresh_component_BANG__53559.call(null, component));
} else {
}
} else {
var temp__5825__auto___53560 = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(app,new cljs.core.Keyword(null,"render!","render!",-1848688504));
if(cljs.core.truth_(temp__5825__auto___53560)){
var render_BANG__53563 = temp__5825__auto___53560;
(render_BANG__53563.cljs$core$IFn$_invoke$arity$2 ? render_BANG__53563.cljs$core$IFn$_invoke$arity$2(app,options) : render_BANG__53563.call(null, app,options));
} else {
}
}

com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.release_post_render_tasks_BANG_(app);

if(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.available_work_QMARK_(app)){
var G__53564 = app;
var G__53565 = cljs.core.PersistentArrayMap.EMPTY;
app = G__53564;
p__53220 = G__53565;
continue;
} else {
return null;
}
break;
}
});
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.sync_tx_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$sync_tx_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___53566 = arguments.length;
var i__5727__auto___53569 = (0);
while(true){
if((i__5727__auto___53569 < len__5726__auto___53566)){
args__5732__auto__.push((arguments[i__5727__auto___53569]));

var G__53570 = (i__5727__auto___53569 + (1));
i__5727__auto___53569 = G__53570;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.sync_tx_BANG_.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.sync_tx_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (args){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("BREAKING CHANGE. Please use `with-synchronous-transaction` to add sync transaction support to your Fulcro app",cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.sync_tx_BANG_.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.sync_tx_BANG_.cljs$lang$applyTo = (function (seq53231){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq53231));
}));

com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.submit_sync_tx_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$submit_sync_tx_BANG_(var_args){
var G__53247 = arguments.length;
switch (G__53247) {
case 2:
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.submit_sync_tx_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.submit_sync_tx_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.submit_sync_tx_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (app,tx){
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.submit_sync_tx_BANG_.cljs$core$IFn$_invoke$arity$3(app,tx,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.submit_sync_tx_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (p__53249,tx,options){
var map__53250 = p__53249;
var map__53250__$1 = cljs.core.__destructure_map(map__53250);
var app = map__53250__$1;
var runtime_atom = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53250__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772));
var map__53252 = options;
var map__53252__$1 = cljs.core.__destructure_map(map__53252);
var options__$1 = map__53252__$1;
var refresh = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53252__$1,new cljs.core.Keyword(null,"refresh","refresh",1947415525));
var only_refresh = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53252__$1,new cljs.core.Keyword(null,"only-refresh","only-refresh",548241249));
var ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53252__$1,new cljs.core.Keyword(null,"ref","ref",1289896967));
var follow_on_reads = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__53242_SHARP_){
return (((p1__53242_SHARP_ instanceof cljs.core.Keyword)) || (edn_query_language.core.ident_QMARK_(p1__53242_SHARP_)));
}),tx));
var node = com.fulcrologic.fulcro.algorithms.tx_processing.tx_node.cljs$core$IFn$_invoke$arity$2(tx,options__$1);
var accumulate = (function (r,items){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.set(r),items);
});
var refresh__$1 = (function (){var G__53253 = cljs.core.set(refresh);
var G__53253__$1 = ((cljs.core.seq(follow_on_reads))?cljs.core.into.cljs$core$IFn$_invoke$arity$2(G__53253,follow_on_reads):G__53253);
if(cljs.core.truth_(ref)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__53253__$1,ref);
} else {
return G__53253__$1;
}
})();
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.swap_submission_queue_BANG_.cljs$core$IFn$_invoke$arity$variadic(app,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),node], 0));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(runtime_atom,(function (s){
var G__53254 = s;
var G__53254__$1 = ((cljs.core.seq(refresh__$1))?cljs.core.update.cljs$core$IFn$_invoke$arity$4(G__53254,new cljs.core.Keyword("com.fulcrologic.fulcro.application","to-refresh","com.fulcrologic.fulcro.application/to-refresh",-967758829),accumulate,refresh__$1):G__53254);
if(cljs.core.seq(only_refresh)){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(G__53254__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","only-refresh","com.fulcrologic.fulcro.application/only-refresh",1300408206),accumulate,only_refresh);
} else {
return G__53254__$1;
}
}));

if(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.in_transaction_QMARK_(app)){
} else {
var id__52817__auto___53586 = new cljs.core.Keyword("com.fulcrologic.fulcro.application","id","com.fulcrologic.fulcro.application/id",-2008968625).cljs$core$IFn$_invoke$arity$1(app);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.apps_in_tx,cljs.core.update,id__52817__auto___53586,cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.current_thread_id()], 0));

try{com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.run_queue_BANG_(app,options__$1);
}finally {cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.apps_in_tx,cljs.core.update,id__52817__auto___53586,cljs.core.pop);
}}

return new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","id","com.fulcrologic.fulcro.algorithms.tx-processing/id",1199810423).cljs$core$IFn$_invoke$arity$1(node);
}));

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.submit_sync_tx_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Implementation of abort when using this tx processing
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.abort_BANG_ = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$abort_BANG_(app_ish,abort_id){
var map__53260 = com.fulcrologic.fulcro.raw.components.any__GT_app(app_ish);
var map__53260__$1 = cljs.core.__destructure_map(map__53260);
var app = map__53260__$1;
var runtime_atom = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53260__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772));
var runtime_state = cljs.core.deref(runtime_atom);
var map__53261 = runtime_state;
var map__53261__$1 = cljs.core.__destructure_map(map__53261);
var remotes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53261__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","remotes","com.fulcrologic.fulcro.application/remotes",1823703517));
var seq__53268 = cljs.core.seq(remotes);
var chunk__53269 = null;
var count__53270 = (0);
var i__53271 = (0);
while(true){
if((i__53271 < count__53270)){
var vec__53285 = chunk__53269.cljs$core$IIndexed$_nth$arity$2(null, i__53271);
var remote_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53285,(0),null);
var remote = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53285,(1),null);
var send_queue_53593 = com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.send_queue(app,remote_name);
var new_queue_53594 = com.fulcrologic.fulcro.algorithms.tx_processing.abort_elements_BANG_(remote,send_queue_53593,abort_id);
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.reset_send_queue_BANG_(app,remote_name,new_queue_53594);


var G__53597 = seq__53268;
var G__53598 = chunk__53269;
var G__53599 = count__53270;
var G__53600 = (i__53271 + (1));
seq__53268 = G__53597;
chunk__53269 = G__53598;
count__53270 = G__53599;
i__53271 = G__53600;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__53268);
if(temp__5825__auto__){
var seq__53268__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__53268__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__53268__$1);
var G__53601 = cljs.core.chunk_rest(seq__53268__$1);
var G__53602 = c__5525__auto__;
var G__53603 = cljs.core.count(c__5525__auto__);
var G__53604 = (0);
seq__53268 = G__53601;
chunk__53269 = G__53602;
count__53270 = G__53603;
i__53271 = G__53604;
continue;
} else {
var vec__53288 = cljs.core.first(seq__53268__$1);
var remote_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53288,(0),null);
var remote = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53288,(1),null);
var send_queue_53605 = com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.send_queue(app,remote_name);
var new_queue_53606 = com.fulcrologic.fulcro.algorithms.tx_processing.abort_elements_BANG_(remote,send_queue_53605,abort_id);
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.reset_send_queue_BANG_(app,remote_name,new_queue_53606);


var G__53609 = cljs.core.next(seq__53268__$1);
var G__53610 = null;
var G__53611 = (0);
var G__53612 = (0);
seq__53268 = G__53609;
chunk__53269 = G__53610;
count__53270 = G__53611;
i__53271 = G__53612;
continue;
}
} else {
return null;
}
}
break;
}
});
/**
 * Installs synchronous transaction processing on a fulcro application.
 * 
 *   ```
 *   (defonce app (stx/with-synchronous-transactions
 *               (app/fulcro-app {...})))
 *   ```
 * 
 *   Passing a set of `batching-remotes` (a sequence of remote names) will enable automatic load
 *   batching on the listed remotes. Transactions are not currently batched, and *pessimistic transaction are NOT supported*.
 * 
 *   This plug-in attempts to do as much work as possible synchronously, including the processing of "remotes" that
 *   can behave synchronously. This processing system
 *   preserves transactional ordering semantics for nested submissions, but cannot guarantee that the overall sequence of
 *   operations will exactly match what you'd see if using the standard tx processing.
 * 
 *   The options map you can pass to `transact!` supports most of the same things as the standard tx processing, with the significant exception of
 *   `:optimistic? false` (pessimistic transactions). It also *always* assumes synchronous operation, though the
 *   `synchronous?` option (if used) does imply that only the current component should be refreshed in the UI as an additinoal
 *   optimization.
 * 
 *   - `:ref` - ident. The component ident to include in the transaction env.
 *   - `:component` - React element. The instance of the component that should appear in the transaction env.
 *   - `:synchronous?` - When true, causes the rendering to only refresh the calling component (if possible), since the implication
 *   is for fast-as-possible refresh semantics, even though this tx processing is already sync.
 *   - `:refresh` - A hint. Vector containing idents (of components) and keywords (of props). Things that have changed and should be re-rendered
 *  on screen. Only necessary when the underlying rendering algorithm won't auto-detect, such as when UI is derived from the
 *  state of other components or outside of the directly queried props. Interpretation depends on the renderer selected:
 *  The ident-optimized render treats these as "extras".
 *   - `:only-refresh` - A hint. Vector of idents/keywords.  If the underlying configured rendering algorithm supports it: The
 *  components using these are the *only* things that will be refreshed in the UI, and they may be refreshed immediately on
 *  `transact!`. This can be used to avoid the overhead of looking for stale data when you know exactly what
 *  you want to refresh on screen as an extra optimization. Idents are *not* checked against queries.
 * 
 *   If the `options` include `:ref` (which comp/transact! sets), then it will be auto-included on the `:refresh` list.
 * 
 *   Returns the transaction ID of the submitted transaction.
 *   
 */
com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.with_synchronous_transactions = (function com$fulcrologic$fulcro$algorithms$tx_processing$synchronous_tx_processing$with_synchronous_transactions(var_args){
var G__53305 = arguments.length;
switch (G__53305) {
case 1:
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.with_synchronous_transactions.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.with_synchronous_transactions.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.with_synchronous_transactions.cljs$core$IFn$_invoke$arity$1 = (function (app){
return com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.with_synchronous_transactions.cljs$core$IFn$_invoke$arity$2(app,null);
}));

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.with_synchronous_transactions.cljs$core$IFn$_invoke$arity$2 = (function (app,batching_remotes){
var remotes = cljs.core.keys(new cljs.core.Keyword("com.fulcrologic.fulcro.application","remotes","com.fulcrologic.fulcro.application/remotes",1823703517).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772).cljs$core$IFn$_invoke$arity$1(app))));
var send_queues = cljs.core.zipmap(remotes,cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$1((function (){
return cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
})));
var batching_enabled = cljs.core.zipmap(batching_remotes,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(true));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.update.cljs$core$IFn$_invoke$arity$variadic(cljs.core.assoc_in(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.application","config","com.fulcrologic.fulcro.application/config",-1907926684),new cljs.core.Keyword(null,"batching-enabled","batching-enabled",617647692)], null),batching_enabled),new cljs.core.Keyword("com.fulcrologic.fulcro.application","algorithms","com.fulcrologic.fulcro.application/algorithms",-397334538),cljs.core.assoc,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithm","tx!","com.fulcrologic.fulcro.algorithm/tx!",1081877133),com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.submit_sync_tx_BANG_,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithm","abort!","com.fulcrologic.fulcro.algorithm/abort!",1698846123),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.abort_BANG_], 0)),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","config","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/config",-1878584178),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","submission-queue","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/submission-queue",-1259886916),cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","post-processing-steps","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/post-processing-steps",1202501796),cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","active-queue","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/active-queue",-1020610588),cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing","send-queues","com.fulcrologic.fulcro.algorithms.tx-processing.synchronous-tx-processing/send-queues",-727474733),send_queues], null));
}));

(com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.with_synchronous_transactions.cljs$lang$maxFixedArity = 2);


//# sourceMappingURL=com.fulcrologic.fulcro.algorithms.tx_processing.synchronous_tx_processing.js.map
