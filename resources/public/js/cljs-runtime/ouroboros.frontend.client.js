goog.provide('ouroboros.frontend.client');
/**
 * Shadow-cljs entry point
 */
ouroboros.frontend.client.init = (function ouroboros$frontend$client$init(){
com.fulcrologic.fulcro.application.set_root_BANG_(ouroboros.frontend.app.app,ouroboros.frontend.ui.root.Root,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"initialize-state?","initialize-state?",-189550519),true], null));

com.fulcrologic.fulcro.application.mount_BANG_.cljs$core$IFn$_invoke$arity$4(ouroboros.frontend.app.app,ouroboros.frontend.ui.root.Root,"app",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"initialize-state?","initialize-state?",-189550519),false], null));

requestAnimationFrame((function (){
com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.app.app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["dashboard"], null));

return console.log("Routing initialized to dashboard");
}));

ouroboros.frontend.app.init_websocket_BANG_();

return console.log("Ouroboros Dashboard initialized");
});
goog.exportSymbol('ouroboros.frontend.client.init', ouroboros.frontend.client.init);
/**
 * Hot reload callback
 */
ouroboros.frontend.client.refresh = (function ouroboros$frontend$client$refresh(){
com.fulcrologic.fulcro.application.mount_BANG_.cljs$core$IFn$_invoke$arity$4(ouroboros.frontend.app.app,ouroboros.frontend.ui.root.Root,"app",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"initialize-state?","initialize-state?",-189550519),false], null));

return console.log("Hot reload");
});
goog.exportSymbol('ouroboros.frontend.client.refresh', ouroboros.frontend.client.refresh);
/**
 * Cleanup on application stop
 */
ouroboros.frontend.client.stop = (function ouroboros$frontend$client$stop(){
ouroboros.frontend.app.destroy_websocket_BANG_();

return console.log("Ouroboros Dashboard stopped");
});
goog.exportSymbol('ouroboros.frontend.client.stop', ouroboros.frontend.client.stop);

//# sourceMappingURL=ouroboros.frontend.client.js.map
