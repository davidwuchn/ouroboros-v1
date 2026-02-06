goog.provide('cljs.core.async');
goog.scope(function(){
  cljs.core.async.goog$module$goog$array = goog.module.get('goog.array');
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39050 = (function (f,blockable,meta39051){
this.f = f;
this.blockable = blockable;
this.meta39051 = meta39051;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async39050.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39052,meta39051__$1){
var self__ = this;
var _39052__$1 = this;
return (new cljs.core.async.t_cljs$core$async39050(self__.f,self__.blockable,meta39051__$1));
}));

(cljs.core.async.t_cljs$core$async39050.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39052){
var self__ = this;
var _39052__$1 = this;
return self__.meta39051;
}));

(cljs.core.async.t_cljs$core$async39050.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39050.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async39050.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async39050.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async39050.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta39051","meta39051",228473767,null)], null);
}));

(cljs.core.async.t_cljs$core$async39050.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async39050.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39050");

(cljs.core.async.t_cljs$core$async39050.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async39050");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async39050.
 */
cljs.core.async.__GT_t_cljs$core$async39050 = (function cljs$core$async$__GT_t_cljs$core$async39050(f,blockable,meta39051){
return (new cljs.core.async.t_cljs$core$async39050(f,blockable,meta39051));
});


cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__39048 = arguments.length;
switch (G__39048) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
return (new cljs.core.async.t_cljs$core$async39050(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__39098 = arguments.length;
switch (G__39098) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
}));

(cljs.core.async.chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed, then return the value (or nil) forever. See chan for the
 *   semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__39105 = arguments.length;
switch (G__39105) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__39131 = arguments.length;
switch (G__39131) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_42579 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_42579) : fn1.call(null, val_42579));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_42579) : fn1.call(null, val_42579));
}));
}
} else {
}

return null;
}));

(cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3);

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__39140 = arguments.length;
switch (G__39140) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5823__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5823__auto__)){
var ret = temp__5823__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5823__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5823__auto__)){
var retb = temp__5823__auto__;
var ret = cljs.core.deref(retb);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null, ret));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null, ret));
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__5593__auto___42612 = n;
var x_42613 = (0);
while(true){
if((x_42613 < n__5593__auto___42612)){
(a[x_42613] = x_42613);

var G__42616 = (x_42613 + (1));
x_42613 = G__42616;
continue;
} else {
}
break;
}

cljs.core.async.goog$module$goog$array.shuffle(a);

return a;
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39172 = (function (flag,meta39173){
this.flag = flag;
this.meta39173 = meta39173;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async39172.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39174,meta39173__$1){
var self__ = this;
var _39174__$1 = this;
return (new cljs.core.async.t_cljs$core$async39172(self__.flag,meta39173__$1));
}));

(cljs.core.async.t_cljs$core$async39172.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39174){
var self__ = this;
var _39174__$1 = this;
return self__.meta39173;
}));

(cljs.core.async.t_cljs$core$async39172.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39172.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async39172.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async39172.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async39172.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta39173","meta39173",-2111721748,null)], null);
}));

(cljs.core.async.t_cljs$core$async39172.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async39172.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39172");

(cljs.core.async.t_cljs$core$async39172.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async39172");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async39172.
 */
cljs.core.async.__GT_t_cljs$core$async39172 = (function cljs$core$async$__GT_t_cljs$core$async39172(flag,meta39173){
return (new cljs.core.async.t_cljs$core$async39172(flag,meta39173));
});


cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
return (new cljs.core.async.t_cljs$core$async39172(flag,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39189 = (function (flag,cb,meta39190){
this.flag = flag;
this.cb = cb;
this.meta39190 = meta39190;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async39189.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39191,meta39190__$1){
var self__ = this;
var _39191__$1 = this;
return (new cljs.core.async.t_cljs$core$async39189(self__.flag,self__.cb,meta39190__$1));
}));

(cljs.core.async.t_cljs$core$async39189.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39191){
var self__ = this;
var _39191__$1 = this;
return self__.meta39190;
}));

(cljs.core.async.t_cljs$core$async39189.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39189.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async39189.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async39189.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async39189.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta39190","meta39190",1037063684,null)], null);
}));

