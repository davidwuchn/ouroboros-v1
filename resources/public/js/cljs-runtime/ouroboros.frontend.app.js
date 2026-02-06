goog.provide('ouroboros.frontend.app');
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.app !== 'undefined') && (typeof ouroboros.frontend.app.app !== 'undefined')){
} else {
ouroboros.frontend.app.app = com.fulcrologic.fulcro.application.fulcro_app.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"remotes","remotes",1132366312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"remote","remote",-1593576576),com.fulcrologic.fulcro.networking.http_remote.fulcro_http_remote(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"url","url",276297046),"/api/eql"], null))], null),new cljs.core.Keyword(null,"global-error-action","global-error-action",-924822372),(function (env,error){
return console.error("Global error:",error);
})], null));
}
/**
 * Initialize WebSocket connection
 */
ouroboros.frontend.app.init_websocket_BANG_ = (function ouroboros$frontend$app$init_websocket_BANG_(){
return ouroboros.frontend.websocket.init_BANG_();
});
/**
 * Clean up WebSocket connection
 */
ouroboros.frontend.app.destroy_websocket_BANG_ = (function ouroboros$frontend$app$destroy_websocket_BANG_(){
return ouroboros.frontend.websocket.destroy_BANG_();
});
/**
 * Merge data into the app state
 */
ouroboros.frontend.app.merge_BANG_ = (function ouroboros$frontend$app$merge_BANG_(data){
return com.fulcrologic.fulcro.algorithms.merge.merge_BANG_(ouroboros.frontend.app.app,data);
});
/**
 * Load data via EQL query
 */
ouroboros.frontend.app.load_BANG_ = (function ouroboros$frontend$app$load_BANG_(var_args){
var G__41653 = arguments.length;
switch (G__41653) {
case 1:
return ouroboros.frontend.app.load_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ouroboros.frontend.app.load_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ouroboros.frontend.app.load_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (component){
var G__41672 = ouroboros.frontend.app.app;
var G__41673 = component;
var G__41674 = cljs.core.PersistentArrayMap.EMPTY;
return (com.fulcrologic.fulcro.application.load_BANG_.cljs$core$IFn$_invoke$arity$3 ? com.fulcrologic.fulcro.application.load_BANG_.cljs$core$IFn$_invoke$arity$3(G__41672,G__41673,G__41674) : com.fulcrologic.fulcro.application.load_BANG_.call(null, G__41672,G__41673,G__41674));
}));

(ouroboros.frontend.app.load_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (component,params){
return (com.fulcrologic.fulcro.application.load_BANG_.cljs$core$IFn$_invoke$arity$3 ? com.fulcrologic.fulcro.application.load_BANG_.cljs$core$IFn$_invoke$arity$3(ouroboros.frontend.app.app,component,params) : com.fulcrologic.fulcro.application.load_BANG_.call(null, ouroboros.frontend.app.app,component,params));
}));

(ouroboros.frontend.app.load_BANG_.cljs$lang$maxFixedArity = 2);


//# sourceMappingURL=ouroboros.frontend.app.js.map
