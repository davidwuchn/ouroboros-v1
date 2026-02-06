goog.provide('com.fulcrologic.fulcro.inspect.transit');

/**
* @constructor
*/
com.fulcrologic.fulcro.inspect.transit.ErrorHandler = (function (){
});
(com.fulcrologic.fulcro.inspect.transit.ErrorHandler.prototype.tag = (function (v){
var self__ = this;
var this$ = this;
return "js-error";
}));

(com.fulcrologic.fulcro.inspect.transit.ErrorHandler.prototype.rep = (function (v){
var self__ = this;
var this$ = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.ex_message(v),cljs.core.ex_data(v)], null);
}));

(com.fulcrologic.fulcro.inspect.transit.ErrorHandler.prototype.stringRep = (function (v){
var self__ = this;
var this$ = this;
return cljs.core.ex_message(v);
}));

(com.fulcrologic.fulcro.inspect.transit.ErrorHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
}));

(com.fulcrologic.fulcro.inspect.transit.ErrorHandler.cljs$lang$type = true);

(com.fulcrologic.fulcro.inspect.transit.ErrorHandler.cljs$lang$ctorStr = "com.fulcrologic.fulcro.inspect.transit/ErrorHandler");

(com.fulcrologic.fulcro.inspect.transit.ErrorHandler.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"com.fulcrologic.fulcro.inspect.transit/ErrorHandler");
}));

/**
 * Positional factory function for com.fulcrologic.fulcro.inspect.transit/ErrorHandler.
 */
com.fulcrologic.fulcro.inspect.transit.__GT_ErrorHandler = (function com$fulcrologic$fulcro$inspect$transit$__GT_ErrorHandler(){
return (new com.fulcrologic.fulcro.inspect.transit.ErrorHandler());
});


/**
* @constructor
*/
com.fulcrologic.fulcro.inspect.transit.DefaultHandler = (function (){
});
(com.fulcrologic.fulcro.inspect.transit.DefaultHandler.prototype.tag = (function (v){
var self__ = this;
var this$ = this;
return "unknown";
}));

(com.fulcrologic.fulcro.inspect.transit.DefaultHandler.prototype.rep = (function (v){
var self__ = this;
var this$ = this;
try{return cljs.core.str.cljs$core$IFn$_invoke$arity$1(v);
}catch (e45609){var e = e45609;
if(cljs.core.truth_(goog.DEBUG)){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.inspect.transit","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/inspect/transit.cljs",20,23,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Transit was unable to encode a value. See https://book.fulcrologic.com/#warn-transit-encode-failed"], null);
}),null)),null,(2),null,null,null);
} else {
}

return "UNENCODED VALUE";
}}));

(com.fulcrologic.fulcro.inspect.transit.DefaultHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
}));

(com.fulcrologic.fulcro.inspect.transit.DefaultHandler.cljs$lang$type = true);

(com.fulcrologic.fulcro.inspect.transit.DefaultHandler.cljs$lang$ctorStr = "com.fulcrologic.fulcro.inspect.transit/DefaultHandler");

(com.fulcrologic.fulcro.inspect.transit.DefaultHandler.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"com.fulcrologic.fulcro.inspect.transit/DefaultHandler");
}));

/**
 * Positional factory function for com.fulcrologic.fulcro.inspect.transit/DefaultHandler.
 */
com.fulcrologic.fulcro.inspect.transit.__GT_DefaultHandler = (function com$fulcrologic$fulcro$inspect$transit$__GT_DefaultHandler(){
return (new com.fulcrologic.fulcro.inspect.transit.DefaultHandler());
});

com.fulcrologic.fulcro.inspect.transit.write_handlers = (function com$fulcrologic$fulcro$inspect$transit$write_handlers(){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.PersistentArrayMap.createAsIfByAssoc([cljs.core.ExceptionInfo,(new com.fulcrologic.fulcro.inspect.transit.ErrorHandler()),"default",(new com.fulcrologic.fulcro.inspect.transit.DefaultHandler())]),com.fulcrologic.fulcro.algorithms.transit.write_handlers()], 0));
});
com.fulcrologic.fulcro.inspect.transit.read_handlers = (function com$fulcrologic$fulcro$inspect$transit$read_handlers(){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, ["js-error",(function (p__45639){
var vec__45640 = p__45639;
var msg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45640,(0),null);
var data = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45640,(1),null);
return cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(msg,data);
})], null),com.fulcrologic.fulcro.algorithms.transit.read_handlers()], 0));
});
com.fulcrologic.fulcro.inspect.transit.read = (function com$fulcrologic$fulcro$inspect$transit$read(str){
var reader = com.fulcrologic.fulcro.algorithms.transit.reader.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"handlers","handlers",79528781),com.fulcrologic.fulcro.inspect.transit.read_handlers()], null));
return cognitect.transit.read(reader,str);
});
com.fulcrologic.fulcro.inspect.transit.write = (function com$fulcrologic$fulcro$inspect$transit$write(x){
var writer = com.fulcrologic.fulcro.algorithms.transit.writer.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"handlers","handlers",79528781),com.fulcrologic.fulcro.inspect.transit.write_handlers()], null));
return cognitect.transit.write(writer,x);
});
(com.cognitect.transit.types.UUID.prototype.cljs$core$IUUID$ = cljs.core.PROTOCOL_SENTINEL);

//# sourceMappingURL=com.fulcrologic.fulcro.inspect.transit.js.map