(cljs.core.async.t_cljs$core$async39189.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async39189.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39189");

(cljs.core.async.t_cljs$core$async39189.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async39189");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async39189.
 */
cljs.core.async.__GT_t_cljs$core$async39189 = (function cljs$core$async$__GT_t_cljs$core$async39189(flag,cb,meta39190){
return (new cljs.core.async.t_cljs$core$async39189(flag,cb,meta39190));
});


cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
return (new cljs.core.async.t_cljs$core$async39189(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
if((cljs.core.count(ports) > (0))){
} else {
throw (new Error(["Assert failed: ","alts must have at least one channel operation","\n","(pos? (count ports))"].join('')));
}

var flag = cljs.core.async.alt_flag();
var ports__$1 = cljs.core.vec(ports);
var n = cljs.core.count(ports__$1);
var _ = (function (){var i = (0);
while(true){
if((i < n)){
var port_42633 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports__$1,i);
if(cljs.core.vector_QMARK_(port_42633)){
if((!(((port_42633.cljs$core$IFn$_invoke$arity$1 ? port_42633.cljs$core$IFn$_invoke$arity$1((1)) : port_42633.call(null, (1))) == null)))){
} else {
throw (new Error(["Assert failed: ","can't put nil on channel","\n","(some? (port 1))"].join('')));
}
} else {
}

var G__42634 = (i + (1));
i = G__42634;
continue;
} else {
return null;
}
break;
}
})();
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports__$1,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null, (0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null, (1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,ports__$1,n,_,idxs,priority){
return (function (p1__39220_SHARP_){
var G__39238 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__39220_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__39238) : fret.call(null, G__39238));
});})(i,val,idx,port,wport,flag,ports__$1,n,_,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,ports__$1,n,_,idxs,priority){
return (function (p1__39221_SHARP_){
var G__39239 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__39221_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__39239) : fret.call(null, G__39239));
});})(i,idx,port,wport,flag,ports__$1,n,_,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__5002__auto__ = wport;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return port;
}
})()], null));
} else {
var G__42635 = (i + (1));
i = G__42635;
continue;
}
} else {
return null;
}
break;
}
})();
var or__5002__auto__ = ret;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5825__auto__ = (function (){var and__5000__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null, );
if(cljs.core.truth_(and__5000__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null, );
} else {
return and__5000__auto__;
}
})();
if(cljs.core.truth_(temp__5825__auto__)){
var got = temp__5825__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___42636 = arguments.length;
var i__5727__auto___42637 = (0);
while(true){
if((i__5727__auto___42637 < len__5726__auto___42636)){
args__5732__auto__.push((arguments[i__5727__auto___42637]));

var G__42638 = (i__5727__auto___42637 + (1));
i__5727__auto___42637 = G__42638;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__39261){
var map__39263 = p__39261;
var map__39263__$1 = cljs.core.__destructure_map(map__39263);
var opts = map__39263__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq39246){
var G__39247 = cljs.core.first(seq39246);
var seq39246__$1 = cljs.core.next(seq39246);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39247,seq39246__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__39291 = arguments.length;
switch (G__39291) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__38935__auto___42641 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_39447){
var state_val_39452 = (state_39447[(1)]);
if((state_val_39452 === (7))){
var inst_39425 = (state_39447[(2)]);
var state_39447__$1 = state_39447;
var statearr_39494_42642 = state_39447__$1;
(statearr_39494_42642[(2)] = inst_39425);

(statearr_39494_42642[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39452 === (1))){
var state_39447__$1 = state_39447;
var statearr_39498_42647 = state_39447__$1;
(statearr_39498_42647[(2)] = null);

(statearr_39498_42647[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39452 === (4))){
var inst_39369 = (state_39447[(7)]);
var inst_39369__$1 = (state_39447[(2)]);
var inst_39375 = (inst_39369__$1 == null);
var state_39447__$1 = (function (){var statearr_39508 = state_39447;
(statearr_39508[(7)] = inst_39369__$1);

return statearr_39508;
})();
if(cljs.core.truth_(inst_39375)){
var statearr_39516_42648 = state_39447__$1;
(statearr_39516_42648[(1)] = (5));

} else {
var statearr_39519_42649 = state_39447__$1;
(statearr_39519_42649[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39452 === (13))){
var state_39447__$1 = state_39447;
var statearr_39524_42650 = state_39447__$1;
(statearr_39524_42650[(2)] = null);

(statearr_39524_42650[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39452 === (6))){
var inst_39369 = (state_39447[(7)]);
var state_39447__$1 = state_39447;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39447__$1,(11),to,inst_39369);
} else {
if((state_val_39452 === (3))){
var inst_39433 = (state_39447[(2)]);
var state_39447__$1 = state_39447;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39447__$1,inst_39433);
} else {
if((state_val_39452 === (12))){
var state_39447__$1 = state_39447;
var statearr_39564_42651 = state_39447__$1;
(statearr_39564_42651[(2)] = null);

(statearr_39564_42651[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39452 === (2))){
var state_39447__$1 = state_39447;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39447__$1,(4),from);
} else {
if((state_val_39452 === (11))){
var inst_39398 = (state_39447[(2)]);
var state_39447__$1 = state_39447;
if(cljs.core.truth_(inst_39398)){
var statearr_39577_42652 = state_39447__$1;
(statearr_39577_42652[(1)] = (12));

} else {
var statearr_39579_42653 = state_39447__$1;
(statearr_39579_42653[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39452 === (9))){
var state_39447__$1 = state_39447;
var statearr_39583_42654 = state_39447__$1;
(statearr_39583_42654[(2)] = null);

(statearr_39583_42654[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39452 === (5))){
var state_39447__$1 = state_39447;
if(cljs.core.truth_(close_QMARK_)){
var statearr_39600_42655 = state_39447__$1;
(statearr_39600_42655[(1)] = (8));

} else {
var statearr_39601_42656 = state_39447__$1;
(statearr_39601_42656[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39452 === (14))){
var inst_39423 = (state_39447[(2)]);
var state_39447__$1 = state_39447;
var statearr_39609_42657 = state_39447__$1;
(statearr_39609_42657[(2)] = inst_39423);

(statearr_39609_42657[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39452 === (10))){
var inst_39391 = (state_39447[(2)]);
var state_39447__$1 = state_39447;
var statearr_39616_42658 = state_39447__$1;
(statearr_39616_42658[(2)] = inst_39391);

(statearr_39616_42658[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39452 === (8))){
var inst_39384 = cljs.core.async.close_BANG_(to);
var state_39447__$1 = state_39447;
var statearr_39622_42659 = state_39447__$1;
(statearr_39622_42659[(2)] = inst_39384);

(statearr_39622_42659[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38783__auto__ = null;
var cljs$core$async$state_machine__38783__auto____0 = (function (){
var statearr_39640 = [null,null,null,null,null,null,null,null];
(statearr_39640[(0)] = cljs$core$async$state_machine__38783__auto__);

(statearr_39640[(1)] = (1));

return statearr_39640;
});
var cljs$core$async$state_machine__38783__auto____1 = (function (state_39447){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_39447);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e39649){var ex__38786__auto__ = e39649;
var statearr_39651_42660 = state_39447;
(statearr_39651_42660[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_39447[(4)]))){
var statearr_39657_42661 = state_39447;
(statearr_39657_42661[(1)] = cljs.core.first((state_39447[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42662 = state_39447;
state_39447 = G__42662;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$state_machine__38783__auto__ = function(state_39447){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38783__auto____1.call(this,state_39447);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38783__auto____0;
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38783__auto____1;
return cljs$core$async$state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_39679 = f__38936__auto__();
(statearr_39679[(6)] = c__38935__auto___42641);

return statearr_39679;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process__$1 = (function (p__39709){
var vec__39714 = p__39709;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39714,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39714,(1),null);
var job = vec__39714;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__38935__auto___42663 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_39735){
var state_val_39740 = (state_39735[(1)]);
if((state_val_39740 === (1))){
var state_39735__$1 = state_39735;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39735__$1,(2),res,v);
} else {
if((state_val_39740 === (2))){
var inst_39728 = (state_39735[(2)]);
var inst_39730 = cljs.core.async.close_BANG_(res);
var state_39735__$1 = (function (){var statearr_39752 = state_39735;
(statearr_39752[(7)] = inst_39728);

return statearr_39752;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_39735__$1,inst_39730);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0 = (function (){
var statearr_39759 = [null,null,null,null,null,null,null,null];
(statearr_39759[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__);

(statearr_39759[(1)] = (1));

return statearr_39759;
});
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1 = (function (state_39735){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_39735);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e39774){var ex__38786__auto__ = e39774;
var statearr_39775_42664 = state_39735;
(statearr_39775_42664[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_39735[(4)]))){
var statearr_39776_42665 = state_39735;
(statearr_39776_42665[(1)] = cljs.core.first((state_39735[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42670 = state_39735;
state_39735 = G__42670;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__ = function(state_39735){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1.call(this,state_39735);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_39779 = f__38936__auto__();
(statearr_39779[(6)] = c__38935__auto___42663);

return statearr_39779;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__39782){
var vec__39783 = p__39782;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39783,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39783,(1),null);
var job = vec__39783;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null, v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var n__5593__auto___42671 = n;
var __42672 = (0);
while(true){
if((__42672 < n__5593__auto___42671)){
var G__39789_42673 = type;
var G__39789_42674__$1 = (((G__39789_42673 instanceof cljs.core.Keyword))?G__39789_42673.fqn:null);
switch (G__39789_42674__$1) {
case "compute":
var c__38935__auto___42676 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__42672,c__38935__auto___42676,G__39789_42673,G__39789_42674__$1,n__5593__auto___42671,jobs,results,process__$1,async){
return (function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = ((function (__42672,c__38935__auto___42676,G__39789_42673,G__39789_42674__$1,n__5593__auto___42671,jobs,results,process__$1,async){
return (function (state_39807){
var state_val_39808 = (state_39807[(1)]);
if((state_val_39808 === (1))){
var state_39807__$1 = state_39807;
var statearr_39811_42678 = state_39807__$1;
(statearr_39811_42678[(2)] = null);

(statearr_39811_42678[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39808 === (2))){
var state_39807__$1 = state_39807;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39807__$1,(4),jobs);
} else {
if((state_val_39808 === (3))){
var inst_39804 = (state_39807[(2)]);
var state_39807__$1 = state_39807;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39807__$1,inst_39804);
} else {
if((state_val_39808 === (4))){
var inst_39796 = (state_39807[(2)]);
var inst_39797 = process__$1(inst_39796);
var state_39807__$1 = state_39807;
if(cljs.core.truth_(inst_39797)){
var statearr_39817_42679 = state_39807__$1;
(statearr_39817_42679[(1)] = (5));

} else {
var statearr_39818_42680 = state_39807__$1;
(statearr_39818_42680[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39808 === (5))){
var state_39807__$1 = state_39807;
var statearr_39823_42681 = state_39807__$1;
(statearr_39823_42681[(2)] = null);

(statearr_39823_42681[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39808 === (6))){
var state_39807__$1 = state_39807;
var statearr_39825_42685 = state_39807__$1;
(statearr_39825_42685[(2)] = null);

(statearr_39825_42685[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39808 === (7))){
var inst_39802 = (state_39807[(2)]);
var state_39807__$1 = state_39807;
var statearr_39827_42686 = state_39807__$1;
(statearr_39827_42686[(2)] = inst_39802);

(statearr_39827_42686[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__42672,c__38935__auto___42676,G__39789_42673,G__39789_42674__$1,n__5593__auto___42671,jobs,results,process__$1,async))
;
return ((function (__42672,switch__38782__auto__,c__38935__auto___42676,G__39789_42673,G__39789_42674__$1,n__5593__auto___42671,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0 = (function (){
var statearr_39831 = [null,null,null,null,null,null,null];
(statearr_39831[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__);

(statearr_39831[(1)] = (1));

return statearr_39831;
});
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1 = (function (state_39807){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_39807);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e39832){var ex__38786__auto__ = e39832;
var statearr_39833_42687 = state_39807;
(statearr_39833_42687[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_39807[(4)]))){
var statearr_39835_42688 = state_39807;
(statearr_39835_42688[(1)] = cljs.core.first((state_39807[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42689 = state_39807;
state_39807 = G__42689;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__ = function(state_39807){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1.call(this,state_39807);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__;
})()
;})(__42672,switch__38782__auto__,c__38935__auto___42676,G__39789_42673,G__39789_42674__$1,n__5593__auto___42671,jobs,results,process__$1,async))
})();
var state__38937__auto__ = (function (){var statearr_39839 = f__38936__auto__();
(statearr_39839[(6)] = c__38935__auto___42676);

return statearr_39839;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
});})(__42672,c__38935__auto___42676,G__39789_42673,G__39789_42674__$1,n__5593__auto___42671,jobs,results,process__$1,async))
);


break;
case "async":
var c__38935__auto___42690 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__42672,c__38935__auto___42690,G__39789_42673,G__39789_42674__$1,n__5593__auto___42671,jobs,results,process__$1,async){
return (function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = ((function (__42672,c__38935__auto___42690,G__39789_42673,G__39789_42674__$1,n__5593__auto___42671,jobs,results,process__$1,async){
return (function (state_39855){
var state_val_39856 = (state_39855[(1)]);
if((state_val_39856 === (1))){
var state_39855__$1 = state_39855;
var statearr_39859_42691 = state_39855__$1;
(statearr_39859_42691[(2)] = null);

(statearr_39859_42691[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39856 === (2))){
var state_39855__$1 = state_39855;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39855__$1,(4),jobs);
} else {
if((state_val_39856 === (3))){
var inst_39853 = (state_39855[(2)]);
var state_39855__$1 = state_39855;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39855__$1,inst_39853);
} else {
if((state_val_39856 === (4))){
var inst_39844 = (state_39855[(2)]);
var inst_39846 = async(inst_39844);
var state_39855__$1 = state_39855;
if(cljs.core.truth_(inst_39846)){
var statearr_39866_42692 = state_39855__$1;
(statearr_39866_42692[(1)] = (5));

} else {
var statearr_39867_42693 = state_39855__$1;
(statearr_39867_42693[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39856 === (5))){
var state_39855__$1 = state_39855;
var statearr_39870_42694 = state_39855__$1;
(statearr_39870_42694[(2)] = null);

(statearr_39870_42694[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39856 === (6))){
var state_39855__$1 = state_39855;
var statearr_39871_42695 = state_39855__$1;
(statearr_39871_42695[(2)] = null);

(statearr_39871_42695[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39856 === (7))){
var inst_39851 = (state_39855[(2)]);
var state_39855__$1 = state_39855;
var statearr_39873_42696 = state_39855__$1;
(statearr_39873_42696[(2)] = inst_39851);

(statearr_39873_42696[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__42672,c__38935__auto___42690,G__39789_42673,G__39789_42674__$1,n__5593__auto___42671,jobs,results,process__$1,async))
;
return ((function (__42672,switch__38782__auto__,c__38935__auto___42690,G__39789_42673,G__39789_42674__$1,n__5593__auto___42671,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0 = (function (){
var statearr_39874 = [null,null,null,null,null,null,null];
(statearr_39874[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__);

(statearr_39874[(1)] = (1));

return statearr_39874;
});
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1 = (function (state_39855){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_39855);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e39875){var ex__38786__auto__ = e39875;
var statearr_39876_42697 = state_39855;
(statearr_39876_42697[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_39855[(4)]))){
var statearr_39877_42698 = state_39855;
(statearr_39877_42698[(1)] = cljs.core.first((state_39855[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42699 = state_39855;
state_39855 = G__42699;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__ = function(state_39855){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1.call(this,state_39855);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__;
})()
;})(__42672,switch__38782__auto__,c__38935__auto___42690,G__39789_42673,G__39789_42674__$1,n__5593__auto___42671,jobs,results,process__$1,async))
})();
var state__38937__auto__ = (function (){var statearr_39880 = f__38936__auto__();
(statearr_39880[(6)] = c__38935__auto___42690);

return statearr_39880;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
});})(__42672,c__38935__auto___42690,G__39789_42673,G__39789_42674__$1,n__5593__auto___42671,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__39789_42674__$1)].join('')));

}

var G__42700 = (__42672 + (1));
__42672 = G__42700;
continue;
} else {
}
break;
}

var c__38935__auto___42701 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_39915){
var state_val_39916 = (state_39915[(1)]);
if((state_val_39916 === (7))){
var inst_39911 = (state_39915[(2)]);
var state_39915__$1 = state_39915;
var statearr_39941_42703 = state_39915__$1;
(statearr_39941_42703[(2)] = inst_39911);

(statearr_39941_42703[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39916 === (1))){
var state_39915__$1 = state_39915;
var statearr_39946_42704 = state_39915__$1;
(statearr_39946_42704[(2)] = null);

(statearr_39946_42704[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39916 === (4))){
var inst_39886 = (state_39915[(7)]);
var inst_39886__$1 = (state_39915[(2)]);
var inst_39887 = (inst_39886__$1 == null);
var state_39915__$1 = (function (){var statearr_39952 = state_39915;
(statearr_39952[(7)] = inst_39886__$1);

return statearr_39952;
})();
if(cljs.core.truth_(inst_39887)){
var statearr_39954_42705 = state_39915__$1;
(statearr_39954_42705[(1)] = (5));

} else {
var statearr_39955_42706 = state_39915__$1;
(statearr_39955_42706[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39916 === (6))){
var inst_39886 = (state_39915[(7)]);
var inst_39891 = (state_39915[(8)]);
var inst_39891__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_39897 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_39903 = [inst_39886,inst_39891__$1];
var inst_39904 = (new cljs.core.PersistentVector(null,2,(5),inst_39897,inst_39903,null));
var state_39915__$1 = (function (){var statearr_39957 = state_39915;
(statearr_39957[(8)] = inst_39891__$1);

return statearr_39957;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39915__$1,(8),jobs,inst_39904);
} else {
if((state_val_39916 === (3))){
var inst_39913 = (state_39915[(2)]);
var state_39915__$1 = state_39915;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39915__$1,inst_39913);
} else {
if((state_val_39916 === (2))){
var state_39915__$1 = state_39915;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39915__$1,(4),from);
} else {
if((state_val_39916 === (9))){
var inst_39908 = (state_39915[(2)]);
var state_39915__$1 = (function (){var statearr_39961 = state_39915;
(statearr_39961[(9)] = inst_39908);

return statearr_39961;
})();
var statearr_39962_42707 = state_39915__$1;
(statearr_39962_42707[(2)] = null);

(statearr_39962_42707[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39916 === (5))){
var inst_39889 = cljs.core.async.close_BANG_(jobs);
var state_39915__$1 = state_39915;
var statearr_39963_42708 = state_39915__$1;
(statearr_39963_42708[(2)] = inst_39889);

(statearr_39963_42708[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39916 === (8))){
var inst_39891 = (state_39915[(8)]);
var inst_39906 = (state_39915[(2)]);
var state_39915__$1 = (function (){var statearr_39964 = state_39915;
(statearr_39964[(10)] = inst_39906);

return statearr_39964;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39915__$1,(9),results,inst_39891);
} else {
return null;
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0 = (function (){
var statearr_39966 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_39966[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__);

(statearr_39966[(1)] = (1));

return statearr_39966;
});
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1 = (function (state_39915){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_39915);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e39967){var ex__38786__auto__ = e39967;
var statearr_39968_42709 = state_39915;
(statearr_39968_42709[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_39915[(4)]))){
var statearr_39969_42710 = state_39915;
(statearr_39969_42710[(1)] = cljs.core.first((state_39915[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42711 = state_39915;
state_39915 = G__42711;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__ = function(state_39915){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1.call(this,state_39915);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_39970 = f__38936__auto__();
(statearr_39970[(6)] = c__38935__auto___42701);

return statearr_39970;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));


var c__38935__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_40019){
var state_val_40020 = (state_40019[(1)]);
if((state_val_40020 === (7))){
var inst_40012 = (state_40019[(2)]);
var state_40019__$1 = state_40019;
var statearr_40022_42712 = state_40019__$1;
(statearr_40022_42712[(2)] = inst_40012);

(statearr_40022_42712[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (20))){
var state_40019__$1 = state_40019;
var statearr_40023_42713 = state_40019__$1;
(statearr_40023_42713[(2)] = null);

(statearr_40023_42713[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (1))){
var state_40019__$1 = state_40019;
var statearr_40027_42714 = state_40019__$1;
(statearr_40027_42714[(2)] = null);

(statearr_40027_42714[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (4))){
var inst_39980 = (state_40019[(7)]);
var inst_39980__$1 = (state_40019[(2)]);
var inst_39981 = (inst_39980__$1 == null);
var state_40019__$1 = (function (){var statearr_40030 = state_40019;
(statearr_40030[(7)] = inst_39980__$1);

return statearr_40030;
})();
if(cljs.core.truth_(inst_39981)){
var statearr_40032_42718 = state_40019__$1;
(statearr_40032_42718[(1)] = (5));

} else {
var statearr_40033_42719 = state_40019__$1;
(statearr_40033_42719[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (15))){
var inst_39993 = (state_40019[(8)]);
var state_40019__$1 = state_40019;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_40019__$1,(18),to,inst_39993);
} else {
if((state_val_40020 === (21))){
var inst_40006 = (state_40019[(2)]);
var state_40019__$1 = state_40019;
var statearr_40039_42720 = state_40019__$1;
(statearr_40039_42720[(2)] = inst_40006);

(statearr_40039_42720[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (13))){
var inst_40009 = (state_40019[(2)]);
var state_40019__$1 = (function (){var statearr_40041 = state_40019;
(statearr_40041[(9)] = inst_40009);

return statearr_40041;
})();
var statearr_40042_42725 = state_40019__$1;
(statearr_40042_42725[(2)] = null);

(statearr_40042_42725[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (6))){
var inst_39980 = (state_40019[(7)]);
var state_40019__$1 = state_40019;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40019__$1,(11),inst_39980);
} else {
if((state_val_40020 === (17))){
var inst_40001 = (state_40019[(2)]);
var state_40019__$1 = state_40019;
if(cljs.core.truth_(inst_40001)){
var statearr_40045_42726 = state_40019__$1;
(statearr_40045_42726[(1)] = (19));

} else {
var statearr_40047_42727 = state_40019__$1;
(statearr_40047_42727[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (3))){
var inst_40017 = (state_40019[(2)]);
var state_40019__$1 = state_40019;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40019__$1,inst_40017);
} else {
if((state_val_40020 === (12))){
var inst_39990 = (state_40019[(10)]);
var state_40019__$1 = state_40019;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40019__$1,(14),inst_39990);
} else {
if((state_val_40020 === (2))){
var state_40019__$1 = state_40019;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40019__$1,(4),results);
} else {
if((state_val_40020 === (19))){
var state_40019__$1 = state_40019;
var statearr_40050_42728 = state_40019__$1;
(statearr_40050_42728[(2)] = null);

(statearr_40050_42728[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (11))){
var inst_39990 = (state_40019[(2)]);
var state_40019__$1 = (function (){var statearr_40051 = state_40019;
(statearr_40051[(10)] = inst_39990);

return statearr_40051;
})();
var statearr_40052_42729 = state_40019__$1;
(statearr_40052_42729[(2)] = null);

(statearr_40052_42729[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (9))){
var state_40019__$1 = state_40019;
var statearr_40054_42730 = state_40019__$1;
(statearr_40054_42730[(2)] = null);

(statearr_40054_42730[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (5))){
var state_40019__$1 = state_40019;
if(cljs.core.truth_(close_QMARK_)){
var statearr_40058_42734 = state_40019__$1;
(statearr_40058_42734[(1)] = (8));

} else {
var statearr_40060_42735 = state_40019__$1;
(statearr_40060_42735[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (14))){
var inst_39993 = (state_40019[(8)]);
var inst_39995 = (state_40019[(11)]);
var inst_39993__$1 = (state_40019[(2)]);
var inst_39994 = (inst_39993__$1 == null);
var inst_39995__$1 = cljs.core.not(inst_39994);
var state_40019__$1 = (function (){var statearr_40065 = state_40019;
(statearr_40065[(8)] = inst_39993__$1);

(statearr_40065[(11)] = inst_39995__$1);

return statearr_40065;
})();
if(inst_39995__$1){
var statearr_40067_42736 = state_40019__$1;
(statearr_40067_42736[(1)] = (15));

} else {
var statearr_40068_42737 = state_40019__$1;
(statearr_40068_42737[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (16))){
var inst_39995 = (state_40019[(11)]);
var state_40019__$1 = state_40019;
var statearr_40069_42742 = state_40019__$1;
(statearr_40069_42742[(2)] = inst_39995);

(statearr_40069_42742[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (10))){
var inst_39987 = (state_40019[(2)]);
var state_40019__$1 = state_40019;
var statearr_40071_42743 = state_40019__$1;
(statearr_40071_42743[(2)] = inst_39987);

(statearr_40071_42743[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (18))){
var inst_39998 = (state_40019[(2)]);
var state_40019__$1 = state_40019;
var statearr_40072_42744 = state_40019__$1;
(statearr_40072_42744[(2)] = inst_39998);

(statearr_40072_42744[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40020 === (8))){
var inst_39984 = cljs.core.async.close_BANG_(to);
var state_40019__$1 = state_40019;
var statearr_40076_42746 = state_40019__$1;
(statearr_40076_42746[(2)] = inst_39984);

(statearr_40076_42746[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0 = (function (){
var statearr_40080 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40080[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__);

(statearr_40080[(1)] = (1));

return statearr_40080;
});
var cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1 = (function (state_40019){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_40019);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e40082){var ex__38786__auto__ = e40082;
var statearr_40086_42749 = state_40019;
(statearr_40086_42749[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_40019[(4)]))){
var statearr_40090_42751 = state_40019;
(statearr_40090_42751[(1)] = cljs.core.first((state_40019[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42752 = state_40019;
state_40019 = G__42752;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__ = function(state_40019){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1.call(this,state_40019);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__38783__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_40098 = f__38936__auto__();
(statearr_40098[(6)] = c__38935__auto__);

return statearr_40098;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));

return c__38935__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). The
 *   presumption is that af will return immediately, having launched some
 *   asynchronous operation whose completion/callback will put results on
 *   the channel, then close! it. Outputs will be returned in order
 *   relative to the inputs. By default, the to channel will be closed
 *   when the from channel closes, but can be determined by the close?
 *   parameter. Will stop consuming the from channel if the to channel
 *   closes. See also pipeline, pipeline-blocking.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__40105 = arguments.length;
switch (G__40105) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
}));

(cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5);

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__40117 = arguments.length;
switch (G__40117) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
}));

(cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6);

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__40137 = arguments.length;
switch (G__40137) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__38935__auto___42764 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_40166){
var state_val_40167 = (state_40166[(1)]);
if((state_val_40167 === (7))){
var inst_40162 = (state_40166[(2)]);
var state_40166__$1 = state_40166;
var statearr_40173_42765 = state_40166__$1;
(statearr_40173_42765[(2)] = inst_40162);

(statearr_40173_42765[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40167 === (1))){
var state_40166__$1 = state_40166;
var statearr_40174_42766 = state_40166__$1;
(statearr_40174_42766[(2)] = null);

(statearr_40174_42766[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40167 === (4))){
var inst_40142 = (state_40166[(7)]);
var inst_40142__$1 = (state_40166[(2)]);
var inst_40143 = (inst_40142__$1 == null);
var state_40166__$1 = (function (){var statearr_40179 = state_40166;
(statearr_40179[(7)] = inst_40142__$1);

return statearr_40179;
})();
if(cljs.core.truth_(inst_40143)){
var statearr_40181_42767 = state_40166__$1;
(statearr_40181_42767[(1)] = (5));

} else {
var statearr_40182_42768 = state_40166__$1;
(statearr_40182_42768[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40167 === (13))){
var state_40166__$1 = state_40166;
var statearr_40185_42769 = state_40166__$1;
(statearr_40185_42769[(2)] = null);

(statearr_40185_42769[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40167 === (6))){
var inst_40142 = (state_40166[(7)]);
var inst_40149 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_40142) : p.call(null, inst_40142));
var state_40166__$1 = state_40166;
if(cljs.core.truth_(inst_40149)){
var statearr_40189_42770 = state_40166__$1;
(statearr_40189_42770[(1)] = (9));

} else {
var statearr_40190_42771 = state_40166__$1;
(statearr_40190_42771[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40167 === (3))){
var inst_40164 = (state_40166[(2)]);
var state_40166__$1 = state_40166;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40166__$1,inst_40164);
} else {
if((state_val_40167 === (12))){
var state_40166__$1 = state_40166;
var statearr_40193_42772 = state_40166__$1;
(statearr_40193_42772[(2)] = null);

(statearr_40193_42772[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40167 === (2))){
var state_40166__$1 = state_40166;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40166__$1,(4),ch);
} else {
if((state_val_40167 === (11))){
var inst_40142 = (state_40166[(7)]);
var inst_40153 = (state_40166[(2)]);
var state_40166__$1 = state_40166;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_40166__$1,(8),inst_40153,inst_40142);
} else {
if((state_val_40167 === (9))){
var state_40166__$1 = state_40166;
var statearr_40198_42777 = state_40166__$1;
(statearr_40198_42777[(2)] = tc);

(statearr_40198_42777[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40167 === (5))){
var inst_40145 = cljs.core.async.close_BANG_(tc);
var inst_40147 = cljs.core.async.close_BANG_(fc);
var state_40166__$1 = (function (){var statearr_40200 = state_40166;
(statearr_40200[(8)] = inst_40145);

return statearr_40200;
})();
var statearr_40203_42778 = state_40166__$1;
(statearr_40203_42778[(2)] = inst_40147);

(statearr_40203_42778[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40167 === (14))){
var inst_40160 = (state_40166[(2)]);
var state_40166__$1 = state_40166;
var statearr_40204_42779 = state_40166__$1;
(statearr_40204_42779[(2)] = inst_40160);

(statearr_40204_42779[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40167 === (10))){
var state_40166__$1 = state_40166;
var statearr_40206_42780 = state_40166__$1;
(statearr_40206_42780[(2)] = fc);

(statearr_40206_42780[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40167 === (8))){
var inst_40155 = (state_40166[(2)]);
var state_40166__$1 = state_40166;
if(cljs.core.truth_(inst_40155)){
var statearr_40210_42781 = state_40166__$1;
(statearr_40210_42781[(1)] = (12));

} else {
var statearr_40211_42782 = state_40166__$1;
(statearr_40211_42782[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38783__auto__ = null;
var cljs$core$async$state_machine__38783__auto____0 = (function (){
var statearr_40216 = [null,null,null,null,null,null,null,null,null];
(statearr_40216[(0)] = cljs$core$async$state_machine__38783__auto__);

(statearr_40216[(1)] = (1));

return statearr_40216;
});
var cljs$core$async$state_machine__38783__auto____1 = (function (state_40166){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_40166);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e40220){var ex__38786__auto__ = e40220;
var statearr_40221_42783 = state_40166;
(statearr_40221_42783[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_40166[(4)]))){
var statearr_40222_42785 = state_40166;
(statearr_40222_42785[(1)] = cljs.core.first((state_40166[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42786 = state_40166;
state_40166 = G__42786;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$state_machine__38783__auto__ = function(state_40166){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38783__auto____1.call(this,state_40166);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38783__auto____0;
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38783__auto____1;
return cljs$core$async$state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_40226 = f__38936__auto__();
(statearr_40226[(6)] = c__38935__auto___42764);

return statearr_40226;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
}));

(cljs.core.async.split.cljs$lang$maxFixedArity = 4);

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__38935__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_40280){
var state_val_40281 = (state_40280[(1)]);
if((state_val_40281 === (7))){
var inst_40273 = (state_40280[(2)]);
var state_40280__$1 = state_40280;
var statearr_40291_42791 = state_40280__$1;
(statearr_40291_42791[(2)] = inst_40273);

(statearr_40291_42791[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40281 === (1))){
var inst_40248 = init;
var inst_40249 = inst_40248;
var state_40280__$1 = (function (){var statearr_40292 = state_40280;
(statearr_40292[(7)] = inst_40249);

return statearr_40292;
})();
var statearr_40293_42792 = state_40280__$1;
(statearr_40293_42792[(2)] = null);

(statearr_40293_42792[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40281 === (4))){
var inst_40253 = (state_40280[(8)]);
var inst_40253__$1 = (state_40280[(2)]);
var inst_40258 = (inst_40253__$1 == null);
var state_40280__$1 = (function (){var statearr_40294 = state_40280;
(statearr_40294[(8)] = inst_40253__$1);

return statearr_40294;
})();
if(cljs.core.truth_(inst_40258)){
var statearr_40295_42793 = state_40280__$1;
(statearr_40295_42793[(1)] = (5));

} else {
var statearr_40296_42794 = state_40280__$1;
(statearr_40296_42794[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40281 === (6))){
var inst_40249 = (state_40280[(7)]);
var inst_40253 = (state_40280[(8)]);
var inst_40264 = (state_40280[(9)]);
var inst_40264__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_40249,inst_40253) : f.call(null, inst_40249,inst_40253));
var inst_40265 = cljs.core.reduced_QMARK_(inst_40264__$1);
var state_40280__$1 = (function (){var statearr_40298 = state_40280;
(statearr_40298[(9)] = inst_40264__$1);

return statearr_40298;
})();
if(inst_40265){
var statearr_40299_42795 = state_40280__$1;
(statearr_40299_42795[(1)] = (8));

} else {
var statearr_40302_42796 = state_40280__$1;
(statearr_40302_42796[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40281 === (3))){
var inst_40275 = (state_40280[(2)]);
var state_40280__$1 = state_40280;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40280__$1,inst_40275);
} else {
if((state_val_40281 === (2))){
var state_40280__$1 = state_40280;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40280__$1,(4),ch);
} else {
if((state_val_40281 === (9))){
var inst_40264 = (state_40280[(9)]);
var inst_40249 = inst_40264;
var state_40280__$1 = (function (){var statearr_40309 = state_40280;
(statearr_40309[(7)] = inst_40249);

return statearr_40309;
})();
var statearr_40310_42797 = state_40280__$1;
(statearr_40310_42797[(2)] = null);

(statearr_40310_42797[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40281 === (5))){
var inst_40249 = (state_40280[(7)]);
var state_40280__$1 = state_40280;
var statearr_40312_42798 = state_40280__$1;
(statearr_40312_42798[(2)] = inst_40249);

(statearr_40312_42798[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40281 === (10))){
var inst_40271 = (state_40280[(2)]);
var state_40280__$1 = state_40280;
var statearr_40313_42799 = state_40280__$1;
(statearr_40313_42799[(2)] = inst_40271);

(statearr_40313_42799[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40281 === (8))){
var inst_40264 = (state_40280[(9)]);
var inst_40267 = cljs.core.deref(inst_40264);
var state_40280__$1 = state_40280;
var statearr_40318_42800 = state_40280__$1;
(statearr_40318_42800[(2)] = inst_40267);

(statearr_40318_42800[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$reduce_$_state_machine__38783__auto__ = null;
var cljs$core$async$reduce_$_state_machine__38783__auto____0 = (function (){
var statearr_40321 = [null,null,null,null,null,null,null,null,null,null];
(statearr_40321[(0)] = cljs$core$async$reduce_$_state_machine__38783__auto__);

(statearr_40321[(1)] = (1));

return statearr_40321;
});
var cljs$core$async$reduce_$_state_machine__38783__auto____1 = (function (state_40280){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_40280);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e40325){var ex__38786__auto__ = e40325;
var statearr_40326_42801 = state_40280;
(statearr_40326_42801[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_40280[(4)]))){
var statearr_40327_42802 = state_40280;
(statearr_40327_42802[(1)] = cljs.core.first((state_40280[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42804 = state_40280;
state_40280 = G__42804;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__38783__auto__ = function(state_40280){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__38783__auto____1.call(this,state_40280);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__38783__auto____0;
cljs$core$async$reduce_$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__38783__auto____1;
return cljs$core$async$reduce_$_state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_40332 = f__38936__auto__();
(statearr_40332[(6)] = c__38935__auto__);

return statearr_40332;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));

return c__38935__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null, f));
var c__38935__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_40344){
var state_val_40345 = (state_40344[(1)]);
if((state_val_40345 === (1))){
var inst_40337 = cljs.core.async.reduce(f__$1,init,ch);
var state_40344__$1 = state_40344;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40344__$1,(2),inst_40337);
} else {
if((state_val_40345 === (2))){
var inst_40339 = (state_40344[(2)]);
var inst_40340 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_40339) : f__$1.call(null, inst_40339));
var state_40344__$1 = state_40344;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40344__$1,inst_40340);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__38783__auto__ = null;
var cljs$core$async$transduce_$_state_machine__38783__auto____0 = (function (){
var statearr_40351 = [null,null,null,null,null,null,null];
(statearr_40351[(0)] = cljs$core$async$transduce_$_state_machine__38783__auto__);

(statearr_40351[(1)] = (1));

return statearr_40351;
});
var cljs$core$async$transduce_$_state_machine__38783__auto____1 = (function (state_40344){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_40344);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e40355){var ex__38786__auto__ = e40355;
var statearr_40356_42807 = state_40344;
(statearr_40356_42807[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_40344[(4)]))){
var statearr_40359_42809 = state_40344;
(statearr_40359_42809[(1)] = cljs.core.first((state_40344[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42810 = state_40344;
state_40344 = G__42810;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__38783__auto__ = function(state_40344){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__38783__auto____1.call(this,state_40344);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__38783__auto____0;
cljs$core$async$transduce_$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__38783__auto____1;
return cljs$core$async$transduce_$_state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_40366 = f__38936__auto__();
(statearr_40366[(6)] = c__38935__auto__);

return statearr_40366;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));

return c__38935__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan_BANG_ = (function cljs$core$async$onto_chan_BANG_(var_args){
var G__40377 = arguments.length;
switch (G__40377) {
case 2:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__38935__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_40411){
var state_val_40413 = (state_40411[(1)]);
if((state_val_40413 === (7))){
var inst_40391 = (state_40411[(2)]);
var state_40411__$1 = state_40411;
var statearr_40418_42812 = state_40411__$1;
(statearr_40418_42812[(2)] = inst_40391);

(statearr_40418_42812[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40413 === (1))){
var inst_40382 = cljs.core.seq(coll);
var inst_40383 = inst_40382;
var state_40411__$1 = (function (){var statearr_40420 = state_40411;
(statearr_40420[(7)] = inst_40383);

return statearr_40420;
})();
var statearr_40421_42813 = state_40411__$1;
(statearr_40421_42813[(2)] = null);

(statearr_40421_42813[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40413 === (4))){
var inst_40383 = (state_40411[(7)]);
var inst_40389 = cljs.core.first(inst_40383);
var state_40411__$1 = state_40411;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_40411__$1,(7),ch,inst_40389);
} else {
if((state_val_40413 === (13))){
var inst_40405 = (state_40411[(2)]);
var state_40411__$1 = state_40411;
var statearr_40424_42816 = state_40411__$1;
(statearr_40424_42816[(2)] = inst_40405);

(statearr_40424_42816[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40413 === (6))){
var inst_40394 = (state_40411[(2)]);
var state_40411__$1 = state_40411;
if(cljs.core.truth_(inst_40394)){
var statearr_40432_42817 = state_40411__$1;
(statearr_40432_42817[(1)] = (8));

} else {
var statearr_40433_42818 = state_40411__$1;
(statearr_40433_42818[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40413 === (3))){
var inst_40409 = (state_40411[(2)]);
var state_40411__$1 = state_40411;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40411__$1,inst_40409);
} else {
if((state_val_40413 === (12))){
var state_40411__$1 = state_40411;
var statearr_40441_42819 = state_40411__$1;
(statearr_40441_42819[(2)] = null);

(statearr_40441_42819[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40413 === (2))){
var inst_40383 = (state_40411[(7)]);
var state_40411__$1 = state_40411;
if(cljs.core.truth_(inst_40383)){
var statearr_40453_42820 = state_40411__$1;
(statearr_40453_42820[(1)] = (4));

} else {
var statearr_40455_42821 = state_40411__$1;
(statearr_40455_42821[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40413 === (11))){
var inst_40402 = cljs.core.async.close_BANG_(ch);
var state_40411__$1 = state_40411;
var statearr_40456_42822 = state_40411__$1;
(statearr_40456_42822[(2)] = inst_40402);

(statearr_40456_42822[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40413 === (9))){
var state_40411__$1 = state_40411;
if(cljs.core.truth_(close_QMARK_)){
var statearr_40462_42823 = state_40411__$1;
(statearr_40462_42823[(1)] = (11));

} else {
var statearr_40463_42824 = state_40411__$1;
(statearr_40463_42824[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40413 === (5))){
var inst_40383 = (state_40411[(7)]);
var state_40411__$1 = state_40411;
var statearr_40464_42826 = state_40411__$1;
(statearr_40464_42826[(2)] = inst_40383);

(statearr_40464_42826[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40413 === (10))){
var inst_40407 = (state_40411[(2)]);
var state_40411__$1 = state_40411;
var statearr_40466_42828 = state_40411__$1;
(statearr_40466_42828[(2)] = inst_40407);

(statearr_40466_42828[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40413 === (8))){
var inst_40383 = (state_40411[(7)]);
var inst_40396 = cljs.core.next(inst_40383);
var inst_40383__$1 = inst_40396;
var state_40411__$1 = (function (){var statearr_40470 = state_40411;
(statearr_40470[(7)] = inst_40383__$1);

return statearr_40470;
})();
var statearr_40471_42830 = state_40411__$1;
(statearr_40471_42830[(2)] = null);

(statearr_40471_42830[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38783__auto__ = null;
var cljs$core$async$state_machine__38783__auto____0 = (function (){
var statearr_40472 = [null,null,null,null,null,null,null,null];
(statearr_40472[(0)] = cljs$core$async$state_machine__38783__auto__);

(statearr_40472[(1)] = (1));

return statearr_40472;
});
var cljs$core$async$state_machine__38783__auto____1 = (function (state_40411){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_40411);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e40473){var ex__38786__auto__ = e40473;
var statearr_40474_42832 = state_40411;
(statearr_40474_42832[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_40411[(4)]))){
var statearr_40476_42834 = state_40411;
(statearr_40476_42834[(1)] = cljs.core.first((state_40411[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42835 = state_40411;
state_40411 = G__42835;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$state_machine__38783__auto__ = function(state_40411){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38783__auto____1.call(this,state_40411);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38783__auto____0;
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38783__auto____1;
return cljs$core$async$state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_40481 = f__38936__auto__();
(statearr_40481[(6)] = c__38935__auto__);

return statearr_40481;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));

return c__38935__auto__;
}));

(cljs.core.async.onto_chan_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan_BANG_ = (function cljs$core$async$to_chan_BANG_(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});
/**
 * Deprecated - use onto-chan!
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__40493 = arguments.length;
switch (G__40493) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,close_QMARK_);
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - use to-chan!
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
return cljs.core.async.to_chan_BANG_(coll);
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

var cljs$core$async$Mux$muxch_STAR_$dyn_42839 = (function (_){
var x__5350__auto__ = (((_ == null))?null:_);
var m__5351__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5351__auto__.call(null, _));
} else {
var m__5349__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5349__auto__.call(null, _));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_42839(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_42844 = (function (m,ch,close_QMARK_){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5351__auto__.call(null, m,ch,close_QMARK_));
} else {
var m__5349__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5349__auto__.call(null, m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_42844(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_42845 = (function (m,ch){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5351__auto__.call(null, m,ch));
} else {
var m__5349__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5349__auto__.call(null, m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_42845(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_42847 = (function (m){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5351__auto__.call(null, m));
} else {
var m__5349__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5349__auto__.call(null, m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_42847(m);
}
});


/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async40543 = (function (ch,cs,meta40544){
this.ch = ch;
this.cs = cs;
this.meta40544 = meta40544;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async40543.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_40545,meta40544__$1){
var self__ = this;
var _40545__$1 = this;
return (new cljs.core.async.t_cljs$core$async40543(self__.ch,self__.cs,meta40544__$1));
}));

(cljs.core.async.t_cljs$core$async40543.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_40545){
var self__ = this;
var _40545__$1 = this;
return self__.meta40544;
}));

(cljs.core.async.t_cljs$core$async40543.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async40543.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async40543.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async40543.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async40543.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async40543.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async40543.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta40544","meta40544",-1124767103,null)], null);
}));

(cljs.core.async.t_cljs$core$async40543.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async40543.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async40543");

(cljs.core.async.t_cljs$core$async40543.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async40543");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async40543.
 */
cljs.core.async.__GT_t_cljs$core$async40543 = (function cljs$core$async$__GT_t_cljs$core$async40543(ch,cs,meta40544){
return (new cljs.core.async.t_cljs$core$async40543(ch,cs,meta40544));
});


/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var m = (new cljs.core.async.t_cljs$core$async40543(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__38935__auto___42862 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_40726){
var state_val_40727 = (state_40726[(1)]);
if((state_val_40727 === (7))){
var inst_40720 = (state_40726[(2)]);
var state_40726__$1 = state_40726;
var statearr_40729_42864 = state_40726__$1;
(statearr_40729_42864[(2)] = inst_40720);

(statearr_40729_42864[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (20))){
var inst_40596 = (state_40726[(7)]);
var inst_40623 = cljs.core.first(inst_40596);
var inst_40624 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40623,(0),null);
var inst_40625 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40623,(1),null);
var state_40726__$1 = (function (){var statearr_40730 = state_40726;
(statearr_40730[(8)] = inst_40624);

return statearr_40730;
})();
if(cljs.core.truth_(inst_40625)){
var statearr_40731_42865 = state_40726__$1;
(statearr_40731_42865[(1)] = (22));

} else {
var statearr_40732_42868 = state_40726__$1;
(statearr_40732_42868[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (27))){
var inst_40659 = (state_40726[(9)]);
var inst_40662 = (state_40726[(10)]);
var inst_40669 = (state_40726[(11)]);
var inst_40563 = (state_40726[(12)]);
var inst_40669__$1 = cljs.core._nth(inst_40659,inst_40662);
var inst_40670 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_40669__$1,inst_40563,done);
var state_40726__$1 = (function (){var statearr_40733 = state_40726;
(statearr_40733[(11)] = inst_40669__$1);

return statearr_40733;
})();
if(cljs.core.truth_(inst_40670)){
var statearr_40734_42871 = state_40726__$1;
(statearr_40734_42871[(1)] = (30));

} else {
var statearr_40735_42872 = state_40726__$1;
(statearr_40735_42872[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (1))){
var state_40726__$1 = state_40726;
var statearr_40736_42875 = state_40726__$1;
(statearr_40736_42875[(2)] = null);

(statearr_40736_42875[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (24))){
var inst_40596 = (state_40726[(7)]);
var inst_40632 = (state_40726[(2)]);
var inst_40633 = cljs.core.next(inst_40596);
var inst_40573 = inst_40633;
var inst_40574 = null;
var inst_40575 = (0);
var inst_40576 = (0);
var state_40726__$1 = (function (){var statearr_40738 = state_40726;
(statearr_40738[(13)] = inst_40632);

(statearr_40738[(14)] = inst_40573);

(statearr_40738[(15)] = inst_40574);

(statearr_40738[(16)] = inst_40575);

(statearr_40738[(17)] = inst_40576);

return statearr_40738;
})();
var statearr_40739_42878 = state_40726__$1;
(statearr_40739_42878[(2)] = null);

(statearr_40739_42878[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (39))){
var state_40726__$1 = state_40726;
var statearr_40744_42879 = state_40726__$1;
(statearr_40744_42879[(2)] = null);

(statearr_40744_42879[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (4))){
var inst_40563 = (state_40726[(12)]);
var inst_40563__$1 = (state_40726[(2)]);
var inst_40564 = (inst_40563__$1 == null);
var state_40726__$1 = (function (){var statearr_40746 = state_40726;
(statearr_40746[(12)] = inst_40563__$1);

return statearr_40746;
})();
if(cljs.core.truth_(inst_40564)){
var statearr_40750_42881 = state_40726__$1;
(statearr_40750_42881[(1)] = (5));

} else {
var statearr_40752_42885 = state_40726__$1;
(statearr_40752_42885[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (15))){
var inst_40576 = (state_40726[(17)]);
var inst_40573 = (state_40726[(14)]);
var inst_40574 = (state_40726[(15)]);
var inst_40575 = (state_40726[(16)]);
var inst_40591 = (state_40726[(2)]);
var inst_40592 = (inst_40576 + (1));
var tmp40740 = inst_40573;
var tmp40741 = inst_40574;
var tmp40742 = inst_40575;
var inst_40573__$1 = tmp40740;
var inst_40574__$1 = tmp40741;
var inst_40575__$1 = tmp40742;
var inst_40576__$1 = inst_40592;
var state_40726__$1 = (function (){var statearr_40754 = state_40726;
(statearr_40754[(18)] = inst_40591);

(statearr_40754[(14)] = inst_40573__$1);

(statearr_40754[(15)] = inst_40574__$1);

(statearr_40754[(16)] = inst_40575__$1);

(statearr_40754[(17)] = inst_40576__$1);

return statearr_40754;
})();
var statearr_40755_42886 = state_40726__$1;
(statearr_40755_42886[(2)] = null);

(statearr_40755_42886[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (21))){
var inst_40637 = (state_40726[(2)]);
var state_40726__$1 = state_40726;
var statearr_40759_42891 = state_40726__$1;
(statearr_40759_42891[(2)] = inst_40637);

(statearr_40759_42891[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (31))){
var inst_40669 = (state_40726[(11)]);
var inst_40673 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null, inst_40669);
var state_40726__$1 = state_40726;
var statearr_40767_42892 = state_40726__$1;
(statearr_40767_42892[(2)] = inst_40673);

(statearr_40767_42892[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (32))){
var inst_40662 = (state_40726[(10)]);
var inst_40658 = (state_40726[(19)]);
var inst_40659 = (state_40726[(9)]);
var inst_40660 = (state_40726[(20)]);
var inst_40675 = (state_40726[(2)]);
var inst_40678 = (inst_40662 + (1));
var tmp40756 = inst_40659;
var tmp40757 = inst_40658;
var tmp40758 = inst_40660;
var inst_40658__$1 = tmp40757;
var inst_40659__$1 = tmp40756;
var inst_40660__$1 = tmp40758;
var inst_40662__$1 = inst_40678;
var state_40726__$1 = (function (){var statearr_40783 = state_40726;
(statearr_40783[(21)] = inst_40675);

(statearr_40783[(19)] = inst_40658__$1);

(statearr_40783[(9)] = inst_40659__$1);

(statearr_40783[(20)] = inst_40660__$1);

(statearr_40783[(10)] = inst_40662__$1);

return statearr_40783;
})();
var statearr_40787_42896 = state_40726__$1;
(statearr_40787_42896[(2)] = null);

(statearr_40787_42896[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (40))){
var inst_40692 = (state_40726[(22)]);
var inst_40696 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null, inst_40692);
var state_40726__$1 = state_40726;
var statearr_40794_42897 = state_40726__$1;
(statearr_40794_42897[(2)] = inst_40696);

(statearr_40794_42897[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (33))){
var inst_40682 = (state_40726[(23)]);
var inst_40684 = cljs.core.chunked_seq_QMARK_(inst_40682);
var state_40726__$1 = state_40726;
if(inst_40684){
var statearr_40795_42898 = state_40726__$1;
(statearr_40795_42898[(1)] = (36));

} else {
var statearr_40796_42899 = state_40726__$1;
(statearr_40796_42899[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (13))){
var inst_40585 = (state_40726[(24)]);
var inst_40588 = cljs.core.async.close_BANG_(inst_40585);
var state_40726__$1 = state_40726;
var statearr_40797_42901 = state_40726__$1;
(statearr_40797_42901[(2)] = inst_40588);

(statearr_40797_42901[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (22))){
var inst_40624 = (state_40726[(8)]);
var inst_40628 = cljs.core.async.close_BANG_(inst_40624);
var state_40726__$1 = state_40726;
var statearr_40798_42902 = state_40726__$1;
(statearr_40798_42902[(2)] = inst_40628);

(statearr_40798_42902[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (36))){
var inst_40682 = (state_40726[(23)]);
var inst_40686 = cljs.core.chunk_first(inst_40682);
var inst_40688 = cljs.core.chunk_rest(inst_40682);
var inst_40689 = cljs.core.count(inst_40686);
var inst_40658 = inst_40688;
var inst_40659 = inst_40686;
var inst_40660 = inst_40689;
var inst_40662 = (0);
var state_40726__$1 = (function (){var statearr_40799 = state_40726;
(statearr_40799[(19)] = inst_40658);

(statearr_40799[(9)] = inst_40659);

(statearr_40799[(20)] = inst_40660);

(statearr_40799[(10)] = inst_40662);

return statearr_40799;
})();
var statearr_40800_42903 = state_40726__$1;
(statearr_40800_42903[(2)] = null);

(statearr_40800_42903[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (41))){
var inst_40682 = (state_40726[(23)]);
var inst_40698 = (state_40726[(2)]);
var inst_40700 = cljs.core.next(inst_40682);
var inst_40658 = inst_40700;
var inst_40659 = null;
var inst_40660 = (0);
var inst_40662 = (0);
var state_40726__$1 = (function (){var statearr_40801 = state_40726;
(statearr_40801[(25)] = inst_40698);

(statearr_40801[(19)] = inst_40658);

(statearr_40801[(9)] = inst_40659);

(statearr_40801[(20)] = inst_40660);

(statearr_40801[(10)] = inst_40662);

return statearr_40801;
})();
var statearr_40802_42904 = state_40726__$1;
(statearr_40802_42904[(2)] = null);

(statearr_40802_42904[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (43))){
var state_40726__$1 = state_40726;
var statearr_40803_42905 = state_40726__$1;
(statearr_40803_42905[(2)] = null);

(statearr_40803_42905[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (29))){
var inst_40708 = (state_40726[(2)]);
var state_40726__$1 = state_40726;
var statearr_40804_42907 = state_40726__$1;
(statearr_40804_42907[(2)] = inst_40708);

(statearr_40804_42907[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (44))){
var inst_40717 = (state_40726[(2)]);
var state_40726__$1 = (function (){var statearr_40805 = state_40726;
(statearr_40805[(26)] = inst_40717);

return statearr_40805;
})();
var statearr_40806_42908 = state_40726__$1;
(statearr_40806_42908[(2)] = null);

(statearr_40806_42908[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (6))){
var inst_40647 = (state_40726[(27)]);
var inst_40646 = cljs.core.deref(cs);
var inst_40647__$1 = cljs.core.keys(inst_40646);
var inst_40649 = cljs.core.count(inst_40647__$1);
var inst_40650 = cljs.core.reset_BANG_(dctr,inst_40649);
var inst_40657 = cljs.core.seq(inst_40647__$1);
var inst_40658 = inst_40657;
var inst_40659 = null;
var inst_40660 = (0);
var inst_40662 = (0);
var state_40726__$1 = (function (){var statearr_40809 = state_40726;
(statearr_40809[(27)] = inst_40647__$1);

(statearr_40809[(28)] = inst_40650);

(statearr_40809[(19)] = inst_40658);

(statearr_40809[(9)] = inst_40659);

(statearr_40809[(20)] = inst_40660);

(statearr_40809[(10)] = inst_40662);

return statearr_40809;
})();
var statearr_40816_42909 = state_40726__$1;
(statearr_40816_42909[(2)] = null);

(statearr_40816_42909[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (28))){
var inst_40658 = (state_40726[(19)]);
var inst_40682 = (state_40726[(23)]);
var inst_40682__$1 = cljs.core.seq(inst_40658);
var state_40726__$1 = (function (){var statearr_40817 = state_40726;
(statearr_40817[(23)] = inst_40682__$1);

return statearr_40817;
})();
if(inst_40682__$1){
var statearr_40818_42910 = state_40726__$1;
(statearr_40818_42910[(1)] = (33));

} else {
var statearr_40819_42912 = state_40726__$1;
(statearr_40819_42912[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (25))){
var inst_40662 = (state_40726[(10)]);
var inst_40660 = (state_40726[(20)]);
var inst_40666 = (inst_40662 < inst_40660);
var inst_40667 = inst_40666;
var state_40726__$1 = state_40726;
if(cljs.core.truth_(inst_40667)){
var statearr_40820_42913 = state_40726__$1;
(statearr_40820_42913[(1)] = (27));

} else {
var statearr_40821_42914 = state_40726__$1;
(statearr_40821_42914[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (34))){
var state_40726__$1 = state_40726;
var statearr_40822_42915 = state_40726__$1;
(statearr_40822_42915[(2)] = null);

(statearr_40822_42915[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (17))){
var state_40726__$1 = state_40726;
var statearr_40823_42917 = state_40726__$1;
(statearr_40823_42917[(2)] = null);

(statearr_40823_42917[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (3))){
var inst_40723 = (state_40726[(2)]);
var state_40726__$1 = state_40726;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40726__$1,inst_40723);
} else {
if((state_val_40727 === (12))){
var inst_40642 = (state_40726[(2)]);
var state_40726__$1 = state_40726;
var statearr_40824_42919 = state_40726__$1;
(statearr_40824_42919[(2)] = inst_40642);

(statearr_40824_42919[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (2))){
var state_40726__$1 = state_40726;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40726__$1,(4),ch);
} else {
if((state_val_40727 === (23))){
var state_40726__$1 = state_40726;
var statearr_40827_42920 = state_40726__$1;
(statearr_40827_42920[(2)] = null);

(statearr_40827_42920[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (35))){
var inst_40706 = (state_40726[(2)]);
var state_40726__$1 = state_40726;
var statearr_40829_42921 = state_40726__$1;
(statearr_40829_42921[(2)] = inst_40706);

(statearr_40829_42921[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (19))){
var inst_40596 = (state_40726[(7)]);
var inst_40606 = cljs.core.chunk_first(inst_40596);
var inst_40609 = cljs.core.chunk_rest(inst_40596);
var inst_40612 = cljs.core.count(inst_40606);
var inst_40573 = inst_40609;
var inst_40574 = inst_40606;
var inst_40575 = inst_40612;
var inst_40576 = (0);
var state_40726__$1 = (function (){var statearr_40835 = state_40726;
(statearr_40835[(14)] = inst_40573);

(statearr_40835[(15)] = inst_40574);

(statearr_40835[(16)] = inst_40575);

(statearr_40835[(17)] = inst_40576);

return statearr_40835;
})();
var statearr_40841_42922 = state_40726__$1;
(statearr_40841_42922[(2)] = null);

(statearr_40841_42922[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (11))){
var inst_40573 = (state_40726[(14)]);
var inst_40596 = (state_40726[(7)]);
var inst_40596__$1 = cljs.core.seq(inst_40573);
var state_40726__$1 = (function (){var statearr_40842 = state_40726;
(statearr_40842[(7)] = inst_40596__$1);

return statearr_40842;
})();
if(inst_40596__$1){
var statearr_40843_42930 = state_40726__$1;
(statearr_40843_42930[(1)] = (16));

} else {
var statearr_40844_42931 = state_40726__$1;
(statearr_40844_42931[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (9))){
var inst_40644 = (state_40726[(2)]);
var state_40726__$1 = state_40726;
var statearr_40846_42932 = state_40726__$1;
(statearr_40846_42932[(2)] = inst_40644);

(statearr_40846_42932[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (5))){
var inst_40571 = cljs.core.deref(cs);
var inst_40572 = cljs.core.seq(inst_40571);
var inst_40573 = inst_40572;
var inst_40574 = null;
var inst_40575 = (0);
var inst_40576 = (0);
var state_40726__$1 = (function (){var statearr_40849 = state_40726;
(statearr_40849[(14)] = inst_40573);

(statearr_40849[(15)] = inst_40574);

(statearr_40849[(16)] = inst_40575);

(statearr_40849[(17)] = inst_40576);

return statearr_40849;
})();
var statearr_40851_42934 = state_40726__$1;
(statearr_40851_42934[(2)] = null);

(statearr_40851_42934[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (14))){
var state_40726__$1 = state_40726;
var statearr_40852_42935 = state_40726__$1;
(statearr_40852_42935[(2)] = null);

(statearr_40852_42935[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (45))){
var inst_40714 = (state_40726[(2)]);
var state_40726__$1 = state_40726;
var statearr_40857_42938 = state_40726__$1;
(statearr_40857_42938[(2)] = inst_40714);

(statearr_40857_42938[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (26))){
var inst_40647 = (state_40726[(27)]);
var inst_40710 = (state_40726[(2)]);
var inst_40711 = cljs.core.seq(inst_40647);
var state_40726__$1 = (function (){var statearr_40859 = state_40726;
(statearr_40859[(29)] = inst_40710);

return statearr_40859;
})();
if(inst_40711){
var statearr_40861_42942 = state_40726__$1;
(statearr_40861_42942[(1)] = (42));

} else {
var statearr_40862_42943 = state_40726__$1;
(statearr_40862_42943[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (16))){
var inst_40596 = (state_40726[(7)]);
var inst_40599 = cljs.core.chunked_seq_QMARK_(inst_40596);
var state_40726__$1 = state_40726;
if(inst_40599){
var statearr_40865_42944 = state_40726__$1;
(statearr_40865_42944[(1)] = (19));

} else {
var statearr_40866_42945 = state_40726__$1;
(statearr_40866_42945[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (38))){
var inst_40703 = (state_40726[(2)]);
var state_40726__$1 = state_40726;
var statearr_40867_42947 = state_40726__$1;
(statearr_40867_42947[(2)] = inst_40703);

(statearr_40867_42947[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (30))){
var state_40726__$1 = state_40726;
var statearr_40874_42948 = state_40726__$1;
(statearr_40874_42948[(2)] = null);

(statearr_40874_42948[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (10))){
var inst_40574 = (state_40726[(15)]);
var inst_40576 = (state_40726[(17)]);
var inst_40584 = cljs.core._nth(inst_40574,inst_40576);
var inst_40585 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40584,(0),null);
var inst_40586 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40584,(1),null);
var state_40726__$1 = (function (){var statearr_40882 = state_40726;
(statearr_40882[(24)] = inst_40585);

return statearr_40882;
})();
if(cljs.core.truth_(inst_40586)){
var statearr_40883_42949 = state_40726__$1;
(statearr_40883_42949[(1)] = (13));

} else {
var statearr_40886_42950 = state_40726__$1;
(statearr_40886_42950[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (18))){
var inst_40640 = (state_40726[(2)]);
var state_40726__$1 = state_40726;
var statearr_40889_42953 = state_40726__$1;
(statearr_40889_42953[(2)] = inst_40640);

(statearr_40889_42953[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (42))){
var state_40726__$1 = state_40726;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40726__$1,(45),dchan);
} else {
if((state_val_40727 === (37))){
var inst_40682 = (state_40726[(23)]);
var inst_40692 = (state_40726[(22)]);
var inst_40563 = (state_40726[(12)]);
var inst_40692__$1 = cljs.core.first(inst_40682);
var inst_40693 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_40692__$1,inst_40563,done);
var state_40726__$1 = (function (){var statearr_40902 = state_40726;
(statearr_40902[(22)] = inst_40692__$1);

return statearr_40902;
})();
if(cljs.core.truth_(inst_40693)){
var statearr_40903_42956 = state_40726__$1;
(statearr_40903_42956[(1)] = (39));

} else {
var statearr_40904_42957 = state_40726__$1;
(statearr_40904_42957[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40727 === (8))){
var inst_40576 = (state_40726[(17)]);
var inst_40575 = (state_40726[(16)]);
var inst_40578 = (inst_40576 < inst_40575);
var inst_40579 = inst_40578;
var state_40726__$1 = state_40726;
if(cljs.core.truth_(inst_40579)){
var statearr_40905_42958 = state_40726__$1;
(statearr_40905_42958[(1)] = (10));

} else {
var statearr_40907_42959 = state_40726__$1;
(statearr_40907_42959[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mult_$_state_machine__38783__auto__ = null;
var cljs$core$async$mult_$_state_machine__38783__auto____0 = (function (){
var statearr_40912 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40912[(0)] = cljs$core$async$mult_$_state_machine__38783__auto__);

(statearr_40912[(1)] = (1));

return statearr_40912;
});
var cljs$core$async$mult_$_state_machine__38783__auto____1 = (function (state_40726){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_40726);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e40915){var ex__38786__auto__ = e40915;
var statearr_40916_42963 = state_40726;
(statearr_40916_42963[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_40726[(4)]))){
var statearr_40918_42964 = state_40726;
(statearr_40918_42964[(1)] = cljs.core.first((state_40726[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42965 = state_40726;
state_40726 = G__42965;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__38783__auto__ = function(state_40726){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__38783__auto____1.call(this,state_40726);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__38783__auto____0;
cljs$core$async$mult_$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__38783__auto____1;
return cljs$core$async$mult_$_state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_40924 = f__38936__auto__();
(statearr_40924[(6)] = c__38935__auto___42862);

return statearr_40924;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__40935 = arguments.length;
switch (G__40935) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

var cljs$core$async$Mix$admix_STAR_$dyn_42967 = (function (m,ch){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5351__auto__.call(null, m,ch));
} else {
var m__5349__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5349__auto__.call(null, m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_42967(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_42970 = (function (m,ch){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5351__auto__.call(null, m,ch));
} else {
var m__5349__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5349__auto__.call(null, m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_42970(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_42973 = (function (m){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5351__auto__.call(null, m));
} else {
var m__5349__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5349__auto__.call(null, m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_42973(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_42979 = (function (m,state_map){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5351__auto__.call(null, m,state_map));
} else {
var m__5349__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5349__auto__.call(null, m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_42979(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_42980 = (function (m,mode){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5351__auto__.call(null, m,mode));
} else {
var m__5349__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5349__auto__.call(null, m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_42980(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___42983 = arguments.length;
var i__5727__auto___42984 = (0);
while(true){
if((i__5727__auto___42984 < len__5726__auto___42983)){
args__5732__auto__.push((arguments[i__5727__auto___42984]));

var G__42985 = (i__5727__auto___42984 + (1));
i__5727__auto___42984 = G__42985;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((3) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5733__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__40995){
var map__41000 = p__40995;
var map__41000__$1 = cljs.core.__destructure_map(map__41000);
var opts = map__41000__$1;
var statearr_41002_42986 = state;
(statearr_41002_42986[(1)] = cont_block);


var temp__5825__auto__ = cljs.core.async.do_alts((function (val){
var statearr_41003_42987 = state;
(statearr_41003_42987[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5825__auto__)){
var cb = temp__5825__auto__;
var statearr_41009_42988 = state;
(statearr_41009_42988[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq40983){
var G__40984 = cljs.core.first(seq40983);
var seq40983__$1 = cljs.core.next(seq40983);
var G__40985 = cljs.core.first(seq40983__$1);
var seq40983__$2 = cljs.core.next(seq40983__$1);
var G__40986 = cljs.core.first(seq40983__$2);
var seq40983__$3 = cljs.core.next(seq40983__$2);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__40984,G__40985,G__40986,seq40983__$3);
}));


/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async41031 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta41032){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta41032 = meta41032;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async41031.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_41033,meta41032__$1){
var self__ = this;
var _41033__$1 = this;
return (new cljs.core.async.t_cljs$core$async41031(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta41032__$1));
}));

(cljs.core.async.t_cljs$core$async41031.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_41033){
var self__ = this;
var _41033__$1 = this;
return self__.meta41032;
}));

(cljs.core.async.t_cljs$core$async41031.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41031.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async41031.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41031.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null, ));
}));

(cljs.core.async.t_cljs$core$async41031.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null, ));
}));

(cljs.core.async.t_cljs$core$async41031.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null, ));
}));

(cljs.core.async.t_cljs$core$async41031.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null, ));
}));

(cljs.core.async.t_cljs$core$async41031.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null, mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null, ));
}));

(cljs.core.async.t_cljs$core$async41031.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta41032","meta41032",-377238294,null)], null);
}));

(cljs.core.async.t_cljs$core$async41031.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async41031.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async41031");

(cljs.core.async.t_cljs$core$async41031.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async41031");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async41031.
 */
cljs.core.async.__GT_t_cljs$core$async41031 = (function cljs$core$async$__GT_t_cljs$core$async41031(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta41032){
return (new cljs.core.async.t_cljs$core$async41031(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta41032));
});


/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1)));
var changed = (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv((function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null, v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref(cs);
var mode = cljs.core.deref(solo_mode);
var solos = pick(new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick(new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (cljs.core.seq(solos))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (new cljs.core.async.t_cljs$core$async41031(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
var c__38935__auto___43000 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_41149){
var state_val_41150 = (state_41149[(1)]);
if((state_val_41150 === (7))){
var inst_41103 = (state_41149[(2)]);
var state_41149__$1 = state_41149;
if(cljs.core.truth_(inst_41103)){
var statearr_41158_43001 = state_41149__$1;
(statearr_41158_43001[(1)] = (8));

} else {
var statearr_41159_43002 = state_41149__$1;
(statearr_41159_43002[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (20))){
var inst_41094 = (state_41149[(7)]);
var state_41149__$1 = state_41149;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41149__$1,(23),out,inst_41094);
} else {
if((state_val_41150 === (1))){
var inst_41070 = calc_state();
var inst_41072 = cljs.core.__destructure_map(inst_41070);
var inst_41074 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_41072,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_41075 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_41072,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_41077 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_41072,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_41078 = inst_41070;
var state_41149__$1 = (function (){var statearr_41165 = state_41149;
(statearr_41165[(8)] = inst_41074);

(statearr_41165[(9)] = inst_41075);

(statearr_41165[(10)] = inst_41077);

(statearr_41165[(11)] = inst_41078);

return statearr_41165;
})();
var statearr_41166_43006 = state_41149__$1;
(statearr_41166_43006[(2)] = null);

(statearr_41166_43006[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (24))){
var inst_41083 = (state_41149[(12)]);
var inst_41078 = inst_41083;
var state_41149__$1 = (function (){var statearr_41168 = state_41149;
(statearr_41168[(11)] = inst_41078);

return statearr_41168;
})();
var statearr_41169_43007 = state_41149__$1;
(statearr_41169_43007[(2)] = null);

(statearr_41169_43007[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (4))){
var inst_41094 = (state_41149[(7)]);
var inst_41096 = (state_41149[(13)]);
var inst_41093 = (state_41149[(2)]);
var inst_41094__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_41093,(0),null);
var inst_41095 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_41093,(1),null);
var inst_41096__$1 = (inst_41094__$1 == null);
var state_41149__$1 = (function (){var statearr_41171 = state_41149;
(statearr_41171[(7)] = inst_41094__$1);

(statearr_41171[(14)] = inst_41095);

(statearr_41171[(13)] = inst_41096__$1);

return statearr_41171;
})();
if(cljs.core.truth_(inst_41096__$1)){
var statearr_41172_43011 = state_41149__$1;
(statearr_41172_43011[(1)] = (5));

} else {
var statearr_41173_43012 = state_41149__$1;
(statearr_41173_43012[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (15))){
var inst_41085 = (state_41149[(15)]);
var inst_41120 = (state_41149[(16)]);
var inst_41120__$1 = cljs.core.empty_QMARK_(inst_41085);
var state_41149__$1 = (function (){var statearr_41175 = state_41149;
(statearr_41175[(16)] = inst_41120__$1);

return statearr_41175;
})();
if(inst_41120__$1){
var statearr_41176_43016 = state_41149__$1;
(statearr_41176_43016[(1)] = (17));

} else {
var statearr_41177_43017 = state_41149__$1;
(statearr_41177_43017[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (21))){
var inst_41083 = (state_41149[(12)]);
var inst_41078 = inst_41083;
var state_41149__$1 = (function (){var statearr_41181 = state_41149;
(statearr_41181[(11)] = inst_41078);

return statearr_41181;
})();
var statearr_41182_43018 = state_41149__$1;
(statearr_41182_43018[(2)] = null);

(statearr_41182_43018[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (13))){
var inst_41111 = (state_41149[(2)]);
var inst_41112 = calc_state();
var inst_41078 = inst_41112;
var state_41149__$1 = (function (){var statearr_41184 = state_41149;
(statearr_41184[(17)] = inst_41111);

(statearr_41184[(11)] = inst_41078);

return statearr_41184;
})();
var statearr_41185_43019 = state_41149__$1;
(statearr_41185_43019[(2)] = null);

(statearr_41185_43019[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (22))){
var inst_41141 = (state_41149[(2)]);
var state_41149__$1 = state_41149;
var statearr_41188_43020 = state_41149__$1;
(statearr_41188_43020[(2)] = inst_41141);

(statearr_41188_43020[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (6))){
var inst_41095 = (state_41149[(14)]);
var inst_41101 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_41095,change);
var state_41149__$1 = state_41149;
var statearr_41190_43022 = state_41149__$1;
(statearr_41190_43022[(2)] = inst_41101);

(statearr_41190_43022[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (25))){
var state_41149__$1 = state_41149;
var statearr_41193_43024 = state_41149__$1;
(statearr_41193_43024[(2)] = null);

(statearr_41193_43024[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (17))){
var inst_41086 = (state_41149[(18)]);
var inst_41095 = (state_41149[(14)]);
var inst_41122 = (inst_41086.cljs$core$IFn$_invoke$arity$1 ? inst_41086.cljs$core$IFn$_invoke$arity$1(inst_41095) : inst_41086.call(null, inst_41095));
var inst_41123 = cljs.core.not(inst_41122);
var state_41149__$1 = state_41149;
var statearr_41197_43028 = state_41149__$1;
(statearr_41197_43028[(2)] = inst_41123);

(statearr_41197_43028[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (3))){
var inst_41145 = (state_41149[(2)]);
var state_41149__$1 = state_41149;
return cljs.core.async.impl.ioc_helpers.return_chan(state_41149__$1,inst_41145);
} else {
if((state_val_41150 === (12))){
var state_41149__$1 = state_41149;
var statearr_41198_43029 = state_41149__$1;
(statearr_41198_43029[(2)] = null);

(statearr_41198_43029[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (2))){
var inst_41078 = (state_41149[(11)]);
var inst_41083 = (state_41149[(12)]);
var inst_41083__$1 = cljs.core.__destructure_map(inst_41078);
var inst_41085 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_41083__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_41086 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_41083__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_41087 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_41083__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_41149__$1 = (function (){var statearr_41201 = state_41149;
(statearr_41201[(12)] = inst_41083__$1);

(statearr_41201[(15)] = inst_41085);

(statearr_41201[(18)] = inst_41086);

return statearr_41201;
})();
return cljs.core.async.ioc_alts_BANG_(state_41149__$1,(4),inst_41087);
} else {
if((state_val_41150 === (23))){
var inst_41131 = (state_41149[(2)]);
var state_41149__$1 = state_41149;
if(cljs.core.truth_(inst_41131)){
var statearr_41204_43040 = state_41149__$1;
(statearr_41204_43040[(1)] = (24));

} else {
var statearr_41211_43041 = state_41149__$1;
(statearr_41211_43041[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (19))){
var inst_41126 = (state_41149[(2)]);
var state_41149__$1 = state_41149;
var statearr_41218_43042 = state_41149__$1;
(statearr_41218_43042[(2)] = inst_41126);

(statearr_41218_43042[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (11))){
var inst_41095 = (state_41149[(14)]);
var inst_41108 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_41095);
var state_41149__$1 = state_41149;
var statearr_41223_43050 = state_41149__$1;
(statearr_41223_43050[(2)] = inst_41108);

(statearr_41223_43050[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (9))){
var inst_41085 = (state_41149[(15)]);
var inst_41095 = (state_41149[(14)]);
var inst_41117 = (state_41149[(19)]);
var inst_41117__$1 = (inst_41085.cljs$core$IFn$_invoke$arity$1 ? inst_41085.cljs$core$IFn$_invoke$arity$1(inst_41095) : inst_41085.call(null, inst_41095));
var state_41149__$1 = (function (){var statearr_41224 = state_41149;
(statearr_41224[(19)] = inst_41117__$1);

return statearr_41224;
})();
if(cljs.core.truth_(inst_41117__$1)){
var statearr_41225_43051 = state_41149__$1;
(statearr_41225_43051[(1)] = (14));

} else {
var statearr_41226_43052 = state_41149__$1;
(statearr_41226_43052[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (5))){
var inst_41096 = (state_41149[(13)]);
var state_41149__$1 = state_41149;
var statearr_41229_43054 = state_41149__$1;
(statearr_41229_43054[(2)] = inst_41096);

(statearr_41229_43054[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (14))){
var inst_41117 = (state_41149[(19)]);
var state_41149__$1 = state_41149;
var statearr_41232_43055 = state_41149__$1;
(statearr_41232_43055[(2)] = inst_41117);

(statearr_41232_43055[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (26))){
var inst_41137 = (state_41149[(2)]);
var state_41149__$1 = state_41149;
var statearr_41233_43056 = state_41149__$1;
(statearr_41233_43056[(2)] = inst_41137);

(statearr_41233_43056[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (16))){
var inst_41128 = (state_41149[(2)]);
var state_41149__$1 = state_41149;
if(cljs.core.truth_(inst_41128)){
var statearr_41235_43057 = state_41149__$1;
(statearr_41235_43057[(1)] = (20));

} else {
var statearr_41237_43058 = state_41149__$1;
(statearr_41237_43058[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (10))){
var inst_41143 = (state_41149[(2)]);
var state_41149__$1 = state_41149;
var statearr_41241_43059 = state_41149__$1;
(statearr_41241_43059[(2)] = inst_41143);

(statearr_41241_43059[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (18))){
var inst_41120 = (state_41149[(16)]);
var state_41149__$1 = state_41149;
var statearr_41242_43060 = state_41149__$1;
(statearr_41242_43060[(2)] = inst_41120);

(statearr_41242_43060[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41150 === (8))){
var inst_41094 = (state_41149[(7)]);
var inst_41106 = (inst_41094 == null);
var state_41149__$1 = state_41149;
if(cljs.core.truth_(inst_41106)){
var statearr_41244_43061 = state_41149__$1;
(statearr_41244_43061[(1)] = (11));

} else {
var statearr_41247_43062 = state_41149__$1;
(statearr_41247_43062[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mix_$_state_machine__38783__auto__ = null;
var cljs$core$async$mix_$_state_machine__38783__auto____0 = (function (){
var statearr_41253 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41253[(0)] = cljs$core$async$mix_$_state_machine__38783__auto__);

(statearr_41253[(1)] = (1));

return statearr_41253;
});
var cljs$core$async$mix_$_state_machine__38783__auto____1 = (function (state_41149){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_41149);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e41256){var ex__38786__auto__ = e41256;
var statearr_41257_43067 = state_41149;
(statearr_41257_43067[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_41149[(4)]))){
var statearr_41259_43068 = state_41149;
(statearr_41259_43068[(1)] = cljs.core.first((state_41149[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43070 = state_41149;
state_41149 = G__43070;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__38783__auto__ = function(state_41149){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__38783__auto____1.call(this,state_41149);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__38783__auto____0;
cljs$core$async$mix_$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__38783__auto____1;
return cljs$core$async$mix_$_state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_41264 = f__38936__auto__();
(statearr_41264[(6)] = c__38935__auto___43000);

return statearr_41264;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

var cljs$core$async$Pub$sub_STAR_$dyn_43074 = (function (p,v,ch,close_QMARK_){
var x__5350__auto__ = (((p == null))?null:p);
var m__5351__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5351__auto__.call(null, p,v,ch,close_QMARK_));
} else {
var m__5349__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5349__auto__.call(null, p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_43074(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_43076 = (function (p,v,ch){
var x__5350__auto__ = (((p == null))?null:p);
var m__5351__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5351__auto__.call(null, p,v,ch));
} else {
var m__5349__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5349__auto__.call(null, p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_43076(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_43081 = (function() {
var G__43082 = null;
var G__43082__1 = (function (p){
var x__5350__auto__ = (((p == null))?null:p);
var m__5351__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5351__auto__.call(null, p));
} else {
var m__5349__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5349__auto__.call(null, p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__43082__2 = (function (p,v){
var x__5350__auto__ = (((p == null))?null:p);
var m__5351__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5351__auto__.call(null, p,v));
} else {
var m__5349__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5349__auto__.call(null, p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__43082 = function(p,v){
switch(arguments.length){
case 1:
return G__43082__1.call(this,p);
case 2:
return G__43082__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__43082.cljs$core$IFn$_invoke$arity$1 = G__43082__1;
G__43082.cljs$core$IFn$_invoke$arity$2 = G__43082__2;
return G__43082;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__41311 = arguments.length;
switch (G__41311) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_43081(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_43081(p,v);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2);



/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async41344 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta41345){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta41345 = meta41345;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async41344.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_41346,meta41345__$1){
var self__ = this;
var _41346__$1 = this;
return (new cljs.core.async.t_cljs$core$async41344(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta41345__$1));
}));

(cljs.core.async.t_cljs$core$async41344.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_41346){
var self__ = this;
var _41346__$1 = this;
return self__.meta41345;
}));

(cljs.core.async.t_cljs$core$async41344.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41344.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async41344.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41344.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null, topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async41344.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5825__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5825__auto__)){
var m = temp__5825__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async41344.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async41344.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async41344.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta41345","meta41345",-382639001,null)], null);
}));

(cljs.core.async.t_cljs$core$async41344.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async41344.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async41344");

(cljs.core.async.t_cljs$core$async41344.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async41344");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async41344.
 */
cljs.core.async.__GT_t_cljs$core$async41344 = (function cljs$core$async$__GT_t_cljs$core$async41344(ch,topic_fn,buf_fn,mults,ensure_mult,meta41345){
return (new cljs.core.async.t_cljs$core$async41344(ch,topic_fn,buf_fn,mults,ensure_mult,meta41345));
});


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__41330 = arguments.length;
switch (G__41330) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__5002__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__41323_SHARP_){
if(cljs.core.truth_((p1__41323_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__41323_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__41323_SHARP_.call(null, topic)))){
return p1__41323_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__41323_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null, topic)))));
}
})),topic);
}
});
var p = (new cljs.core.async.t_cljs$core$async41344(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
var c__38935__auto___43098 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_41449){
var state_val_41450 = (state_41449[(1)]);
if((state_val_41450 === (7))){
var inst_41445 = (state_41449[(2)]);
var state_41449__$1 = state_41449;
var statearr_41458_43099 = state_41449__$1;
(statearr_41458_43099[(2)] = inst_41445);

(statearr_41458_43099[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (20))){
var state_41449__$1 = state_41449;
var statearr_41459_43100 = state_41449__$1;
(statearr_41459_43100[(2)] = null);

(statearr_41459_43100[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (1))){
var state_41449__$1 = state_41449;
var statearr_41460_43105 = state_41449__$1;
(statearr_41460_43105[(2)] = null);

(statearr_41460_43105[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (24))){
var inst_41428 = (state_41449[(7)]);
var inst_41437 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_41428);
var state_41449__$1 = state_41449;
var statearr_41461_43106 = state_41449__$1;
(statearr_41461_43106[(2)] = inst_41437);

(statearr_41461_43106[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (4))){
var inst_41370 = (state_41449[(8)]);
var inst_41370__$1 = (state_41449[(2)]);
var inst_41371 = (inst_41370__$1 == null);
var state_41449__$1 = (function (){var statearr_41462 = state_41449;
(statearr_41462[(8)] = inst_41370__$1);

return statearr_41462;
})();
if(cljs.core.truth_(inst_41371)){
var statearr_41465_43107 = state_41449__$1;
(statearr_41465_43107[(1)] = (5));

} else {
var statearr_41467_43108 = state_41449__$1;
(statearr_41467_43108[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (15))){
var inst_41422 = (state_41449[(2)]);
var state_41449__$1 = state_41449;
var statearr_41468_43109 = state_41449__$1;
(statearr_41468_43109[(2)] = inst_41422);

(statearr_41468_43109[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (21))){
var inst_41442 = (state_41449[(2)]);
var state_41449__$1 = (function (){var statearr_41469 = state_41449;
(statearr_41469[(9)] = inst_41442);

return statearr_41469;
})();
var statearr_41470_43110 = state_41449__$1;
(statearr_41470_43110[(2)] = null);

(statearr_41470_43110[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (13))){
var inst_41395 = (state_41449[(10)]);
var inst_41401 = cljs.core.chunked_seq_QMARK_(inst_41395);
var state_41449__$1 = state_41449;
if(inst_41401){
var statearr_41471_43111 = state_41449__$1;
(statearr_41471_43111[(1)] = (16));

} else {
var statearr_41472_43112 = state_41449__$1;
(statearr_41472_43112[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (22))){
var inst_41434 = (state_41449[(2)]);
var state_41449__$1 = state_41449;
if(cljs.core.truth_(inst_41434)){
var statearr_41474_43113 = state_41449__$1;
(statearr_41474_43113[(1)] = (23));

} else {
var statearr_41475_43114 = state_41449__$1;
(statearr_41475_43114[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (6))){
var inst_41370 = (state_41449[(8)]);
var inst_41428 = (state_41449[(7)]);
var inst_41430 = (state_41449[(11)]);
var inst_41428__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_41370) : topic_fn.call(null, inst_41370));
var inst_41429 = cljs.core.deref(mults);
var inst_41430__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_41429,inst_41428__$1);
var state_41449__$1 = (function (){var statearr_41476 = state_41449;
(statearr_41476[(7)] = inst_41428__$1);

(statearr_41476[(11)] = inst_41430__$1);

return statearr_41476;
})();
if(cljs.core.truth_(inst_41430__$1)){
var statearr_41477_43115 = state_41449__$1;
(statearr_41477_43115[(1)] = (19));

} else {
var statearr_41488_43116 = state_41449__$1;
(statearr_41488_43116[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (25))){
var inst_41439 = (state_41449[(2)]);
var state_41449__$1 = state_41449;
var statearr_41489_43117 = state_41449__$1;
(statearr_41489_43117[(2)] = inst_41439);

(statearr_41489_43117[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (17))){
var inst_41395 = (state_41449[(10)]);
var inst_41413 = cljs.core.first(inst_41395);
var inst_41414 = cljs.core.async.muxch_STAR_(inst_41413);
var inst_41415 = cljs.core.async.close_BANG_(inst_41414);
var inst_41416 = cljs.core.next(inst_41395);
var inst_41381 = inst_41416;
var inst_41382 = null;
var inst_41383 = (0);
var inst_41384 = (0);
var state_41449__$1 = (function (){var statearr_41498 = state_41449;
(statearr_41498[(12)] = inst_41415);

(statearr_41498[(13)] = inst_41381);

(statearr_41498[(14)] = inst_41382);

(statearr_41498[(15)] = inst_41383);

(statearr_41498[(16)] = inst_41384);

return statearr_41498;
})();
var statearr_41500_43118 = state_41449__$1;
(statearr_41500_43118[(2)] = null);

(statearr_41500_43118[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (3))){
var inst_41447 = (state_41449[(2)]);
var state_41449__$1 = state_41449;
return cljs.core.async.impl.ioc_helpers.return_chan(state_41449__$1,inst_41447);
} else {
if((state_val_41450 === (12))){
var inst_41424 = (state_41449[(2)]);
var state_41449__$1 = state_41449;
var statearr_41506_43119 = state_41449__$1;
(statearr_41506_43119[(2)] = inst_41424);

(statearr_41506_43119[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (2))){
var state_41449__$1 = state_41449;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_41449__$1,(4),ch);
} else {
if((state_val_41450 === (23))){
var state_41449__$1 = state_41449;
var statearr_41507_43126 = state_41449__$1;
(statearr_41507_43126[(2)] = null);

(statearr_41507_43126[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (19))){
var inst_41430 = (state_41449[(11)]);
var inst_41370 = (state_41449[(8)]);
var inst_41432 = cljs.core.async.muxch_STAR_(inst_41430);
var state_41449__$1 = state_41449;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41449__$1,(22),inst_41432,inst_41370);
} else {
if((state_val_41450 === (11))){
var inst_41381 = (state_41449[(13)]);
var inst_41395 = (state_41449[(10)]);
var inst_41395__$1 = cljs.core.seq(inst_41381);
var state_41449__$1 = (function (){var statearr_41512 = state_41449;
(statearr_41512[(10)] = inst_41395__$1);

return statearr_41512;
})();
if(inst_41395__$1){
var statearr_41513_43127 = state_41449__$1;
(statearr_41513_43127[(1)] = (13));

} else {
var statearr_41514_43128 = state_41449__$1;
(statearr_41514_43128[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (9))){
var inst_41426 = (state_41449[(2)]);
var state_41449__$1 = state_41449;
var statearr_41515_43129 = state_41449__$1;
(statearr_41515_43129[(2)] = inst_41426);

(statearr_41515_43129[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (5))){
var inst_41378 = cljs.core.deref(mults);
var inst_41379 = cljs.core.vals(inst_41378);
var inst_41380 = cljs.core.seq(inst_41379);
var inst_41381 = inst_41380;
var inst_41382 = null;
var inst_41383 = (0);
var inst_41384 = (0);
var state_41449__$1 = (function (){var statearr_41518 = state_41449;
(statearr_41518[(13)] = inst_41381);

(statearr_41518[(14)] = inst_41382);

(statearr_41518[(15)] = inst_41383);

(statearr_41518[(16)] = inst_41384);

return statearr_41518;
})();
var statearr_41519_43130 = state_41449__$1;
(statearr_41519_43130[(2)] = null);

(statearr_41519_43130[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (14))){
var state_41449__$1 = state_41449;
var statearr_41530_43131 = state_41449__$1;
(statearr_41530_43131[(2)] = null);

(statearr_41530_43131[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (16))){
var inst_41395 = (state_41449[(10)]);
var inst_41407 = cljs.core.chunk_first(inst_41395);
var inst_41408 = cljs.core.chunk_rest(inst_41395);
var inst_41409 = cljs.core.count(inst_41407);
var inst_41381 = inst_41408;
var inst_41382 = inst_41407;
var inst_41383 = inst_41409;
var inst_41384 = (0);
var state_41449__$1 = (function (){var statearr_41532 = state_41449;
(statearr_41532[(13)] = inst_41381);

(statearr_41532[(14)] = inst_41382);

(statearr_41532[(15)] = inst_41383);

(statearr_41532[(16)] = inst_41384);

return statearr_41532;
})();
var statearr_41533_43132 = state_41449__$1;
(statearr_41533_43132[(2)] = null);

(statearr_41533_43132[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (10))){
var inst_41382 = (state_41449[(14)]);
var inst_41384 = (state_41449[(16)]);
var inst_41381 = (state_41449[(13)]);
var inst_41383 = (state_41449[(15)]);
var inst_41389 = cljs.core._nth(inst_41382,inst_41384);
var inst_41390 = cljs.core.async.muxch_STAR_(inst_41389);
var inst_41391 = cljs.core.async.close_BANG_(inst_41390);
var inst_41392 = (inst_41384 + (1));
var tmp41526 = inst_41382;
var tmp41527 = inst_41381;
var tmp41528 = inst_41383;
var inst_41381__$1 = tmp41527;
var inst_41382__$1 = tmp41526;
var inst_41383__$1 = tmp41528;
var inst_41384__$1 = inst_41392;
var state_41449__$1 = (function (){var statearr_41535 = state_41449;
(statearr_41535[(17)] = inst_41391);

(statearr_41535[(13)] = inst_41381__$1);

(statearr_41535[(14)] = inst_41382__$1);

(statearr_41535[(15)] = inst_41383__$1);

(statearr_41535[(16)] = inst_41384__$1);

return statearr_41535;
})();
var statearr_41537_43133 = state_41449__$1;
(statearr_41537_43133[(2)] = null);

(statearr_41537_43133[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (18))){
var inst_41419 = (state_41449[(2)]);
var state_41449__$1 = state_41449;
var statearr_41541_43134 = state_41449__$1;
(statearr_41541_43134[(2)] = inst_41419);

(statearr_41541_43134[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41450 === (8))){
var inst_41384 = (state_41449[(16)]);
var inst_41383 = (state_41449[(15)]);
var inst_41386 = (inst_41384 < inst_41383);
var inst_41387 = inst_41386;
var state_41449__$1 = state_41449;
if(cljs.core.truth_(inst_41387)){
var statearr_41542_43135 = state_41449__$1;
(statearr_41542_43135[(1)] = (10));

} else {
var statearr_41543_43136 = state_41449__$1;
(statearr_41543_43136[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38783__auto__ = null;
var cljs$core$async$state_machine__38783__auto____0 = (function (){
var statearr_41548 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41548[(0)] = cljs$core$async$state_machine__38783__auto__);

(statearr_41548[(1)] = (1));

return statearr_41548;
});
var cljs$core$async$state_machine__38783__auto____1 = (function (state_41449){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_41449);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e41549){var ex__38786__auto__ = e41549;
var statearr_41551_43137 = state_41449;
(statearr_41551_43137[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_41449[(4)]))){
var statearr_41554_43138 = state_41449;
(statearr_41554_43138[(1)] = cljs.core.first((state_41449[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43139 = state_41449;
state_41449 = G__43139;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$state_machine__38783__auto__ = function(state_41449){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38783__auto____1.call(this,state_41449);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38783__auto____0;
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38783__auto____1;
return cljs$core$async$state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_41557 = f__38936__auto__();
(statearr_41557[(6)] = c__38935__auto___43098);

return statearr_41557;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));


return p;
}));

(cljs.core.async.pub.cljs$lang$maxFixedArity = 3);

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__41565 = arguments.length;
switch (G__41565) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__41576 = arguments.length;
switch (G__41576) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_(p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_(p,topic);
}));

(cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__41584 = arguments.length;
switch (G__41584) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
if((cnt === (0))){
cljs.core.async.close_BANG_(out);
} else {
var c__38935__auto___43143 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_41646){
var state_val_41647 = (state_41646[(1)]);
if((state_val_41647 === (7))){
var state_41646__$1 = state_41646;
var statearr_41648_43144 = state_41646__$1;
(statearr_41648_43144[(2)] = null);

(statearr_41648_43144[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41647 === (1))){
var state_41646__$1 = state_41646;
var statearr_41649_43145 = state_41646__$1;
(statearr_41649_43145[(2)] = null);

(statearr_41649_43145[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41647 === (4))){
var inst_41600 = (state_41646[(7)]);
var inst_41598 = (state_41646[(8)]);
var inst_41602 = (inst_41600 < inst_41598);
var state_41646__$1 = state_41646;
if(cljs.core.truth_(inst_41602)){
var statearr_41650_43148 = state_41646__$1;
(statearr_41650_43148[(1)] = (6));

} else {
var statearr_41652_43149 = state_41646__$1;
(statearr_41652_43149[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41647 === (15))){
var inst_41631 = (state_41646[(9)]);
var inst_41636 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_41631);
var state_41646__$1 = state_41646;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41646__$1,(17),out,inst_41636);
} else {
if((state_val_41647 === (13))){
var inst_41631 = (state_41646[(9)]);
var inst_41631__$1 = (state_41646[(2)]);
var inst_41632 = cljs.core.some(cljs.core.nil_QMARK_,inst_41631__$1);
var state_41646__$1 = (function (){var statearr_41658 = state_41646;
(statearr_41658[(9)] = inst_41631__$1);

return statearr_41658;
})();
if(cljs.core.truth_(inst_41632)){
var statearr_41659_43150 = state_41646__$1;
(statearr_41659_43150[(1)] = (14));

} else {
var statearr_41660_43151 = state_41646__$1;
(statearr_41660_43151[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41647 === (6))){
var state_41646__$1 = state_41646;
var statearr_41661_43152 = state_41646__$1;
(statearr_41661_43152[(2)] = null);

(statearr_41661_43152[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41647 === (17))){
var inst_41638 = (state_41646[(2)]);
var state_41646__$1 = (function (){var statearr_41667 = state_41646;
(statearr_41667[(10)] = inst_41638);

return statearr_41667;
})();
var statearr_41668_43153 = state_41646__$1;
(statearr_41668_43153[(2)] = null);

(statearr_41668_43153[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41647 === (3))){
var inst_41643 = (state_41646[(2)]);
var state_41646__$1 = state_41646;
return cljs.core.async.impl.ioc_helpers.return_chan(state_41646__$1,inst_41643);
} else {
if((state_val_41647 === (12))){
var _ = (function (){var statearr_41671 = state_41646;
(statearr_41671[(4)] = cljs.core.rest((state_41646[(4)])));

return statearr_41671;
})();
var state_41646__$1 = state_41646;
var ex41665 = (state_41646__$1[(2)]);
var statearr_41672_43154 = state_41646__$1;
(statearr_41672_43154[(5)] = ex41665);


if((ex41665 instanceof Object)){
var statearr_41673_43156 = state_41646__$1;
(statearr_41673_43156[(1)] = (11));

(statearr_41673_43156[(5)] = null);

} else {
throw ex41665;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41647 === (2))){
var inst_41597 = cljs.core.reset_BANG_(dctr,cnt);
var inst_41598 = cnt;
var inst_41600 = (0);
var state_41646__$1 = (function (){var statearr_41674 = state_41646;
(statearr_41674[(11)] = inst_41597);

(statearr_41674[(8)] = inst_41598);

(statearr_41674[(7)] = inst_41600);

return statearr_41674;
})();
var statearr_41675_43158 = state_41646__$1;
(statearr_41675_43158[(2)] = null);

(statearr_41675_43158[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41647 === (11))){
var inst_41608 = (state_41646[(2)]);
var inst_41609 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_41646__$1 = (function (){var statearr_41678 = state_41646;
(statearr_41678[(12)] = inst_41608);

return statearr_41678;
})();
var statearr_41679_43159 = state_41646__$1;
(statearr_41679_43159[(2)] = inst_41609);

(statearr_41679_43159[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41647 === (9))){
var inst_41600 = (state_41646[(7)]);
var _ = (function (){var statearr_41681 = state_41646;
(statearr_41681[(4)] = cljs.core.cons((12),(state_41646[(4)])));

return statearr_41681;
})();
var inst_41617 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_41600) : chs__$1.call(null, inst_41600));
var inst_41618 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_41600) : done.call(null, inst_41600));
var inst_41619 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_41617,inst_41618);
var ___$1 = (function (){var statearr_41682 = state_41646;
(statearr_41682[(4)] = cljs.core.rest((state_41646[(4)])));

return statearr_41682;
})();
var state_41646__$1 = state_41646;
var statearr_41683_43160 = state_41646__$1;
(statearr_41683_43160[(2)] = inst_41619);

(statearr_41683_43160[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41647 === (5))){
var inst_41629 = (state_41646[(2)]);
var state_41646__$1 = (function (){var statearr_41685 = state_41646;
(statearr_41685[(13)] = inst_41629);

return statearr_41685;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_41646__$1,(13),dchan);
} else {
if((state_val_41647 === (14))){
var inst_41634 = cljs.core.async.close_BANG_(out);
var state_41646__$1 = state_41646;
var statearr_41686_43161 = state_41646__$1;
(statearr_41686_43161[(2)] = inst_41634);

(statearr_41686_43161[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41647 === (16))){
var inst_41641 = (state_41646[(2)]);
var state_41646__$1 = state_41646;
var statearr_41688_43162 = state_41646__$1;
(statearr_41688_43162[(2)] = inst_41641);

(statearr_41688_43162[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41647 === (10))){
var inst_41600 = (state_41646[(7)]);
var inst_41622 = (state_41646[(2)]);
var inst_41623 = (inst_41600 + (1));
var inst_41600__$1 = inst_41623;
var state_41646__$1 = (function (){var statearr_41689 = state_41646;
(statearr_41689[(14)] = inst_41622);

(statearr_41689[(7)] = inst_41600__$1);

return statearr_41689;
})();
var statearr_41690_43165 = state_41646__$1;
(statearr_41690_43165[(2)] = null);

(statearr_41690_43165[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41647 === (8))){
var inst_41627 = (state_41646[(2)]);
var state_41646__$1 = state_41646;
var statearr_41691_43166 = state_41646__$1;
(statearr_41691_43166[(2)] = inst_41627);

(statearr_41691_43166[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38783__auto__ = null;
var cljs$core$async$state_machine__38783__auto____0 = (function (){
var statearr_41693 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41693[(0)] = cljs$core$async$state_machine__38783__auto__);

(statearr_41693[(1)] = (1));

return statearr_41693;
});
var cljs$core$async$state_machine__38783__auto____1 = (function (state_41646){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_41646);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e41694){var ex__38786__auto__ = e41694;
var statearr_41695_43169 = state_41646;
(statearr_41695_43169[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_41646[(4)]))){
var statearr_41696_43170 = state_41646;
(statearr_41696_43170[(1)] = cljs.core.first((state_41646[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43171 = state_41646;
state_41646 = G__43171;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$state_machine__38783__auto__ = function(state_41646){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38783__auto____1.call(this,state_41646);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38783__auto____0;
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38783__auto____1;
return cljs$core$async$state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_41701 = f__38936__auto__();
(statearr_41701[(6)] = c__38935__auto___43143);

return statearr_41701;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));

}

return out;
}));

(cljs.core.async.map.cljs$lang$maxFixedArity = 3);

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__41704 = arguments.length;
switch (G__41704) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__38935__auto___43175 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_41739){
var state_val_41740 = (state_41739[(1)]);
if((state_val_41740 === (7))){
var inst_41716 = (state_41739[(7)]);
var inst_41717 = (state_41739[(8)]);
var inst_41716__$1 = (state_41739[(2)]);
var inst_41717__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_41716__$1,(0),null);
var inst_41718 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_41716__$1,(1),null);
var inst_41719 = (inst_41717__$1 == null);
var state_41739__$1 = (function (){var statearr_41742 = state_41739;
(statearr_41742[(7)] = inst_41716__$1);

(statearr_41742[(8)] = inst_41717__$1);

(statearr_41742[(9)] = inst_41718);

return statearr_41742;
})();
if(cljs.core.truth_(inst_41719)){
var statearr_41743_43176 = state_41739__$1;
(statearr_41743_43176[(1)] = (8));

} else {
var statearr_41744_43177 = state_41739__$1;
(statearr_41744_43177[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41740 === (1))){
var inst_41706 = cljs.core.vec(chs);
var inst_41707 = inst_41706;
var state_41739__$1 = (function (){var statearr_41745 = state_41739;
(statearr_41745[(10)] = inst_41707);

return statearr_41745;
})();
var statearr_41746_43178 = state_41739__$1;
(statearr_41746_43178[(2)] = null);

(statearr_41746_43178[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41740 === (4))){
var inst_41707 = (state_41739[(10)]);
var state_41739__$1 = state_41739;
return cljs.core.async.ioc_alts_BANG_(state_41739__$1,(7),inst_41707);
} else {
if((state_val_41740 === (6))){
var inst_41734 = (state_41739[(2)]);
var state_41739__$1 = state_41739;
var statearr_41748_43180 = state_41739__$1;
(statearr_41748_43180[(2)] = inst_41734);

(statearr_41748_43180[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41740 === (3))){
var inst_41736 = (state_41739[(2)]);
var state_41739__$1 = state_41739;
return cljs.core.async.impl.ioc_helpers.return_chan(state_41739__$1,inst_41736);
} else {
if((state_val_41740 === (2))){
var inst_41707 = (state_41739[(10)]);
var inst_41709 = cljs.core.count(inst_41707);
var inst_41710 = (inst_41709 > (0));
var state_41739__$1 = state_41739;
if(cljs.core.truth_(inst_41710)){
var statearr_41750_43181 = state_41739__$1;
(statearr_41750_43181[(1)] = (4));

} else {
var statearr_41751_43182 = state_41739__$1;
(statearr_41751_43182[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41740 === (11))){
var inst_41707 = (state_41739[(10)]);
var inst_41727 = (state_41739[(2)]);
var tmp41749 = inst_41707;
var inst_41707__$1 = tmp41749;
var state_41739__$1 = (function (){var statearr_41752 = state_41739;
(statearr_41752[(11)] = inst_41727);

(statearr_41752[(10)] = inst_41707__$1);

return statearr_41752;
})();
var statearr_41753_43184 = state_41739__$1;
(statearr_41753_43184[(2)] = null);

(statearr_41753_43184[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41740 === (9))){
var inst_41717 = (state_41739[(8)]);
var state_41739__$1 = state_41739;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41739__$1,(11),out,inst_41717);
} else {
if((state_val_41740 === (5))){
var inst_41732 = cljs.core.async.close_BANG_(out);
var state_41739__$1 = state_41739;
var statearr_41754_43185 = state_41739__$1;
(statearr_41754_43185[(2)] = inst_41732);

(statearr_41754_43185[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41740 === (10))){
var inst_41730 = (state_41739[(2)]);
var state_41739__$1 = state_41739;
var statearr_41755_43186 = state_41739__$1;
(statearr_41755_43186[(2)] = inst_41730);

(statearr_41755_43186[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41740 === (8))){
var inst_41707 = (state_41739[(10)]);
var inst_41716 = (state_41739[(7)]);
var inst_41717 = (state_41739[(8)]);
var inst_41718 = (state_41739[(9)]);
var inst_41722 = (function (){var cs = inst_41707;
var vec__41712 = inst_41716;
var v = inst_41717;
var c = inst_41718;
return (function (p1__41702_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__41702_SHARP_);
});
})();
var inst_41723 = cljs.core.filterv(inst_41722,inst_41707);
var inst_41707__$1 = inst_41723;
var state_41739__$1 = (function (){var statearr_41756 = state_41739;
(statearr_41756[(10)] = inst_41707__$1);

return statearr_41756;
})();
var statearr_41757_43187 = state_41739__$1;
(statearr_41757_43187[(2)] = null);

(statearr_41757_43187[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38783__auto__ = null;
var cljs$core$async$state_machine__38783__auto____0 = (function (){
var statearr_41758 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41758[(0)] = cljs$core$async$state_machine__38783__auto__);

(statearr_41758[(1)] = (1));

return statearr_41758;
});
var cljs$core$async$state_machine__38783__auto____1 = (function (state_41739){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_41739);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e41761){var ex__38786__auto__ = e41761;
var statearr_41762_43188 = state_41739;
(statearr_41762_43188[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_41739[(4)]))){
var statearr_41763_43189 = state_41739;
(statearr_41763_43189[(1)] = cljs.core.first((state_41739[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43190 = state_41739;
state_41739 = G__43190;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$state_machine__38783__auto__ = function(state_41739){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38783__auto____1.call(this,state_41739);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38783__auto____0;
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38783__auto____1;
return cljs$core$async$state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_41764 = f__38936__auto__();
(statearr_41764[(6)] = c__38935__auto___43175);

return statearr_41764;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));


return out;
}));

(cljs.core.async.merge.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__41766 = arguments.length;
switch (G__41766) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__38935__auto___43194 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_41791){
var state_val_41792 = (state_41791[(1)]);
if((state_val_41792 === (7))){
var inst_41773 = (state_41791[(7)]);
var inst_41773__$1 = (state_41791[(2)]);
var inst_41774 = (inst_41773__$1 == null);
var inst_41775 = cljs.core.not(inst_41774);
var state_41791__$1 = (function (){var statearr_41793 = state_41791;
(statearr_41793[(7)] = inst_41773__$1);

return statearr_41793;
})();
if(inst_41775){
var statearr_41794_43196 = state_41791__$1;
(statearr_41794_43196[(1)] = (8));

} else {
var statearr_41795_43197 = state_41791__$1;
(statearr_41795_43197[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41792 === (1))){
var inst_41768 = (0);
var state_41791__$1 = (function (){var statearr_41797 = state_41791;
(statearr_41797[(8)] = inst_41768);

return statearr_41797;
})();
var statearr_41798_43198 = state_41791__$1;
(statearr_41798_43198[(2)] = null);

(statearr_41798_43198[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41792 === (4))){
var state_41791__$1 = state_41791;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_41791__$1,(7),ch);
} else {
if((state_val_41792 === (6))){
var inst_41786 = (state_41791[(2)]);
var state_41791__$1 = state_41791;
var statearr_41799_43200 = state_41791__$1;
(statearr_41799_43200[(2)] = inst_41786);

(statearr_41799_43200[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41792 === (3))){
var inst_41788 = (state_41791[(2)]);
var inst_41789 = cljs.core.async.close_BANG_(out);
var state_41791__$1 = (function (){var statearr_41800 = state_41791;
(statearr_41800[(9)] = inst_41788);

return statearr_41800;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_41791__$1,inst_41789);
} else {
if((state_val_41792 === (2))){
var inst_41768 = (state_41791[(8)]);
var inst_41770 = (inst_41768 < n);
var state_41791__$1 = state_41791;
if(cljs.core.truth_(inst_41770)){
var statearr_41803_43202 = state_41791__$1;
(statearr_41803_43202[(1)] = (4));

} else {
var statearr_41804_43203 = state_41791__$1;
(statearr_41804_43203[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41792 === (11))){
var inst_41768 = (state_41791[(8)]);
var inst_41778 = (state_41791[(2)]);
var inst_41779 = (inst_41768 + (1));
var inst_41768__$1 = inst_41779;
var state_41791__$1 = (function (){var statearr_41805 = state_41791;
(statearr_41805[(10)] = inst_41778);

(statearr_41805[(8)] = inst_41768__$1);

return statearr_41805;
})();
var statearr_41806_43204 = state_41791__$1;
(statearr_41806_43204[(2)] = null);

(statearr_41806_43204[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41792 === (9))){
var state_41791__$1 = state_41791;
var statearr_41807_43206 = state_41791__$1;
(statearr_41807_43206[(2)] = null);

(statearr_41807_43206[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41792 === (5))){
var state_41791__$1 = state_41791;
var statearr_41808_43209 = state_41791__$1;
(statearr_41808_43209[(2)] = null);

(statearr_41808_43209[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41792 === (10))){
var inst_41783 = (state_41791[(2)]);
var state_41791__$1 = state_41791;
var statearr_41810_43211 = state_41791__$1;
(statearr_41810_43211[(2)] = inst_41783);

(statearr_41810_43211[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41792 === (8))){
var inst_41773 = (state_41791[(7)]);
var state_41791__$1 = state_41791;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41791__$1,(11),out,inst_41773);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38783__auto__ = null;
var cljs$core$async$state_machine__38783__auto____0 = (function (){
var statearr_41813 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_41813[(0)] = cljs$core$async$state_machine__38783__auto__);

(statearr_41813[(1)] = (1));

return statearr_41813;
});
var cljs$core$async$state_machine__38783__auto____1 = (function (state_41791){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_41791);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e41814){var ex__38786__auto__ = e41814;
var statearr_41815_43212 = state_41791;
(statearr_41815_43212[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_41791[(4)]))){
var statearr_41816_43213 = state_41791;
(statearr_41816_43213[(1)] = cljs.core.first((state_41791[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43215 = state_41791;
state_41791 = G__43215;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$state_machine__38783__auto__ = function(state_41791){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38783__auto____1.call(this,state_41791);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38783__auto____0;
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38783__auto____1;
return cljs$core$async$state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_41817 = f__38936__auto__();
(statearr_41817[(6)] = c__38935__auto___43194);

return statearr_41817;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);


/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async41828 = (function (f,ch,meta41824,_,fn1,meta41829){
this.f = f;
this.ch = ch;
this.meta41824 = meta41824;
this._ = _;
this.fn1 = fn1;
this.meta41829 = meta41829;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async41828.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_41830,meta41829__$1){
var self__ = this;
var _41830__$1 = this;
return (new cljs.core.async.t_cljs$core$async41828(self__.f,self__.ch,self__.meta41824,self__._,self__.fn1,meta41829__$1));
}));

(cljs.core.async.t_cljs$core$async41828.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_41830){
var self__ = this;
var _41830__$1 = this;
return self__.meta41829;
}));

(cljs.core.async.t_cljs$core$async41828.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41828.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async41828.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async41828.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__41819_SHARP_){
var G__41831 = (((p1__41819_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__41819_SHARP_) : self__.f.call(null, p1__41819_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__41831) : f1.call(null, G__41831));
});
}));

(cljs.core.async.t_cljs$core$async41828.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta41824","meta41824",-1273037715,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async41823","cljs.core.async/t_cljs$core$async41823",617211763,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta41829","meta41829",1788642683,null)], null);
}));

(cljs.core.async.t_cljs$core$async41828.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async41828.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async41828");

(cljs.core.async.t_cljs$core$async41828.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async41828");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async41828.
 */
cljs.core.async.__GT_t_cljs$core$async41828 = (function cljs$core$async$__GT_t_cljs$core$async41828(f,ch,meta41824,_,fn1,meta41829){
return (new cljs.core.async.t_cljs$core$async41828(f,ch,meta41824,_,fn1,meta41829));
});



/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async41823 = (function (f,ch,meta41824){
this.f = f;
this.ch = ch;
this.meta41824 = meta41824;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async41823.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_41825,meta41824__$1){
var self__ = this;
var _41825__$1 = this;
return (new cljs.core.async.t_cljs$core$async41823(self__.f,self__.ch,meta41824__$1));
}));

(cljs.core.async.t_cljs$core$async41823.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_41825){
var self__ = this;
var _41825__$1 = this;
return self__.meta41824;
}));

(cljs.core.async.t_cljs$core$async41823.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41823.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async41823.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async41823.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41823.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(new cljs.core.async.t_cljs$core$async41828(self__.f,self__.ch,self__.meta41824,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY)));
if(cljs.core.truth_((function (){var and__5000__auto__ = ret;
if(cljs.core.truth_(and__5000__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5000__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__41838 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__41838) : self__.f.call(null, G__41838));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async41823.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41823.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async41823.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta41824","meta41824",-1273037715,null)], null);
}));

(cljs.core.async.t_cljs$core$async41823.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async41823.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async41823");

(cljs.core.async.t_cljs$core$async41823.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async41823");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async41823.
 */
cljs.core.async.__GT_t_cljs$core$async41823 = (function cljs$core$async$__GT_t_cljs$core$async41823(f,ch,meta41824){
return (new cljs.core.async.t_cljs$core$async41823(f,ch,meta41824));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
return (new cljs.core.async.t_cljs$core$async41823(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async41839 = (function (f,ch,meta41840){
this.f = f;
this.ch = ch;
this.meta41840 = meta41840;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async41839.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_41841,meta41840__$1){
var self__ = this;
var _41841__$1 = this;
return (new cljs.core.async.t_cljs$core$async41839(self__.f,self__.ch,meta41840__$1));
}));

(cljs.core.async.t_cljs$core$async41839.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_41841){
var self__ = this;
var _41841__$1 = this;
return self__.meta41840;
}));

(cljs.core.async.t_cljs$core$async41839.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41839.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async41839.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41839.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async41839.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41839.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null, val)),fn1);
}));

(cljs.core.async.t_cljs$core$async41839.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta41840","meta41840",-1349580435,null)], null);
}));

(cljs.core.async.t_cljs$core$async41839.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async41839.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async41839");

(cljs.core.async.t_cljs$core$async41839.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async41839");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async41839.
 */
cljs.core.async.__GT_t_cljs$core$async41839 = (function cljs$core$async$__GT_t_cljs$core$async41839(f,ch,meta41840){
return (new cljs.core.async.t_cljs$core$async41839(f,ch,meta41840));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
return (new cljs.core.async.t_cljs$core$async41839(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async41854 = (function (p,ch,meta41855){
this.p = p;
this.ch = ch;
this.meta41855 = meta41855;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async41854.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_41856,meta41855__$1){
var self__ = this;
var _41856__$1 = this;
return (new cljs.core.async.t_cljs$core$async41854(self__.p,self__.ch,meta41855__$1));
}));

(cljs.core.async.t_cljs$core$async41854.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_41856){
var self__ = this;
var _41856__$1 = this;
return self__.meta41855;
}));

(cljs.core.async.t_cljs$core$async41854.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41854.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async41854.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async41854.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41854.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async41854.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41854.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null, val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async41854.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta41855","meta41855",-302219230,null)], null);
}));

(cljs.core.async.t_cljs$core$async41854.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async41854.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async41854");

(cljs.core.async.t_cljs$core$async41854.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async41854");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async41854.
 */
cljs.core.async.__GT_t_cljs$core$async41854 = (function cljs$core$async$__GT_t_cljs$core$async41854(p,ch,meta41855){
return (new cljs.core.async.t_cljs$core$async41854(p,ch,meta41855));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
return (new cljs.core.async.t_cljs$core$async41854(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__41864 = arguments.length;
switch (G__41864) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__38935__auto___43270 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_41887){
var state_val_41889 = (state_41887[(1)]);
if((state_val_41889 === (7))){
var inst_41883 = (state_41887[(2)]);
var state_41887__$1 = state_41887;
var statearr_41890_43272 = state_41887__$1;
(statearr_41890_43272[(2)] = inst_41883);

(statearr_41890_43272[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41889 === (1))){
var state_41887__$1 = state_41887;
var statearr_41891_43274 = state_41887__$1;
(statearr_41891_43274[(2)] = null);

(statearr_41891_43274[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41889 === (4))){
var inst_41869 = (state_41887[(7)]);
var inst_41869__$1 = (state_41887[(2)]);
var inst_41870 = (inst_41869__$1 == null);
var state_41887__$1 = (function (){var statearr_41892 = state_41887;
(statearr_41892[(7)] = inst_41869__$1);

return statearr_41892;
})();
if(cljs.core.truth_(inst_41870)){
var statearr_41893_43276 = state_41887__$1;
(statearr_41893_43276[(1)] = (5));

} else {
var statearr_41894_43277 = state_41887__$1;
(statearr_41894_43277[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41889 === (6))){
var inst_41869 = (state_41887[(7)]);
var inst_41874 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_41869) : p.call(null, inst_41869));
var state_41887__$1 = state_41887;
if(cljs.core.truth_(inst_41874)){
var statearr_41895_43278 = state_41887__$1;
(statearr_41895_43278[(1)] = (8));

} else {
var statearr_41896_43279 = state_41887__$1;
(statearr_41896_43279[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41889 === (3))){
var inst_41885 = (state_41887[(2)]);
var state_41887__$1 = state_41887;
return cljs.core.async.impl.ioc_helpers.return_chan(state_41887__$1,inst_41885);
} else {
if((state_val_41889 === (2))){
var state_41887__$1 = state_41887;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_41887__$1,(4),ch);
} else {
if((state_val_41889 === (11))){
var inst_41877 = (state_41887[(2)]);
var state_41887__$1 = state_41887;
var statearr_41897_43281 = state_41887__$1;
(statearr_41897_43281[(2)] = inst_41877);

(statearr_41897_43281[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41889 === (9))){
var state_41887__$1 = state_41887;
var statearr_41898_43282 = state_41887__$1;
(statearr_41898_43282[(2)] = null);

(statearr_41898_43282[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41889 === (5))){
var inst_41872 = cljs.core.async.close_BANG_(out);
var state_41887__$1 = state_41887;
var statearr_41900_43283 = state_41887__$1;
(statearr_41900_43283[(2)] = inst_41872);

(statearr_41900_43283[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41889 === (10))){
var inst_41880 = (state_41887[(2)]);
var state_41887__$1 = (function (){var statearr_41901 = state_41887;
(statearr_41901[(8)] = inst_41880);

return statearr_41901;
})();
var statearr_41905_43284 = state_41887__$1;
(statearr_41905_43284[(2)] = null);

(statearr_41905_43284[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41889 === (8))){
var inst_41869 = (state_41887[(7)]);
var state_41887__$1 = state_41887;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41887__$1,(11),out,inst_41869);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38783__auto__ = null;
var cljs$core$async$state_machine__38783__auto____0 = (function (){
var statearr_41918 = [null,null,null,null,null,null,null,null,null];
(statearr_41918[(0)] = cljs$core$async$state_machine__38783__auto__);

(statearr_41918[(1)] = (1));

return statearr_41918;
});
var cljs$core$async$state_machine__38783__auto____1 = (function (state_41887){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_41887);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e41922){var ex__38786__auto__ = e41922;
var statearr_41926_43285 = state_41887;
(statearr_41926_43285[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_41887[(4)]))){
var statearr_41931_43286 = state_41887;
(statearr_41931_43286[(1)] = cljs.core.first((state_41887[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43287 = state_41887;
state_41887 = G__43287;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$state_machine__38783__auto__ = function(state_41887){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38783__auto____1.call(this,state_41887);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38783__auto____0;
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38783__auto____1;
return cljs$core$async$state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_41938 = f__38936__auto__();
(statearr_41938[(6)] = c__38935__auto___43270);

return statearr_41938;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__41944 = arguments.length;
switch (G__41944) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__38935__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_42063){
var state_val_42064 = (state_42063[(1)]);
if((state_val_42064 === (7))){
var inst_42059 = (state_42063[(2)]);
var state_42063__$1 = state_42063;
var statearr_42065_43316 = state_42063__$1;
(statearr_42065_43316[(2)] = inst_42059);

(statearr_42065_43316[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (20))){
var inst_42028 = (state_42063[(7)]);
var inst_42039 = (state_42063[(2)]);
var inst_42040 = cljs.core.next(inst_42028);
var inst_41983 = inst_42040;
var inst_41984 = null;
var inst_41985 = (0);
var inst_41986 = (0);
var state_42063__$1 = (function (){var statearr_42066 = state_42063;
(statearr_42066[(8)] = inst_42039);

(statearr_42066[(9)] = inst_41983);

(statearr_42066[(10)] = inst_41984);

(statearr_42066[(11)] = inst_41985);

(statearr_42066[(12)] = inst_41986);

return statearr_42066;
})();
var statearr_42067_43331 = state_42063__$1;
(statearr_42067_43331[(2)] = null);

(statearr_42067_43331[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (1))){
var state_42063__$1 = state_42063;
var statearr_42068_43338 = state_42063__$1;
(statearr_42068_43338[(2)] = null);

(statearr_42068_43338[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (4))){
var inst_41971 = (state_42063[(13)]);
var inst_41971__$1 = (state_42063[(2)]);
var inst_41972 = (inst_41971__$1 == null);
var state_42063__$1 = (function (){var statearr_42070 = state_42063;
(statearr_42070[(13)] = inst_41971__$1);

return statearr_42070;
})();
if(cljs.core.truth_(inst_41972)){
var statearr_42072_43345 = state_42063__$1;
(statearr_42072_43345[(1)] = (5));

} else {
var statearr_42073_43350 = state_42063__$1;
(statearr_42073_43350[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (15))){
var state_42063__$1 = state_42063;
var statearr_42077_43356 = state_42063__$1;
(statearr_42077_43356[(2)] = null);

(statearr_42077_43356[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (21))){
var state_42063__$1 = state_42063;
var statearr_42078_43364 = state_42063__$1;
(statearr_42078_43364[(2)] = null);

(statearr_42078_43364[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (13))){
var inst_41986 = (state_42063[(12)]);
var inst_41983 = (state_42063[(9)]);
var inst_41984 = (state_42063[(10)]);
var inst_41985 = (state_42063[(11)]);
var inst_42016 = (state_42063[(2)]);
var inst_42019 = (inst_41986 + (1));
var tmp42074 = inst_41983;
var tmp42075 = inst_41985;
var tmp42076 = inst_41984;
var inst_41983__$1 = tmp42074;
var inst_41984__$1 = tmp42076;
var inst_41985__$1 = tmp42075;
var inst_41986__$1 = inst_42019;
var state_42063__$1 = (function (){var statearr_42083 = state_42063;
(statearr_42083[(14)] = inst_42016);

(statearr_42083[(9)] = inst_41983__$1);

(statearr_42083[(10)] = inst_41984__$1);

(statearr_42083[(11)] = inst_41985__$1);

(statearr_42083[(12)] = inst_41986__$1);

return statearr_42083;
})();
var statearr_42087_43379 = state_42063__$1;
(statearr_42087_43379[(2)] = null);

(statearr_42087_43379[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (22))){
var state_42063__$1 = state_42063;
var statearr_42088_43380 = state_42063__$1;
(statearr_42088_43380[(2)] = null);

(statearr_42088_43380[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (6))){
var inst_41971 = (state_42063[(13)]);
var inst_41981 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_41971) : f.call(null, inst_41971));
var inst_41982 = cljs.core.seq(inst_41981);
var inst_41983 = inst_41982;
var inst_41984 = null;
var inst_41985 = (0);
var inst_41986 = (0);
var state_42063__$1 = (function (){var statearr_42089 = state_42063;
(statearr_42089[(9)] = inst_41983);

(statearr_42089[(10)] = inst_41984);

(statearr_42089[(11)] = inst_41985);

(statearr_42089[(12)] = inst_41986);

return statearr_42089;
})();
var statearr_42090_43381 = state_42063__$1;
(statearr_42090_43381[(2)] = null);

(statearr_42090_43381[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (17))){
var inst_42028 = (state_42063[(7)]);
var inst_42032 = cljs.core.chunk_first(inst_42028);
var inst_42033 = cljs.core.chunk_rest(inst_42028);
var inst_42034 = cljs.core.count(inst_42032);
var inst_41983 = inst_42033;
var inst_41984 = inst_42032;
var inst_41985 = inst_42034;
var inst_41986 = (0);
var state_42063__$1 = (function (){var statearr_42092 = state_42063;
(statearr_42092[(9)] = inst_41983);

(statearr_42092[(10)] = inst_41984);

(statearr_42092[(11)] = inst_41985);

(statearr_42092[(12)] = inst_41986);

return statearr_42092;
})();
var statearr_42093_43386 = state_42063__$1;
(statearr_42093_43386[(2)] = null);

(statearr_42093_43386[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (3))){
var inst_42061 = (state_42063[(2)]);
var state_42063__$1 = state_42063;
return cljs.core.async.impl.ioc_helpers.return_chan(state_42063__$1,inst_42061);
} else {
if((state_val_42064 === (12))){
var inst_42049 = (state_42063[(2)]);
var state_42063__$1 = state_42063;
var statearr_42094_43397 = state_42063__$1;
(statearr_42094_43397[(2)] = inst_42049);

(statearr_42094_43397[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (2))){
var state_42063__$1 = state_42063;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_42063__$1,(4),in$);
} else {
if((state_val_42064 === (23))){
var inst_42057 = (state_42063[(2)]);
var state_42063__$1 = state_42063;
var statearr_42117_43399 = state_42063__$1;
(statearr_42117_43399[(2)] = inst_42057);

(statearr_42117_43399[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (19))){
var inst_42043 = (state_42063[(2)]);
var state_42063__$1 = state_42063;
var statearr_42118_43401 = state_42063__$1;
(statearr_42118_43401[(2)] = inst_42043);

(statearr_42118_43401[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (11))){
var inst_41983 = (state_42063[(9)]);
var inst_42028 = (state_42063[(7)]);
var inst_42028__$1 = cljs.core.seq(inst_41983);
var state_42063__$1 = (function (){var statearr_42122 = state_42063;
(statearr_42122[(7)] = inst_42028__$1);

return statearr_42122;
})();
if(inst_42028__$1){
var statearr_42124_43405 = state_42063__$1;
(statearr_42124_43405[(1)] = (14));

} else {
var statearr_42125_43406 = state_42063__$1;
(statearr_42125_43406[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (9))){
var inst_42051 = (state_42063[(2)]);
var inst_42052 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_42063__$1 = (function (){var statearr_42131 = state_42063;
(statearr_42131[(15)] = inst_42051);

return statearr_42131;
})();
if(cljs.core.truth_(inst_42052)){
var statearr_42133_43408 = state_42063__$1;
(statearr_42133_43408[(1)] = (21));

} else {
var statearr_42134_43409 = state_42063__$1;
(statearr_42134_43409[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (5))){
var inst_41974 = cljs.core.async.close_BANG_(out);
var state_42063__$1 = state_42063;
var statearr_42138_43410 = state_42063__$1;
(statearr_42138_43410[(2)] = inst_41974);

(statearr_42138_43410[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (14))){
var inst_42028 = (state_42063[(7)]);
var inst_42030 = cljs.core.chunked_seq_QMARK_(inst_42028);
var state_42063__$1 = state_42063;
if(inst_42030){
var statearr_42139_43412 = state_42063__$1;
(statearr_42139_43412[(1)] = (17));

} else {
var statearr_42143_43413 = state_42063__$1;
(statearr_42143_43413[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (16))){
var inst_42047 = (state_42063[(2)]);
var state_42063__$1 = state_42063;
var statearr_42144_43414 = state_42063__$1;
(statearr_42144_43414[(2)] = inst_42047);

(statearr_42144_43414[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42064 === (10))){
var inst_41984 = (state_42063[(10)]);
var inst_41986 = (state_42063[(12)]);
var inst_42014 = cljs.core._nth(inst_41984,inst_41986);
var state_42063__$1 = state_42063;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42063__$1,(13),out,inst_42014);
} else {
if((state_val_42064 === (18))){
var inst_42028 = (state_42063[(7)]);
var inst_42037 = cljs.core.first(inst_42028);
var state_42063__$1 = state_42063;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42063__$1,(20),out,inst_42037);
} else {
if((state_val_42064 === (8))){
var inst_41986 = (state_42063[(12)]);
var inst_41985 = (state_42063[(11)]);
var inst_41989 = (inst_41986 < inst_41985);
var inst_41990 = inst_41989;
var state_42063__$1 = state_42063;
if(cljs.core.truth_(inst_41990)){
var statearr_42145_43419 = state_42063__$1;
(statearr_42145_43419[(1)] = (10));

} else {
var statearr_42147_43420 = state_42063__$1;
(statearr_42147_43420[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__38783__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__38783__auto____0 = (function (){
var statearr_42149 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_42149[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__38783__auto__);

(statearr_42149[(1)] = (1));

return statearr_42149;
});
var cljs$core$async$mapcat_STAR__$_state_machine__38783__auto____1 = (function (state_42063){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_42063);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e42158){var ex__38786__auto__ = e42158;
var statearr_42162_43432 = state_42063;
(statearr_42162_43432[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_42063[(4)]))){
var statearr_42173_43435 = state_42063;
(statearr_42173_43435[(1)] = cljs.core.first((state_42063[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43441 = state_42063;
state_42063 = G__43441;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__38783__auto__ = function(state_42063){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__38783__auto____1.call(this,state_42063);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__38783__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__38783__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_42177 = f__38936__auto__();
(statearr_42177[(6)] = c__38935__auto__);

return statearr_42177;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));

return c__38935__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__42181 = arguments.length;
switch (G__42181) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__42195 = arguments.length;
switch (G__42195) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__42206 = arguments.length;
switch (G__42206) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__38935__auto___43489 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_42234){
var state_val_42235 = (state_42234[(1)]);
if((state_val_42235 === (7))){
var inst_42227 = (state_42234[(2)]);
var state_42234__$1 = state_42234;
var statearr_42239_43490 = state_42234__$1;
(statearr_42239_43490[(2)] = inst_42227);

(statearr_42239_43490[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42235 === (1))){
var inst_42208 = null;
var state_42234__$1 = (function (){var statearr_42241 = state_42234;
(statearr_42241[(7)] = inst_42208);

return statearr_42241;
})();
var statearr_42242_43491 = state_42234__$1;
(statearr_42242_43491[(2)] = null);

(statearr_42242_43491[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42235 === (4))){
var inst_42211 = (state_42234[(8)]);
var inst_42211__$1 = (state_42234[(2)]);
var inst_42213 = (inst_42211__$1 == null);
var inst_42214 = cljs.core.not(inst_42213);
var state_42234__$1 = (function (){var statearr_42245 = state_42234;
(statearr_42245[(8)] = inst_42211__$1);

return statearr_42245;
})();
if(inst_42214){
var statearr_42246_43493 = state_42234__$1;
(statearr_42246_43493[(1)] = (5));

} else {
var statearr_42247_43494 = state_42234__$1;
(statearr_42247_43494[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42235 === (6))){
var state_42234__$1 = state_42234;
var statearr_42248_43496 = state_42234__$1;
(statearr_42248_43496[(2)] = null);

(statearr_42248_43496[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42235 === (3))){
var inst_42229 = (state_42234[(2)]);
var inst_42230 = cljs.core.async.close_BANG_(out);
var state_42234__$1 = (function (){var statearr_42249 = state_42234;
(statearr_42249[(9)] = inst_42229);

return statearr_42249;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_42234__$1,inst_42230);
} else {
if((state_val_42235 === (2))){
var state_42234__$1 = state_42234;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_42234__$1,(4),ch);
} else {
if((state_val_42235 === (11))){
var inst_42211 = (state_42234[(8)]);
var inst_42221 = (state_42234[(2)]);
var inst_42208 = inst_42211;
var state_42234__$1 = (function (){var statearr_42250 = state_42234;
(statearr_42250[(10)] = inst_42221);

(statearr_42250[(7)] = inst_42208);

return statearr_42250;
})();
var statearr_42251_43501 = state_42234__$1;
(statearr_42251_43501[(2)] = null);

(statearr_42251_43501[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42235 === (9))){
var inst_42211 = (state_42234[(8)]);
var state_42234__$1 = state_42234;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42234__$1,(11),out,inst_42211);
} else {
if((state_val_42235 === (5))){
var inst_42211 = (state_42234[(8)]);
var inst_42208 = (state_42234[(7)]);
var inst_42216 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_42211,inst_42208);
var state_42234__$1 = state_42234;
if(inst_42216){
var statearr_42259_43504 = state_42234__$1;
(statearr_42259_43504[(1)] = (8));

} else {
var statearr_42260_43505 = state_42234__$1;
(statearr_42260_43505[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42235 === (10))){
var inst_42224 = (state_42234[(2)]);
var state_42234__$1 = state_42234;
var statearr_42261_43506 = state_42234__$1;
(statearr_42261_43506[(2)] = inst_42224);

(statearr_42261_43506[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42235 === (8))){
var inst_42208 = (state_42234[(7)]);
var tmp42255 = inst_42208;
var inst_42208__$1 = tmp42255;
var state_42234__$1 = (function (){var statearr_42266 = state_42234;
(statearr_42266[(7)] = inst_42208__$1);

return statearr_42266;
})();
var statearr_42267_43507 = state_42234__$1;
(statearr_42267_43507[(2)] = null);

(statearr_42267_43507[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38783__auto__ = null;
var cljs$core$async$state_machine__38783__auto____0 = (function (){
var statearr_42271 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_42271[(0)] = cljs$core$async$state_machine__38783__auto__);

(statearr_42271[(1)] = (1));

return statearr_42271;
});
var cljs$core$async$state_machine__38783__auto____1 = (function (state_42234){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_42234);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e42275){var ex__38786__auto__ = e42275;
var statearr_42276_43512 = state_42234;
(statearr_42276_43512[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_42234[(4)]))){
var statearr_42281_43513 = state_42234;
(statearr_42281_43513[(1)] = cljs.core.first((state_42234[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43514 = state_42234;
state_42234 = G__43514;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$state_machine__38783__auto__ = function(state_42234){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38783__auto____1.call(this,state_42234);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38783__auto____0;
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38783__auto____1;
return cljs$core$async$state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_42288 = f__38936__auto__();
(statearr_42288[(6)] = c__38935__auto___43489);

return statearr_42288;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__42290 = arguments.length;
switch (G__42290) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__38935__auto___43523 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_42336){
var state_val_42337 = (state_42336[(1)]);
if((state_val_42337 === (7))){
var inst_42332 = (state_42336[(2)]);
var state_42336__$1 = state_42336;
var statearr_42348_43524 = state_42336__$1;
(statearr_42348_43524[(2)] = inst_42332);

(statearr_42348_43524[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42337 === (1))){
var inst_42293 = (new Array(n));
var inst_42294 = inst_42293;
var inst_42295 = (0);
var state_42336__$1 = (function (){var statearr_42357 = state_42336;
(statearr_42357[(7)] = inst_42294);

(statearr_42357[(8)] = inst_42295);

return statearr_42357;
})();
var statearr_42358_43528 = state_42336__$1;
(statearr_42358_43528[(2)] = null);

(statearr_42358_43528[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42337 === (4))){
var inst_42302 = (state_42336[(9)]);
var inst_42302__$1 = (state_42336[(2)]);
var inst_42305 = (inst_42302__$1 == null);
var inst_42306 = cljs.core.not(inst_42305);
var state_42336__$1 = (function (){var statearr_42360 = state_42336;
(statearr_42360[(9)] = inst_42302__$1);

return statearr_42360;
})();
if(inst_42306){
var statearr_42362_43532 = state_42336__$1;
(statearr_42362_43532[(1)] = (5));

} else {
var statearr_42364_43533 = state_42336__$1;
(statearr_42364_43533[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42337 === (15))){
var inst_42326 = (state_42336[(2)]);
var state_42336__$1 = state_42336;
var statearr_42371_43535 = state_42336__$1;
(statearr_42371_43535[(2)] = inst_42326);

(statearr_42371_43535[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42337 === (13))){
var state_42336__$1 = state_42336;
var statearr_42372_43539 = state_42336__$1;
(statearr_42372_43539[(2)] = null);

(statearr_42372_43539[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42337 === (6))){
var inst_42295 = (state_42336[(8)]);
var inst_42322 = (inst_42295 > (0));
var state_42336__$1 = state_42336;
if(cljs.core.truth_(inst_42322)){
var statearr_42374_43540 = state_42336__$1;
(statearr_42374_43540[(1)] = (12));

} else {
var statearr_42378_43541 = state_42336__$1;
(statearr_42378_43541[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42337 === (3))){
var inst_42334 = (state_42336[(2)]);
var state_42336__$1 = state_42336;
return cljs.core.async.impl.ioc_helpers.return_chan(state_42336__$1,inst_42334);
} else {
if((state_val_42337 === (12))){
var inst_42294 = (state_42336[(7)]);
var inst_42324 = cljs.core.vec(inst_42294);
var state_42336__$1 = state_42336;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42336__$1,(15),out,inst_42324);
} else {
if((state_val_42337 === (2))){
var state_42336__$1 = state_42336;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_42336__$1,(4),ch);
} else {
if((state_val_42337 === (11))){
var inst_42316 = (state_42336[(2)]);
var inst_42317 = (new Array(n));
var inst_42294 = inst_42317;
var inst_42295 = (0);
var state_42336__$1 = (function (){var statearr_42394 = state_42336;
(statearr_42394[(10)] = inst_42316);

(statearr_42394[(7)] = inst_42294);

(statearr_42394[(8)] = inst_42295);

return statearr_42394;
})();
var statearr_42395_43554 = state_42336__$1;
(statearr_42395_43554[(2)] = null);

(statearr_42395_43554[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42337 === (9))){
var inst_42294 = (state_42336[(7)]);
var inst_42314 = cljs.core.vec(inst_42294);
var state_42336__$1 = state_42336;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42336__$1,(11),out,inst_42314);
} else {
if((state_val_42337 === (5))){
var inst_42294 = (state_42336[(7)]);
var inst_42295 = (state_42336[(8)]);
var inst_42302 = (state_42336[(9)]);
var inst_42309 = (state_42336[(11)]);
var inst_42308 = (inst_42294[inst_42295] = inst_42302);
var inst_42309__$1 = (inst_42295 + (1));
var inst_42310 = (inst_42309__$1 < n);
var state_42336__$1 = (function (){var statearr_42398 = state_42336;
(statearr_42398[(12)] = inst_42308);

(statearr_42398[(11)] = inst_42309__$1);

return statearr_42398;
})();
if(cljs.core.truth_(inst_42310)){
var statearr_42399_43561 = state_42336__$1;
(statearr_42399_43561[(1)] = (8));

} else {
var statearr_42400_43564 = state_42336__$1;
(statearr_42400_43564[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42337 === (14))){
var inst_42329 = (state_42336[(2)]);
var inst_42330 = cljs.core.async.close_BANG_(out);
var state_42336__$1 = (function (){var statearr_42404 = state_42336;
(statearr_42404[(13)] = inst_42329);

return statearr_42404;
})();
var statearr_42405_43565 = state_42336__$1;
(statearr_42405_43565[(2)] = inst_42330);

(statearr_42405_43565[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42337 === (10))){
var inst_42320 = (state_42336[(2)]);
var state_42336__$1 = state_42336;
var statearr_42406_43566 = state_42336__$1;
(statearr_42406_43566[(2)] = inst_42320);

(statearr_42406_43566[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42337 === (8))){
var inst_42294 = (state_42336[(7)]);
var inst_42309 = (state_42336[(11)]);
var tmp42401 = inst_42294;
var inst_42294__$1 = tmp42401;
var inst_42295 = inst_42309;
var state_42336__$1 = (function (){var statearr_42410 = state_42336;
(statearr_42410[(7)] = inst_42294__$1);

(statearr_42410[(8)] = inst_42295);

return statearr_42410;
})();
var statearr_42411_43567 = state_42336__$1;
(statearr_42411_43567[(2)] = null);

(statearr_42411_43567[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38783__auto__ = null;
var cljs$core$async$state_machine__38783__auto____0 = (function (){
var statearr_42413 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_42413[(0)] = cljs$core$async$state_machine__38783__auto__);

(statearr_42413[(1)] = (1));

return statearr_42413;
});
var cljs$core$async$state_machine__38783__auto____1 = (function (state_42336){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_42336);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e42414){var ex__38786__auto__ = e42414;
var statearr_42415_43569 = state_42336;
(statearr_42415_43569[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_42336[(4)]))){
var statearr_42416_43570 = state_42336;
(statearr_42416_43570[(1)] = cljs.core.first((state_42336[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43571 = state_42336;
state_42336 = G__43571;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$state_machine__38783__auto__ = function(state_42336){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38783__auto____1.call(this,state_42336);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38783__auto____0;
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38783__auto____1;
return cljs$core$async$state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_42423 = f__38936__auto__();
(statearr_42423[(6)] = c__38935__auto___43523);

return statearr_42423;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__42427 = arguments.length;
switch (G__42427) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__38935__auto___43573 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_42475){
var state_val_42476 = (state_42475[(1)]);
if((state_val_42476 === (7))){
var inst_42471 = (state_42475[(2)]);
var state_42475__$1 = state_42475;
var statearr_42480_43574 = state_42475__$1;
(statearr_42480_43574[(2)] = inst_42471);

(statearr_42480_43574[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42476 === (1))){
var inst_42428 = [];
var inst_42429 = inst_42428;
var inst_42430 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_42475__$1 = (function (){var statearr_42481 = state_42475;
(statearr_42481[(7)] = inst_42429);

(statearr_42481[(8)] = inst_42430);

return statearr_42481;
})();
var statearr_42482_43578 = state_42475__$1;
(statearr_42482_43578[(2)] = null);

(statearr_42482_43578[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42476 === (4))){
var inst_42433 = (state_42475[(9)]);
var inst_42433__$1 = (state_42475[(2)]);
var inst_42434 = (inst_42433__$1 == null);
var inst_42435 = cljs.core.not(inst_42434);
var state_42475__$1 = (function (){var statearr_42489 = state_42475;
(statearr_42489[(9)] = inst_42433__$1);

return statearr_42489;
})();
if(inst_42435){
var statearr_42490_43579 = state_42475__$1;
(statearr_42490_43579[(1)] = (5));

} else {
var statearr_42491_43580 = state_42475__$1;
(statearr_42491_43580[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42476 === (15))){
var inst_42429 = (state_42475[(7)]);
var inst_42463 = cljs.core.vec(inst_42429);
var state_42475__$1 = state_42475;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42475__$1,(18),out,inst_42463);
} else {
if((state_val_42476 === (13))){
var inst_42458 = (state_42475[(2)]);
var state_42475__$1 = state_42475;
var statearr_42495_43581 = state_42475__$1;
(statearr_42495_43581[(2)] = inst_42458);

(statearr_42495_43581[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42476 === (6))){
var inst_42429 = (state_42475[(7)]);
var inst_42460 = inst_42429.length;
var inst_42461 = (inst_42460 > (0));
var state_42475__$1 = state_42475;
if(cljs.core.truth_(inst_42461)){
var statearr_42497_43582 = state_42475__$1;
(statearr_42497_43582[(1)] = (15));

} else {
var statearr_42498_43583 = state_42475__$1;
(statearr_42498_43583[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42476 === (17))){
var inst_42468 = (state_42475[(2)]);
var inst_42469 = cljs.core.async.close_BANG_(out);
var state_42475__$1 = (function (){var statearr_42503 = state_42475;
(statearr_42503[(10)] = inst_42468);

return statearr_42503;
})();
var statearr_42504_43585 = state_42475__$1;
(statearr_42504_43585[(2)] = inst_42469);

(statearr_42504_43585[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42476 === (3))){
var inst_42473 = (state_42475[(2)]);
var state_42475__$1 = state_42475;
return cljs.core.async.impl.ioc_helpers.return_chan(state_42475__$1,inst_42473);
} else {
if((state_val_42476 === (12))){
var inst_42429 = (state_42475[(7)]);
var inst_42449 = cljs.core.vec(inst_42429);
var state_42475__$1 = state_42475;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42475__$1,(14),out,inst_42449);
} else {
if((state_val_42476 === (2))){
var state_42475__$1 = state_42475;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_42475__$1,(4),ch);
} else {
if((state_val_42476 === (11))){
var inst_42429 = (state_42475[(7)]);
var inst_42433 = (state_42475[(9)]);
var inst_42437 = (state_42475[(11)]);
var inst_42445 = inst_42429.push(inst_42433);
var tmp42506 = inst_42429;
var inst_42429__$1 = tmp42506;
var inst_42430 = inst_42437;
var state_42475__$1 = (function (){var statearr_42511 = state_42475;
(statearr_42511[(12)] = inst_42445);

(statearr_42511[(7)] = inst_42429__$1);

(statearr_42511[(8)] = inst_42430);

return statearr_42511;
})();
var statearr_42514_43589 = state_42475__$1;
(statearr_42514_43589[(2)] = null);

(statearr_42514_43589[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42476 === (9))){
var inst_42430 = (state_42475[(8)]);
var inst_42441 = cljs.core.keyword_identical_QMARK_(inst_42430,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_42475__$1 = state_42475;
var statearr_42515_43592 = state_42475__$1;
(statearr_42515_43592[(2)] = inst_42441);

(statearr_42515_43592[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42476 === (5))){
var inst_42433 = (state_42475[(9)]);
var inst_42437 = (state_42475[(11)]);
var inst_42430 = (state_42475[(8)]);
var inst_42438 = (state_42475[(13)]);
var inst_42437__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_42433) : f.call(null, inst_42433));
var inst_42438__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_42437__$1,inst_42430);
var state_42475__$1 = (function (){var statearr_42517 = state_42475;
(statearr_42517[(11)] = inst_42437__$1);

(statearr_42517[(13)] = inst_42438__$1);

return statearr_42517;
})();
if(inst_42438__$1){
var statearr_42518_43594 = state_42475__$1;
(statearr_42518_43594[(1)] = (8));

} else {
var statearr_42519_43595 = state_42475__$1;
(statearr_42519_43595[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42476 === (14))){
var inst_42433 = (state_42475[(9)]);
var inst_42437 = (state_42475[(11)]);
var inst_42451 = (state_42475[(2)]);
var inst_42453 = [];
var inst_42454 = inst_42453.push(inst_42433);
var inst_42429 = inst_42453;
var inst_42430 = inst_42437;
var state_42475__$1 = (function (){var statearr_42520 = state_42475;
(statearr_42520[(14)] = inst_42451);

(statearr_42520[(15)] = inst_42454);

(statearr_42520[(7)] = inst_42429);

(statearr_42520[(8)] = inst_42430);

return statearr_42520;
})();
var statearr_42521_43598 = state_42475__$1;
(statearr_42521_43598[(2)] = null);

(statearr_42521_43598[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42476 === (16))){
var state_42475__$1 = state_42475;
var statearr_42522_43599 = state_42475__$1;
(statearr_42522_43599[(2)] = null);

(statearr_42522_43599[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42476 === (10))){
var inst_42443 = (state_42475[(2)]);
var state_42475__$1 = state_42475;
if(cljs.core.truth_(inst_42443)){
var statearr_42523_43604 = state_42475__$1;
(statearr_42523_43604[(1)] = (11));

} else {
var statearr_42524_43605 = state_42475__$1;
(statearr_42524_43605[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42476 === (18))){
var inst_42465 = (state_42475[(2)]);
var state_42475__$1 = state_42475;
var statearr_42526_43607 = state_42475__$1;
(statearr_42526_43607[(2)] = inst_42465);

(statearr_42526_43607[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42476 === (8))){
var inst_42438 = (state_42475[(13)]);
var state_42475__$1 = state_42475;
var statearr_42528_43609 = state_42475__$1;
(statearr_42528_43609[(2)] = inst_42438);

(statearr_42528_43609[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38783__auto__ = null;
var cljs$core$async$state_machine__38783__auto____0 = (function (){
var statearr_42530 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_42530[(0)] = cljs$core$async$state_machine__38783__auto__);

(statearr_42530[(1)] = (1));

return statearr_42530;
});
var cljs$core$async$state_machine__38783__auto____1 = (function (state_42475){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_42475);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e42532){var ex__38786__auto__ = e42532;
var statearr_42533_43616 = state_42475;
(statearr_42533_43616[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_42475[(4)]))){
var statearr_42535_43617 = state_42475;
(statearr_42535_43617[(1)] = cljs.core.first((state_42475[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43620 = state_42475;
state_42475 = G__43620;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
cljs$core$async$state_machine__38783__auto__ = function(state_42475){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38783__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38783__auto____1.call(this,state_42475);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38783__auto____0;
cljs$core$async$state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38783__auto____1;
return cljs$core$async$state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_42537 = f__38936__auto__();
(statearr_42537[(6)] = c__38935__auto___43573);

return statearr_42537;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
