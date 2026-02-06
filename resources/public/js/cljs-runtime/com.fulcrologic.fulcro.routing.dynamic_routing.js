goog.provide('com.fulcrologic.fulcro.routing.dynamic_routing');
goog.scope(function(){
  com.fulcrologic.fulcro.routing.dynamic_routing.goog$module$shadow$loader = goog.module.get('shadow.loader');
  com.fulcrologic.fulcro.routing.dynamic_routing.goog$module$goog$object = goog.module.get('goog.object');
});
/**
 * INTERNAL USE ONLY. Not guaranteed to be available at runtime in production builds. This is used to aid in giving
 * development-time warnings/errors.
 * 
 * Class of the routing target component, available in the notifications fns
 * (:will-enter, :route-cancelled, :will-leave)
 */
com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_ = null;
/**
 * Returns a vector that describes the sub-path that a given route target represents. String elements represent
 *   explicit path elements, and keywords represent variable values (which are always pulled as strings).
 */
com.fulcrologic.fulcro.routing.dynamic_routing.route_segment = (function com$fulcrologic$fulcro$routing$dynamic_routing$route_segment(class$){
var result = com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(class$,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"route-segment","route-segment",1812935886)], 0));
if(cljs.core.truth_((function (){var and__5000__auto__ = goog.DEBUG;
if(cljs.core.truth_(and__5000__auto__)){
return (!((((result == null)) || (cljs.core.vector_QMARK_(result)))));
} else {
return and__5000__auto__;
}
})())){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",48,7,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Route segment should be a vector!"], null);
}),null)),null,(403),null,null,null);
} else {
}

return result;
});
/**
 * Returns the function that should be called if this target was in a deferred state and a different routing choice was made. Is given the same route parameters that were sent to `will-enter`.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.get_route_cancelled = (function com$fulcrologic$fulcro$routing$dynamic_routing$get_route_cancelled(class$){
return com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(class$,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"route-cancelled","route-cancelled",-1402397214)], 0));
});
/**
 * Universal CLJC version of route-cancelled.  Don't use the protocol method in CLJ.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.route_cancelled = (function com$fulcrologic$fulcro$routing$dynamic_routing$route_cancelled(class$,route_params){
var temp__5825__auto__ = com.fulcrologic.fulcro.routing.dynamic_routing.get_route_cancelled(class$);
if(cljs.core.truth_(temp__5825__auto__)){
var f = temp__5825__auto__;
var _STAR_target_class_STAR__orig_val__58779 = com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_;
var _STAR_target_class_STAR__temp_val__58780 = class$;
(com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_ = _STAR_target_class_STAR__temp_val__58780);

try{return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(route_params) : f.call(null, route_params));
}finally {(com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_ = _STAR_target_class_STAR__orig_val__58779);
}} else {
return null;
}
});
/**
 * Returns the function that is called before a route target is activated (if the route segment of interest has changed and the
 *   target of the result is this target).  MUST return (r/route-immediate ident) or (r/route-deferred ident) to indicate
 *   what ident should be used in app state to connect the router's join.  If deferred, the router must cause a call to
 *   the r/target-ready mutation (or use the target-ready* mutation helper) with a {:target ident} parameter to indicate
 *   that the route target is loaded and ready for display.
 * 
 *   `params` will be a map from any keywords found in `route-segment` to the string value of that path element.
 * 
 *   WARNING: This method MUST be side-effect free.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.get_will_enter = (function com$fulcrologic$fulcro$routing$dynamic_routing$get_will_enter(class$){
var temp__5823__auto__ = com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(class$,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"will-enter","will-enter",-692415624)], 0));
if(cljs.core.truth_(temp__5823__auto__)){
var will_enter = temp__5823__auto__;
return will_enter;
} else {
var ident = com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(class$,cljs.core.PersistentArrayMap.EMPTY);
if(cljs.core.truth_(ident)){
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",77,23,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Component must have an ident for routing to work properly:",com.fulcrologic.fulcro.raw.components.component_name(class$),"See https://book.fulcrologic.com/#err-dr-comp-needs-ident"], null);
}),null)),null,(404),null,null,null);
}

return (function (_,___$1){
return (com.fulcrologic.fulcro.routing.dynamic_routing.route_immediate.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.routing.dynamic_routing.route_immediate.cljs$core$IFn$_invoke$arity$1(ident) : com.fulcrologic.fulcro.routing.dynamic_routing.route_immediate.call(null, ident));
});
}
});
/**
 * Universal CLJC version of will-enter.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.will_enter = (function com$fulcrologic$fulcro$routing$dynamic_routing$will_enter(class$,app,params){
var temp__5825__auto__ = com.fulcrologic.fulcro.routing.dynamic_routing.get_will_enter(class$);
if(cljs.core.truth_(temp__5825__auto__)){
var will_enter = temp__5825__auto__;
var _STAR_target_class_STAR__orig_val__58781 = com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_;
var _STAR_target_class_STAR__temp_val__58782 = class$;
(com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_ = _STAR_target_class_STAR__temp_val__58782);

try{return (will_enter.cljs$core$IFn$_invoke$arity$2 ? will_enter.cljs$core$IFn$_invoke$arity$2(app,params) : will_enter.call(null, app,params));
}finally {(com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_ = _STAR_target_class_STAR__orig_val__58781);
}} else {
return null;
}
});
com.fulcrologic.fulcro.routing.dynamic_routing.route_target_QMARK_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$route_target_QMARK_(component){
return cljs.core.boolean$(com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(component,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"route-segment","route-segment",1812935886)], 0)));
});
/**
 * Returns the function of a route target to be called with
 *   the current component and props. If it returns `true` then the routing operation will continue.  If it returns `false`
 *   then whatever new route was requested will be completely abandoned. If this component has a `allow-route-change?`
 *   then the return value of will-leave will be ignored.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.get_will_leave = (function com$fulcrologic$fulcro$routing$dynamic_routing$get_will_leave(this$){
var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(this$,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"will-leave","will-leave",-1009838517)], 0));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.constantly(true);
}
});
com.fulcrologic.fulcro.routing.dynamic_routing.will_leave = (function com$fulcrologic$fulcro$routing$dynamic_routing$will_leave(c,props){
var temp__5825__auto__ = com.fulcrologic.fulcro.routing.dynamic_routing.get_will_leave(c);
if(cljs.core.truth_(temp__5825__auto__)){
var f = temp__5825__auto__;
var _STAR_target_class_STAR__orig_val__58783 = com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_;
var _STAR_target_class_STAR__temp_val__58784 = com.fulcrologic.fulcro.raw.components.isoget.cljs$core$IFn$_invoke$arity$2(c,new cljs.core.Keyword(null,"type","type",1174270348));
(com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_ = _STAR_target_class_STAR__temp_val__58784);

try{return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(c,props) : f.call(null, c,props));
}finally {(com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_ = _STAR_target_class_STAR__orig_val__58783);
}} else {
return null;
}
});
/**
 * Returns the function of a route target to be called with the current component and props.
 * If it returns `true` then the routing operation can continue.  If it returns `false`
 * then whatever new route was requested will be completely abandoned. This handler MUST NOT side-effect, and
 * may be called multiple times on a single route request.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.get_allow_route_change_QMARK_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$get_allow_route_change_QMARK_(this$){
var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(this$,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"allow-route-change?","allow-route-change?",173143289)], 0));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = (function (){var temp__5825__auto__ = com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(this$,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"will-leave","will-leave",-1009838517)], 0));
if(cljs.core.truth_(temp__5825__auto__)){
var will_leave = temp__5825__auto__;
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",111,7,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["DEPRECATED USE OF `:will-leave` to check for allowable routing. You should add :allow-route-change? to: ",com.fulcrologic.fulcro.raw.components.component_name(this$),"See https://book.fulcrologic.com/#warn-routing-will-leave-deprecated"], null);
}),null)),null,(405),null,null,null);

return (function (){
var G__58785 = this$;
var G__58786 = com.fulcrologic.fulcro.raw.components.props(this$);
return (will_leave.cljs$core$IFn$_invoke$arity$2 ? will_leave.cljs$core$IFn$_invoke$arity$2(G__58785,G__58786) : will_leave.call(null, G__58785,G__58786));
});
} else {
return null;
}
})();
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return cljs.core.constantly(true);
}
}
});
com.fulcrologic.fulcro.routing.dynamic_routing.allow_route_change_QMARK_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$allow_route_change_QMARK_(c){
try{var temp__5825__auto__ = com.fulcrologic.fulcro.routing.dynamic_routing.get_allow_route_change_QMARK_(c);
if(cljs.core.truth_(temp__5825__auto__)){
var f = temp__5825__auto__;
var _STAR_target_class_STAR__orig_val__58788 = com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_;
var _STAR_target_class_STAR__temp_val__58789 = com.fulcrologic.fulcro.raw.components.isoget.cljs$core$IFn$_invoke$arity$2(c,new cljs.core.Keyword(null,"type","type",1174270348));
(com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_ = _STAR_target_class_STAR__temp_val__58789);

try{return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(c) : f.call(null, c));
}finally {(com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_ = _STAR_target_class_STAR__orig_val__58788);
}} else {
return null;
}
}catch (e58787){var e = e58787;
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",121,7,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Cannot evaluate route change. Assuming ok. Exception message: ",cljs.core.ex_message(e),"See https://book.fulcrologic.com/#err-dr-cant-eval-route-chng"], null);
}),null)),null,(406),null,null,null);

return true;
}});
com.fulcrologic.fulcro.routing.dynamic_routing.route_lifecycle_QMARK_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$route_lifecycle_QMARK_(component){
return cljs.core.boolean$(com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(component,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"will-leave","will-leave",-1009838517)], 0)));
});
/**
 * Returns a set of classes to which this router routes, including dynamic ones if possible.
 * 
 * `router` - A router instance, class, or registry key, or ident.
 * `state-map` - The current app state
 * 
 * If `router` is a class or registry key you'll get the static list
 * from component options unless you also supply the state-map (it will attempt to use rc/*query-state* if it is bound). 
 */
com.fulcrologic.fulcro.routing.dynamic_routing.get_targets = (function com$fulcrologic$fulcro$routing$dynamic_routing$get_targets(var_args){
var G__58791 = arguments.length;
switch (G__58791) {
case 1:
return com.fulcrologic.fulcro.routing.dynamic_routing.get_targets.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.routing.dynamic_routing.get_targets.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.get_targets.cljs$core$IFn$_invoke$arity$1 = (function (router){
var sm = ((com.fulcrologic.fulcro.raw.components.component_instance_QMARK_(router))?com.fulcrologic.fulcro.application.current_state(router):(function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})());
return com.fulcrologic.fulcro.routing.dynamic_routing.get_targets.cljs$core$IFn$_invoke$arity$2(router,sm);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.get_targets.cljs$core$IFn$_invoke$arity$2 = (function (router,state_map){
var b2__30954__auto__ = ((com.fulcrologic.fulcro.raw.components.component_class_QMARK_(router))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [router,com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(router,cljs.core.PersistentArrayMap.EMPTY)], null):((com.fulcrologic.fulcro.raw.components.component_instance_QMARK_(router))?(function (){var p = com.fulcrologic.fulcro.raw.components.props(router);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [router,com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(router,(function (){var or__5002__auto__ = p;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})())], null);
})():((edn_query_language.core.ident_QMARK_(router))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.raw.components.registry_key__GT_class(cljs.core.second(router)),router], null):((com.fulcrologic.fulcro.raw.components.legal_registry_lookup_key_QMARK_(router))?(function (){var b2__30954__auto__ = (function (){var G__58792 = router;
if((G__58792 == null)){
return null;
} else {
return com.fulcrologic.fulcro.raw.components.registry_key__GT_class(G__58792);
}
})();
if(cljs.core.truth_(b2__30954__auto__)){
var cls = b2__30954__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cls,com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(cls,cljs.core.PersistentArrayMap.EMPTY)], null);
} else {
return null;
}
})():null))));
if(cljs.core.truth_(b2__30954__auto__)){
var vec__58793 = b2__30954__auto__;
var router__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58793,(0),null);
var router_ident = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58793,(1),null);
var b2__30954__auto____$1 = cljs.core.set(com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(router__$1,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"router-targets","router-targets",1582229763)], 0)));
if(cljs.core.truth_(b2__30954__auto____$1)){
var static_router_targets = b2__30954__auto____$1;
var b2__30954__auto____$2 = cljs.core.into.cljs$core$IFn$_invoke$arity$3(static_router_targets,cljs.core.keep.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.registry_key__GT_class),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(router_ident,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","dynamic-router-targets","com.fulcrologic.fulcro.routing.dynamic-routing/dynamic-router-targets",-786251636))));
if(cljs.core.truth_(b2__30954__auto____$2)){
var router_targets = b2__30954__auto____$2;
return router_targets;
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.get_targets.cljs$lang$maxFixedArity = 2);

com.fulcrologic.fulcro.routing.dynamic_routing.ident_matches_expectation_QMARK_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$ident_matches_expectation_QMARK_(p__58796,p__58797){
var vec__58798 = p__58796;
var expected_table = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58798,(0),null);
var maybe_expected_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58798,(1),null);
var vec__58801 = p__58797;
var table = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58801,(0),null);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58801,(1),null);
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(expected_table,table)) && ((((maybe_expected_id == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(maybe_expected_id,id)))));
});
com.fulcrologic.fulcro.routing.dynamic_routing.check_ident_matches_expectation_QMARK_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$check_ident_matches_expectation_QMARK_(fn_name,ident){
if(cljs.core.truth_((function (){var and__5000__auto__ = goog.DEBUG;
if(cljs.core.truth_(and__5000__auto__)){
var and__5000__auto____$1 = com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_;
if(cljs.core.truth_(and__5000__auto____$1)){
return (!(com.fulcrologic.fulcro.routing.dynamic_routing.ident_matches_expectation_QMARK_(com.fulcrologic.fulcro.raw.components.ident(com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_,cljs.core.PersistentArrayMap.EMPTY),ident)));
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
})())){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",164,5,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [fn_name," was invoked with the ident ",ident," which doesn't seem to match the ident of the wrapping component (class ",com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_," , ident [",cljs.core.first(com.fulcrologic.fulcro.raw.components.ident(com.fulcrologic.fulcro.routing.dynamic_routing._STAR_target_class_STAR_,cljs.core.PersistentArrayMap.EMPTY))," ...]) See https://book.fulcrologic.com/#err-dr-ident-mismatch"], null);
}),null)),null,(407),null,null,null);
} else {
return null;
}
});
/**
 * Used as a return value from `will-enter`. Instructs the routing system that you would like this target to be
 * routed to as soon as possible. UI switching defaults to depth-first to prevent flicker.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.route_immediate = (function com$fulcrologic$fulcro$routing$dynamic_routing$route_immediate(ident){
com.fulcrologic.fulcro.routing.dynamic_routing.check_ident_matches_expectation_QMARK_("route-immediate",ident);

return cljs.core.with_meta(ident,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"immediate","immediate",-1684692069),true], null));
});
/**
 * Used as a return value from `will-enter`. Instructs the router to run the `completion-fn`. The completion function
 * *must* use the mutation `target-ready` or function `target-ready!` to indicate when it is ready for the target to
 * appear on-screen.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.route_deferred = (function com$fulcrologic$fulcro$routing$dynamic_routing$route_deferred(ident,completion_fn){
com.fulcrologic.fulcro.routing.dynamic_routing.check_ident_matches_expectation_QMARK_("route-deferred",ident);

return cljs.core.with_meta(ident,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"immediate","immediate",-1684692069),false,new cljs.core.Keyword(null,"fn","fn",-1175266204),completion_fn], null));
});
com.fulcrologic.fulcro.routing.dynamic_routing.immediate_QMARK_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$immediate_QMARK_(ident){
var G__58804 = ident;
var G__58804__$1 = (((G__58804 == null))?null:cljs.core.meta(G__58804));
if((G__58804__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"immediate","immediate",-1684692069).cljs$core$IFn$_invoke$arity$1(G__58804__$1);
}
});
/**
 * Used as a return value from `will-enter`. Instructs the routing system to execute the `txn` in *routing path order*,
 * and optionally couples these operations into a single transaction. This can be used in cases where you need the
 * side-effects (potentially full-stack) to complete for a parent target before those of a nested target.
 * 
 * The `options` can contain:
 * 
 * * `:optimistic?`  (default false) - When true, don't wait for this transaction to (full-stack) complete before starting
 *   child target effects.
 * * `:route-immediate?` (default false) - When true, apply the UI routing immediately instead of waiting for the transaction
 *   to finish. Of course the UI of the target should then be willing to tolerate the lack of any full-stack result.
 * * `:show-early?` - (default false) - When true each transaction that completes will cause that target to appear. When
 *  false the target won't appear until after all children have completed their non-optimistic path-based transactions.
 *   
 */
com.fulcrologic.fulcro.routing.dynamic_routing.route_with_path_ordered_transaction = (function com$fulcrologic$fulcro$routing$dynamic_routing$route_with_path_ordered_transaction(var_args){
var G__58806 = arguments.length;
switch (G__58806) {
case 2:
return com.fulcrologic.fulcro.routing.dynamic_routing.route_with_path_ordered_transaction.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.routing.dynamic_routing.route_with_path_ordered_transaction.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.route_with_path_ordered_transaction.cljs$core$IFn$_invoke$arity$2 = (function (ident,txn){
return com.fulcrologic.fulcro.routing.dynamic_routing.route_with_path_ordered_transaction.cljs$core$IFn$_invoke$arity$3(ident,txn,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.route_with_path_ordered_transaction.cljs$core$IFn$_invoke$arity$3 = (function (ident,txn,p__58807){
var map__58808 = p__58807;
var map__58808__$1 = cljs.core.__destructure_map(map__58808);
var options = map__58808__$1;
var optimistic_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58808__$1,new cljs.core.Keyword(null,"optimistic?","optimistic?",1829830869));
var route_immediate_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58808__$1,new cljs.core.Keyword(null,"route-immediate?","route-immediate?",-681888697));
var optimistic_QMARK___$1 = (((!((optimistic_QMARK_ == null))))?optimistic_QMARK_:false);
var route_immediate_QMARK___$1 = (((!((route_immediate_QMARK_ == null))))?route_immediate_QMARK_:false);
return cljs.core.with_meta(ident,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"path-ordered?","path-ordered?",1510080295),true,new cljs.core.Keyword(null,"immediate","immediate",-1684692069),route_immediate_QMARK___$1,new cljs.core.Keyword(null,"txn","txn",-469204789),txn,new cljs.core.Keyword(null,"optimistic?","optimistic?",1829830869),optimistic_QMARK___$1], null));
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.route_with_path_ordered_transaction.cljs$lang$maxFixedArity = 3);

com.fulcrologic.fulcro.routing.dynamic_routing.apply_route_STAR_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$apply_route_STAR_(state_map,p__58809){
var map__58810 = p__58809;
var map__58810__$1 = cljs.core.__destructure_map(map__58810);
var router = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58810__$1,new cljs.core.Keyword(null,"router","router",1091916230));
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58810__$1,new cljs.core.Keyword(null,"target","target",253001721));
var router_class = new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(router));
var router_id = cljs.core.second(router);
var target_class = new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(target));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",213,5,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Applying route ident",target,"to router",router_id], null);
}),null)),null,(408),null,null,null);

if((router_class == null)){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",215,7,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["apply-route* was called without a proper :router argument. See https://book.fulcrologic.com/#err-dr-apply-route-lacks-router"], null);
}),null)),null,(409),null,null,null);
} else {
}

if((target_class == null)){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",217,7,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["apply-route* for router ",router_class,"was given a target that did not have a component. ","Did you remember to call route-deferred or route-immediate? See https://book.fulcrologic.com/#err-dr-apply-route-no-component"], null);
}),null)),null,(410),null,null,null);
} else {
}

return com.fulcrologic.fulcro.raw.components.set_query_STAR_(cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc_in(state_map,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(router,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871)),target),router,cljs.core.dissoc,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","pending-route","com.fulcrologic.fulcro.routing.dynamic-routing/pending-route",-1358888373)),router_class,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"query","query",-1288509510),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),router_id], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871),com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(target_class,state_map)], null)], null)], null));
});
com.fulcrologic.fulcro.routing.dynamic_routing.router_for_pending_target = (function com$fulcrologic$fulcro$routing$dynamic_routing$router_for_pending_target(state_map,target){
var routers = (function (){var G__58811 = state_map;
var G__58811__$1 = (((G__58811 == null))?null:new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961).cljs$core$IFn$_invoke$arity$1(G__58811));
if((G__58811__$1 == null)){
return null;
} else {
return cljs.core.vals(G__58811__$1);
}
})();
var router_id = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (_,r){
if(cljs.core.truth_((function (){var and__5000__auto__ = goog.DEBUG;
if(cljs.core.truth_(and__5000__auto__)){
return (new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961).cljs$core$IFn$_invoke$arity$1(r) == null);
} else {
return and__5000__auto__;
}
})())){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",228,31,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["There is a router in state that is missing an ID. This indicates that","you forgot to compose it into your initial state! It will fail to operate properly. See https://book.fulcrologic.com/#err-dr-router-missing-id"], null);
}),null)),null,(411),null,null,null);
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(target,(function (){var G__58812 = r;
var G__58812__$1 = (((G__58812 == null))?null:new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","pending-route","com.fulcrologic.fulcro.routing.dynamic-routing/pending-route",-1358888373).cljs$core$IFn$_invoke$arity$1(G__58812));
if((G__58812__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"target","target",253001721).cljs$core$IFn$_invoke$arity$1(G__58812__$1);
}
})())){
return cljs.core.reduced(new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961).cljs$core$IFn$_invoke$arity$1(r));
} else {
return null;
}
}),null,routers);
return router_id;
});
/**
 * Mutation: Indicate that a target is ready.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.target_ready = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","target-ready","com.fulcrologic.fulcro.routing.dynamic-routing/target-ready",-111862826,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","target-ready","com.fulcrologic.fulcro.routing.dynamic-routing/target-ready",-111862826,null),(function (fulcro_mutation_env_symbol){
var map__58813 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__58813__$1 = cljs.core.__destructure_map(map__58813);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58813__$1,new cljs.core.Keyword(null,"target","target",253001721));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"refresh","refresh",1947415525),(function com$fulcrologic$fulcro$routing$dynamic_routing$refresh(_){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871)], null);
}),new cljs.core.Keyword(null,"action","action",-811238024),(function com$fulcrologic$fulcro$routing$dynamic_routing$action(p__58814){
var map__58815 = p__58814;
var map__58815__$1 = cljs.core.__destructure_map(map__58815);
var app = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58815__$1,new cljs.core.Keyword(null,"app","app",-560961707));
var _STAR_after_render_STAR__orig_val__58816_59192 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__58817_59193 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__58817_59193);

try{var state_map_59197 = com.fulcrologic.fulcro.application.current_state(app);
var router_id_59199 = com.fulcrologic.fulcro.routing.dynamic_routing.router_for_pending_target(state_map_59197,target);
if(cljs.core.truth_(router_id_59199)){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",244,11,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Router",router_id_59199,"notified that pending route is ready."], null);
}),null)),null,(412),null,null,null);

if(cljs.core.truth_((function (){var and__5000__auto__ = goog.DEBUG;
if(cljs.core.truth_(and__5000__auto__)){
return (cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map_59197,target) == null);
} else {
return and__5000__auto__;
}
})())){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",246,13,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","target-ready","com.fulcrologic.fulcro.routing.dynamic-routing/target-ready",-111862826,null),"should route to",target,"but there is no data in the DB for the ident.","Perhaps you supplied a wrong ident? See https://book.fulcrologic.com/#err-dr-target-ready-missing-data"], null);
}),null)),null,(413),null,null,null);
} else {
}

com.fulcrologic.fulcro.ui_state_machines.trigger_BANG_.cljs$core$IFn$_invoke$arity$3(app,router_id_59199,new cljs.core.Keyword(null,"ready!","ready!",-1695278696));
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",249,9,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["dr/target-ready! was called but there was no router waiting for the target listed: ",target,"This could mean you sent one ident, and indicated ready on another. See https://book.fulcrologic.com/#err-dr-target-ready-no-router-waiting"], null);
}),null)),null,(414),null,null,null);
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__58816_59192);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__58818 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__58819 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__58819);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__58818);
}})], null);
}));
/**
 * Indicate a target is ready.  Safe to use from within mutations.
 * 
 *   target - The ident that was originally listed as a deferred target.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.target_ready_BANG_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$target_ready_BANG_(component_or_app,target){
return com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(component_or_app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__58820 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),target], null);
return (com.fulcrologic.fulcro.routing.dynamic_routing.target_ready.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.routing.dynamic_routing.target_ready.cljs$core$IFn$_invoke$arity$1(G__58820) : com.fulcrologic.fulcro.routing.dynamic_routing.target_ready.call(null, G__58820));
})()], null));
});
com.fulcrologic.fulcro.routing.dynamic_routing.router_QMARK_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$router_QMARK_(component){
return cljs.core.boolean$(com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(component,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"router-targets","router-targets",1582229763)], 0)));
});
/**
 * Returns the elements of actual-path that match the route-segment definition.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.matching_prefix = (function com$fulcrologic$fulcro$routing$dynamic_routing$matching_prefix(route_segment,actual_path){
var matching_segment = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (result,p__58821){
var vec__58822 = p__58821;
var expected = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58822,(0),null);
var actual = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58822,(1),null);
if(((typeof expected === 'string') && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(expected,actual)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(result,actual);
} else {
if((((expected instanceof cljs.core.Keyword)) && (cljs.core.seq(cljs.core.str.cljs$core$IFn$_invoke$arity$1(actual))))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(result,cljs.core.str.cljs$core$IFn$_invoke$arity$1(actual));
} else {
return result;

}
}
}),cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (a,b){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null);
}),route_segment,actual_path));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(matching_segment),cljs.core.count(route_segment))){
return matching_segment;
} else {
return null;
}
});
/**
 * Get the class of the component that is currently being routed to.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.current_route_class = (function com$fulcrologic$fulcro$routing$dynamic_routing$current_route_class(this$){
var state_map = com.fulcrologic.fulcro.application.current_state(com.fulcrologic.fulcro.raw.components.any__GT_app(this$));
var class$ = (function (){var G__58826 = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(this$,state_map);
var G__58826__$1 = (((G__58826 == null))?null:edn_query_language.core.query__GT_ast(G__58826));
var G__58826__$2 = (((G__58826__$1 == null))?null:new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(G__58826__$1));
var G__58826__$3 = (((G__58826__$2 == null))?null:cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__58825_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871),new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(p1__58825_SHARP_));
}),G__58826__$2));
var G__58826__$4 = (((G__58826__$3 == null))?null:cljs.core.first(G__58826__$3));
if((G__58826__$4 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1(G__58826__$4);
}
})();
var class$__$1 = (cljs.core.truth_(goog.DEBUG)?com.fulcrologic.fulcro.raw.components.registry_key__GT_class(com.fulcrologic.fulcro.raw.components.class__GT_registry_key(class$)):class$);
return class$__$1;
});
/**
 * Given a router class and a path segment, returns the class of *that router's* target that accepts the given URI path,
 *   which is a vector of (string) URI components. `state-map` is required if you want it to work with dynamic targets.
 * 
 *   Returns nil if there is no target that accepts the path, or a map containing:
 * 
 *   {:target class
 * :matching-prefix prefix}
 * 
 *   where `class` is the component class that accepts the path (the target, NOT the router), and `matching-prefix` is the
 *   portion of the path that is accepted by that class.
 * 
 *   NOTE: If more than one target matches, then the target with the longest match will be returned. A warning will be
 *   printed if more than one match of equal length is found.
 *   
 */
com.fulcrologic.fulcro.routing.dynamic_routing.route_target = (function com$fulcrologic$fulcro$routing$dynamic_routing$route_target(var_args){
var G__58829 = arguments.length;
switch (G__58829) {
case 2:
return com.fulcrologic.fulcro.routing.dynamic_routing.route_target.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.routing.dynamic_routing.route_target.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.route_target.cljs$core$IFn$_invoke$arity$2 = (function (router_class,path){
return com.fulcrologic.fulcro.routing.dynamic_routing.route_target.cljs$core$IFn$_invoke$arity$3(router_class,path,com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.route_target.cljs$core$IFn$_invoke$arity$3 = (function (router_class,path,state_map){
if(cljs.core.truth_((function (){var and__5000__auto__ = router_class;
if(cljs.core.truth_(and__5000__auto__)){
return com.fulcrologic.fulcro.routing.dynamic_routing.router_QMARK_(router_class);
} else {
return and__5000__auto__;
}
})())){
var targets = com.fulcrologic.fulcro.routing.dynamic_routing.get_targets.cljs$core$IFn$_invoke$arity$2(router_class,state_map);
var matches = cljs.core.reverse(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"length","length",588987862),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (result,target_class){
var prefix = (function (){var and__5000__auto__ = target_class;
if(cljs.core.truth_(and__5000__auto__)){
var and__5000__auto____$1 = com.fulcrologic.fulcro.routing.dynamic_routing.route_target_QMARK_(target_class);
if(and__5000__auto____$1){
var G__58830 = target_class;
var G__58830__$1 = (((G__58830 == null))?null:com.fulcrologic.fulcro.routing.dynamic_routing.route_segment(G__58830));
if((G__58830__$1 == null)){
return null;
} else {
return com.fulcrologic.fulcro.routing.dynamic_routing.matching_prefix(G__58830__$1,path);
}
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
})();
if(cljs.core.truth_((function (){var and__5000__auto__ = prefix;
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.seq(prefix);
} else {
return and__5000__auto__;
}
})())){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(result,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"length","length",588987862),cljs.core.count(prefix),new cljs.core.Keyword(null,"matching-prefix","matching-prefix",-539262173),prefix,new cljs.core.Keyword(null,"target","target",253001721),target_class], null));
} else {
return result;
}
}),cljs.core.PersistentVector.EMPTY,targets)));
var max_length = (function (){var G__58831 = matches;
var G__58831__$1 = (((G__58831 == null))?null:cljs.core.first(G__58831));
if((G__58831__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"length","length",588987862).cljs$core$IFn$_invoke$arity$1(G__58831__$1);
}
})();
var match = cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__58827_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(max_length,new cljs.core.Keyword(null,"length","length",588987862).cljs$core$IFn$_invoke$arity$1(p1__58827_SHARP_));
}),matches);
if(cljs.core.truth_(cljs.core.second(match))){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",324,10,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["More than one route target matches",path,"See https://book.fulcrologic.com/#warn-routing-multiple-target-matches"], null);
}),null)),null,(415),null,null,null);
} else {
}

return cljs.core.first(match);
} else {
return null;
}
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.route_target.cljs$lang$maxFixedArity = 3);

/**
 * Returns true if the given component is a router that manages a route target that will accept the given path.
 * Requires `state-map` to work on dynamically-added routes.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.accepts_route_QMARK_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$accepts_route_QMARK_(var_args){
var G__58833 = arguments.length;
switch (G__58833) {
case 2:
return com.fulcrologic.fulcro.routing.dynamic_routing.accepts_route_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.routing.dynamic_routing.accepts_route_QMARK_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.accepts_route_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (component,path){
return com.fulcrologic.fulcro.routing.dynamic_routing.accepts_route_QMARK_.cljs$core$IFn$_invoke$arity$3(component,path,com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.accepts_route_QMARK_.cljs$core$IFn$_invoke$arity$3 = (function (component,path,state_map){
return cljs.core.boolean$(com.fulcrologic.fulcro.routing.dynamic_routing.route_target.cljs$core$IFn$_invoke$arity$3(component,path,state_map));
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.accepts_route_QMARK_.cljs$lang$maxFixedArity = 3);

/**
 * Returns the AST node for a query that represents the router that has a target that can accept the given path. This is a breadth-first
 *   search.
 * 
 *   ast - A query AST node
 *   path - A vector of the current URI segments.
 *   state-map - Application state map, required for support of dynamically-added routes.
 * 
 *   Returns an AST node or nil if none is found.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_route = (function com$fulcrologic$fulcro$routing$dynamic_routing$ast_node_for_route(var_args){
var G__58837 = arguments.length;
switch (G__58837) {
case 2:
return com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_route.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_route.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_route.cljs$core$IFn$_invoke$arity$2 = (function (p__58838,path){
var map__58839 = p__58838;
var map__58839__$1 = cljs.core.__destructure_map(map__58839);
var ast_node = map__58839__$1;
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58839__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58839__$1,new cljs.core.Keyword(null,"children","children",-940561982));
return com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_route.cljs$core$IFn$_invoke$arity$3(ast_node,path,com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_route.cljs$core$IFn$_invoke$arity$3 = (function (p__58840,path,state_map){
var map__58841 = p__58840;
var map__58841__$1 = cljs.core.__destructure_map(map__58841);
var ast_node = map__58841__$1;
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58841__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58841__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var or__5002__auto__ = (function (){var and__5000__auto__ = com.fulcrologic.fulcro.routing.dynamic_routing.accepts_route_QMARK_.cljs$core$IFn$_invoke$arity$3(component,path,state_map);
if(and__5000__auto__){
return ast_node;
} else {
return and__5000__auto__;
}
})();
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = cljs.core.some((function (p1__58834_SHARP_){
var and__5000__auto__ = com.fulcrologic.fulcro.routing.dynamic_routing.accepts_route_QMARK_.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1(p1__58834_SHARP_),path,state_map);
if(and__5000__auto__){
return p1__58834_SHARP_;
} else {
return and__5000__auto__;
}
}),children);
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return cljs.core.some((function (p1__58835_SHARP_){
return com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_route.cljs$core$IFn$_invoke$arity$3(p1__58835_SHARP_,path,state_map);
}),children);
}
}
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_route.cljs$lang$maxFixedArity = 3);

/**
 * Returns the AST node for a query that represents the closest "live" (on-screen) router
 * 
 *   ast - A query AST node
 * 
 *   Returns an AST node or nil if none is found.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_live_router = (function com$fulcrologic$fulcro$routing$dynamic_routing$ast_node_for_live_router(app,p__58844){
var map__58845 = p__58844;
var map__58845__$1 = cljs.core.__destructure_map(map__58845);
var ast_node = map__58845__$1;
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58845__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58845__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var live_router_QMARK_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$ast_node_for_live_router_$_live_router_QMARK_(c){
return ((com.fulcrologic.fulcro.routing.dynamic_routing.router_QMARK_(c)) && (cljs.core.boolean$(com.fulcrologic.fulcro.components.class__GT_any(app,c))));
});
var or__5002__auto__ = (function (){var and__5000__auto__ = live_router_QMARK_(component);
if(cljs.core.truth_(and__5000__auto__)){
return ast_node;
} else {
return and__5000__auto__;
}
})();
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = cljs.core.some((function (p1__58842_SHARP_){
var and__5000__auto__ = live_router_QMARK_(new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1(p1__58842_SHARP_));
if(cljs.core.truth_(and__5000__auto__)){
return p1__58842_SHARP_;
} else {
return and__5000__auto__;
}
}),children);
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return cljs.core.some((function (p1__58843_SHARP_){
return (com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_live_router.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_live_router.cljs$core$IFn$_invoke$arity$2(app,p1__58843_SHARP_) : com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_live_router.call(null, app,p1__58843_SHARP_));
}),children);
}
}
});
/**
 * Mutation: Indicate that a given route is ready and should show the result.
 * 
 *   router - The ident of the router, with metadata :component that is the class of the router.
 *   target - The ident of the target route, with metadata :component that is the class of the target.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.apply_route = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","apply-route","com.fulcrologic.fulcro.routing.dynamic-routing/apply-route",-2135500172,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","apply-route","com.fulcrologic.fulcro.routing.dynamic-routing/apply-route",-2135500172,null),(function (fulcro_mutation_env_symbol){
var map__58846 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__58846__$1 = cljs.core.__destructure_map(map__58846);
var params = map__58846__$1;
var router = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58846__$1,new cljs.core.Keyword(null,"router","router",1091916230));
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58846__$1,new cljs.core.Keyword(null,"target","target",253001721));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function com$fulcrologic$fulcro$routing$dynamic_routing$action(p__58847){
var map__58848 = p__58847;
var map__58848__$1 = cljs.core.__destructure_map(map__58848);
var app = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58848__$1,new cljs.core.Keyword(null,"app","app",-560961707));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58848__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__58849_59317 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__58850_59318 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__58850_59318);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state,com.fulcrologic.fulcro.routing.dynamic_routing.apply_route_STAR_,params);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__58849_59317);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__58851 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__58852 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__58852);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__58851);
}})], null);
}));
com.fulcrologic.fulcro.routing.dynamic_routing.mark_route_pending_STAR_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$mark_route_pending_STAR_(state_map,p__58853){
var map__58854 = p__58853;
var map__58854__$1 = cljs.core.__destructure_map(map__58854);
var params = map__58854__$1;
var router = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58854__$1,new cljs.core.Keyword(null,"router","router",1091916230));
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58854__$1,new cljs.core.Keyword(null,"target","target",253001721));
return cljs.core.assoc_in(state_map,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(router,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","pending-route","com.fulcrologic.fulcro.routing.dynamic-routing/pending-route",-1358888373)),params);
});
var target_ready_STAR_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$target_ready_STAR_(state_map,target){
var router_id = com.fulcrologic.fulcro.routing.dynamic_routing.router_for_pending_target(state_map,target);
if(cljs.core.truth_(router_id)){
return com.fulcrologic.fulcro.routing.dynamic_routing.apply_route_STAR_(state_map,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961),router_id,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","pending-route","com.fulcrologic.fulcro.routing.dynamic-routing/pending-route",-1358888373)], null)));
} else {
return state_map;
}
});
com.fulcrologic.fulcro.routing.dynamic_routing.ready_handler = (function com$fulcrologic$fulcro$routing$dynamic_routing$ready_handler(env){
var new_env = com.fulcrologic.fulcro.ui_state_machines.apply_action.cljs$core$IFn$_invoke$arity$variadic(com.fulcrologic.fulcro.ui_state_machines.store(com.fulcrologic.fulcro.ui_state_machines.store(env,new cljs.core.Keyword(null,"path-segment","path-segment",1516798997),com.fulcrologic.fulcro.ui_state_machines.retrieve.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.Keyword(null,"pending-path-segment","pending-path-segment",-1932876268))),new cljs.core.Keyword(null,"pending-path-segment","pending-path-segment",-1932876268),cljs.core.PersistentVector.EMPTY),target_ready_STAR_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.ui_state_machines.retrieve.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.Keyword(null,"target","target",253001721))], 0));
var app = new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","app","com.fulcrologic.fulcro.ui-state-machines/app",-1843831489).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_(app)){
com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(com.fulcrologic.fulcro.algorithms.indexing.reindex.cljs$core$IFn$_invoke$arity$0 ? com.fulcrologic.fulcro.algorithms.indexing.reindex.cljs$core$IFn$_invoke$arity$0() : com.fulcrologic.fulcro.algorithms.indexing.reindex.call(null, ))], null));
} else {
}

return new_env;
});
com.fulcrologic.fulcro.routing.dynamic_routing.fail_handler = (function com$fulcrologic$fulcro$routing$dynamic_routing$fail_handler(env){
return env;
});
com.fulcrologic.fulcro.routing.dynamic_routing.route_handler = (function com$fulcrologic$fulcro$routing$dynamic_routing$route_handler(p__58855){
var map__58856 = p__58855;
var map__58856__$1 = cljs.core.__destructure_map(map__58856);
var env = map__58856__$1;
var app = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58856__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","app","com.fulcrologic.fulcro.ui-state-machines/app",-1843831489));
var event_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58856__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031));
var map__58857 = event_data;
var map__58857__$1 = cljs.core.__destructure_map(map__58857);
var router = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58857__$1,new cljs.core.Keyword(null,"router","router",1091916230));
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58857__$1,new cljs.core.Keyword(null,"target","target",253001721));
var error_timeout = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__58857__$1,new cljs.core.Keyword(null,"error-timeout","error-timeout",-1004615840),(5000));
var deferred_timeout = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__58857__$1,new cljs.core.Keyword(null,"deferred-timeout","deferred-timeout",1616220530),(20));
var path_segment = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58857__$1,new cljs.core.Keyword(null,"path-segment","path-segment",1516798997));
var immediate_QMARK_ = com.fulcrologic.fulcro.routing.dynamic_routing.immediate_QMARK_(target);
return com.fulcrologic.fulcro.ui_state_machines.store((cljs.core.truth_(immediate_QMARK_)?(function (){var new_env = com.fulcrologic.fulcro.ui_state_machines.activate(com.fulcrologic.fulcro.ui_state_machines.apply_action.cljs$core$IFn$_invoke$arity$variadic(com.fulcrologic.fulcro.ui_state_machines.store(env,new cljs.core.Keyword(null,"path-segment","path-segment",1516798997),path_segment),com.fulcrologic.fulcro.routing.dynamic_routing.apply_route_STAR_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([event_data], 0)),new cljs.core.Keyword(null,"routed","routed",-707282794));
if(cljs.core.truth_(app)){
com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(com.fulcrologic.fulcro.algorithms.indexing.reindex.cljs$core$IFn$_invoke$arity$0 ? com.fulcrologic.fulcro.algorithms.indexing.reindex.cljs$core$IFn$_invoke$arity$0() : com.fulcrologic.fulcro.algorithms.indexing.reindex.call(null, ))], null));
} else {
}

return new_env;
})():com.fulcrologic.fulcro.ui_state_machines.activate(com.fulcrologic.fulcro.ui_state_machines.set_timeout.cljs$core$IFn$_invoke$arity$6(com.fulcrologic.fulcro.ui_state_machines.set_timeout.cljs$core$IFn$_invoke$arity$6(com.fulcrologic.fulcro.ui_state_machines.apply_action.cljs$core$IFn$_invoke$arity$variadic(com.fulcrologic.fulcro.ui_state_machines.store(env,new cljs.core.Keyword(null,"pending-path-segment","pending-path-segment",-1932876268),path_segment),com.fulcrologic.fulcro.routing.dynamic_routing.mark_route_pending_STAR_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([event_data], 0)),new cljs.core.Keyword(null,"error-timer","error-timer",347765002),new cljs.core.Keyword(null,"timeout!","timeout!",-316117497),cljs.core.PersistentArrayMap.EMPTY,error_timeout,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"route!","route!",-1286958144),null,new cljs.core.Keyword(null,"ready!","ready!",-1695278696),null], null), null)),new cljs.core.Keyword(null,"delay-timer","delay-timer",-920427787),new cljs.core.Keyword(null,"waiting!","waiting!",373081239),cljs.core.PersistentArrayMap.EMPTY,deferred_timeout,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"route!","route!",-1286958144),null,new cljs.core.Keyword(null,"ready!","ready!",-1695278696),null], null), null)),new cljs.core.Keyword(null,"deferred","deferred",-1976960688))),new cljs.core.Keyword(null,"target","target",253001721),target);
});
com.fulcrologic.fulcro.routing.dynamic_routing.RouterStateMachine = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actors","com.fulcrologic.fulcro.ui-state-machines/actors",89596064),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"router","router",1091916230),null], null), null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","aliases","com.fulcrologic.fulcro.ui-state-machines/aliases",-320387324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"current-route","current-route",2067529448),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"router","router",1091916230),new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871)], null),new cljs.core.Keyword(null,"state","state",-1988618099),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"router","router",1091916230),new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-state","com.fulcrologic.fulcro.routing.dynamic-routing/current-state",2011639269)], null)], null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"initial","initial",1854648214),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.route_handler], null),new cljs.core.Keyword(null,"deferred","deferred",-1976960688),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"waiting!","waiting!",373081239),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword(null,"pending","pending",-220036727)], null),new cljs.core.Keyword(null,"route!","route!",-1286958144),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.route_handler], null),new cljs.core.Keyword(null,"ready!","ready!",-1695278696),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword(null,"routed","routed",-707282794),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.ready_handler], null),new cljs.core.Keyword(null,"timeout!","timeout!",-316117497),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword(null,"failed","failed",-1397425762),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.fail_handler], null)], null)], null),new cljs.core.Keyword(null,"pending","pending",-220036727),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"waiting!","waiting!",373081239),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword(null,"pending","pending",-220036727)], null),new cljs.core.Keyword(null,"route!","route!",-1286958144),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.route_handler], null),new cljs.core.Keyword(null,"ready!","ready!",-1695278696),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword(null,"routed","routed",-707282794),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.ready_handler], null),new cljs.core.Keyword(null,"timeout!","timeout!",-316117497),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword(null,"failed","failed",-1397425762),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.fail_handler], null)], null)], null),new cljs.core.Keyword(null,"failed","failed",-1397425762),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"route!","route!",-1286958144),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.route_handler], null),new cljs.core.Keyword(null,"ready!","ready!",-1695278696),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword(null,"routed","routed",-707282794),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.ready_handler], null)], null)], null),new cljs.core.Keyword(null,"routed","routed",-707282794),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"waiting!","waiting!",373081239),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),cljs.core.identity], null),new cljs.core.Keyword(null,"timeout!","timeout!",-316117497),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),cljs.core.identity], null),new cljs.core.Keyword(null,"route!","route!",-1286958144),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.route_handler], null)], null)], null)], null)], null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583),new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","RouterStateMachine","com.fulcrologic.fulcro.routing.dynamic-routing/RouterStateMachine",1134286079,null));

com.fulcrologic.fulcro.ui_state_machines.register_state_machine_BANG_(new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","RouterStateMachine","com.fulcrologic.fulcro.routing.dynamic-routing/RouterStateMachine",1134286079,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actors","com.fulcrologic.fulcro.ui-state-machines/actors",89596064),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"router","router",1091916230),null], null), null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","aliases","com.fulcrologic.fulcro.ui-state-machines/aliases",-320387324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"current-route","current-route",2067529448),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"router","router",1091916230),new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871)], null),new cljs.core.Keyword(null,"state","state",-1988618099),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"router","router",1091916230),new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-state","com.fulcrologic.fulcro.routing.dynamic-routing/current-state",2011639269)], null)], null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"initial","initial",1854648214),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.route_handler], null),new cljs.core.Keyword(null,"deferred","deferred",-1976960688),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"waiting!","waiting!",373081239),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword(null,"pending","pending",-220036727)], null),new cljs.core.Keyword(null,"route!","route!",-1286958144),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.route_handler], null),new cljs.core.Keyword(null,"ready!","ready!",-1695278696),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword(null,"routed","routed",-707282794),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.ready_handler], null),new cljs.core.Keyword(null,"timeout!","timeout!",-316117497),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword(null,"failed","failed",-1397425762),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.fail_handler], null)], null)], null),new cljs.core.Keyword(null,"pending","pending",-220036727),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"waiting!","waiting!",373081239),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword(null,"pending","pending",-220036727)], null),new cljs.core.Keyword(null,"route!","route!",-1286958144),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.route_handler], null),new cljs.core.Keyword(null,"ready!","ready!",-1695278696),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword(null,"routed","routed",-707282794),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.ready_handler], null),new cljs.core.Keyword(null,"timeout!","timeout!",-316117497),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword(null,"failed","failed",-1397425762),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.fail_handler], null)], null)], null),new cljs.core.Keyword(null,"failed","failed",-1397425762),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"route!","route!",-1286958144),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.route_handler], null),new cljs.core.Keyword(null,"ready!","ready!",-1695278696),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword(null,"routed","routed",-707282794),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.ready_handler], null)], null)], null),new cljs.core.Keyword(null,"routed","routed",-707282794),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"waiting!","waiting!",373081239),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),cljs.core.identity], null),new cljs.core.Keyword(null,"timeout!","timeout!",-316117497),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),cljs.core.identity], null),new cljs.core.Keyword(null,"route!","route!",-1286958144),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.routing.dynamic_routing.route_handler], null)], null)], null)], null)], null));
/**
 * Internal algorithm: Returns a sequence of idents of the targets that the `new-route` goes through by analyzing the current
 *   application query and state.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.proposed_new_path = (function com$fulcrologic$fulcro$routing$dynamic_routing$proposed_new_path(var_args){
var G__58859 = arguments.length;
switch (G__58859) {
case 3:
return com.fulcrologic.fulcro.routing.dynamic_routing.proposed_new_path.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return com.fulcrologic.fulcro.routing.dynamic_routing.proposed_new_path.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.proposed_new_path.cljs$core$IFn$_invoke$arity$3 = (function (this_or_app,relative_class_or_instance,new_route){
return com.fulcrologic.fulcro.routing.dynamic_routing.proposed_new_path.cljs$core$IFn$_invoke$arity$4(this_or_app,relative_class_or_instance,new_route,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.proposed_new_path.cljs$core$IFn$_invoke$arity$4 = (function (this_or_app,relative_class_or_instance,new_route,timeouts_and_params){
var app = com.fulcrologic.fulcro.raw.components.any__GT_app(this_or_app);
var state_map = com.fulcrologic.fulcro.application.current_state(app);
var root_query = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(relative_class_or_instance,state_map);
var ast = edn_query_language.core.query__GT_ast(root_query);
var root = com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_route.cljs$core$IFn$_invoke$arity$3(ast,new_route,state_map);
var result = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var G__58861_59366 = root;
var map__58862_59367 = G__58861_59366;
var map__58862_59368__$1 = cljs.core.__destructure_map(map__58862_59367);
var component_59369 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58862_59368__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var path_59370 = new_route;
var G__58861_59375__$1 = G__58861_59366;
var path_59376__$1 = path_59370;
while(true){
var map__58871_59377 = G__58861_59375__$1;
var map__58871_59378__$1 = cljs.core.__destructure_map(map__58871_59377);
var component_59379__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58871_59378__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var path_59380__$2 = path_59376__$1;
if(cljs.core.truth_((function (){var and__5000__auto__ = component_59379__$1;
if(cljs.core.truth_(and__5000__auto__)){
return com.fulcrologic.fulcro.routing.dynamic_routing.router_QMARK_(component_59379__$1);
} else {
return and__5000__auto__;
}
})())){
var map__58872_59381 = com.fulcrologic.fulcro.routing.dynamic_routing.route_target.cljs$core$IFn$_invoke$arity$3(component_59379__$1,path_59380__$2,state_map);
var map__58872_59382__$1 = cljs.core.__destructure_map(map__58872_59381);
var target_59383 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58872_59382__$1,new cljs.core.Keyword(null,"target","target",253001721));
var matching_prefix_59384 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58872_59382__$1,new cljs.core.Keyword(null,"matching-prefix","matching-prefix",-539262173));
var target_ast_59385 = (function (){var G__58873 = target_59383;
var G__58873__$1 = (((G__58873 == null))?null:com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(G__58873,state_map));
if((G__58873__$1 == null)){
return null;
} else {
return edn_query_language.core.query__GT_ast(G__58873__$1);
}
})();
var prefix_length_59386 = cljs.core.count(matching_prefix_59384);
var remaining_path_59387 = cljs.core.vec(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(prefix_length_59386,path_59380__$2));
var segment_59388 = com.fulcrologic.fulcro.routing.dynamic_routing.route_segment(target_59383);
var params_59389 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (G__58861_59375__$1,path_59376__$1,map__58872_59381,map__58872_59382__$1,target_59383,matching_prefix_59384,target_ast_59385,prefix_length_59386,remaining_path_59387,segment_59388,map__58871_59377,map__58871_59378__$1,component_59379__$1,path_59380__$2,G__58861_59366,map__58862_59367,map__58862_59368__$1,component_59369,path_59370,app,state_map,root_query,ast,root,result){
return (function (p,p__58874){
var vec__58875 = p__58874;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58875,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58875,(1),null);
if((k instanceof cljs.core.Keyword)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p,k,v);
} else {
return p;
}
});})(G__58861_59375__$1,path_59376__$1,map__58872_59381,map__58872_59382__$1,target_59383,matching_prefix_59384,target_ast_59385,prefix_length_59386,remaining_path_59387,segment_59388,map__58871_59377,map__58871_59378__$1,component_59379__$1,path_59380__$2,G__58861_59366,map__58862_59367,map__58862_59368__$1,component_59369,path_59370,app,state_map,root_query,ast,root,result))
,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(timeouts_and_params,new cljs.core.Keyword(null,"error-timeout","error-timeout",-1004615840),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"deferred-timeout","deferred-timeout",1616220530)], 0)),cljs.core.map.cljs$core$IFn$_invoke$arity$3(((function (G__58861_59375__$1,path_59376__$1,map__58872_59381,map__58872_59382__$1,target_59383,matching_prefix_59384,target_ast_59385,prefix_length_59386,remaining_path_59387,segment_59388,map__58871_59377,map__58871_59378__$1,component_59379__$1,path_59380__$2,G__58861_59366,map__58862_59367,map__58862_59368__$1,component_59369,path_59370,app,state_map,root_query,ast,root,result){
return (function (a,b){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null);
});})(G__58861_59375__$1,path_59376__$1,map__58872_59381,map__58872_59382__$1,target_59383,matching_prefix_59384,target_ast_59385,prefix_length_59386,remaining_path_59387,segment_59388,map__58871_59377,map__58871_59378__$1,component_59379__$1,path_59380__$2,G__58861_59366,map__58862_59367,map__58862_59368__$1,component_59369,path_59370,app,state_map,root_query,ast,root,result))
,segment_59388,matching_prefix_59384));
var target_ident_59390 = com.fulcrologic.fulcro.routing.dynamic_routing.will_enter(target_59383,app,params_59389);
if((((!(edn_query_language.core.ident_QMARK_(target_ident_59390)))) || ((cljs.core.second(target_ident_59390) == null)))){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",477,14,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (G__58861_59375__$1,path_59376__$1,map__58872_59381,map__58872_59382__$1,target_59383,matching_prefix_59384,target_ast_59385,prefix_length_59386,remaining_path_59387,segment_59388,params_59389,target_ident_59390,map__58871_59377,map__58871_59378__$1,component_59379__$1,path_59380__$2,G__58861_59366,map__58862_59367,map__58862_59368__$1,component_59369,path_59370,app,state_map,root_query,ast,root,result){
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["will-enter for router target",com.fulcrologic.fulcro.raw.components.component_name(target_59383),"did not return a valid ident. Instead it returned: ",target_ident_59390,"See https://book.fulcrologic.com/#err-dr-will-enter-invalid-ident"], null);
});})(G__58861_59375__$1,path_59376__$1,map__58872_59381,map__58872_59382__$1,target_59383,matching_prefix_59384,target_ast_59385,prefix_length_59386,remaining_path_59387,segment_59388,params_59389,target_ident_59390,map__58871_59377,map__58871_59378__$1,component_59379__$1,path_59380__$2,G__58861_59366,map__58862_59367,map__58862_59368__$1,component_59369,path_59370,app,state_map,root_query,ast,root,result))
,null)),null,(418),null,null,null);
} else {
}

if(((edn_query_language.core.ident_QMARK_(target_ident_59390)) && ((!(cljs.core.contains_QMARK_((function (){var G__58878 = target_ident_59390;
if((G__58878 == null)){
return null;
} else {
return cljs.core.meta(G__58878);
}
})(),new cljs.core.Keyword(null,"immediate","immediate",-1684692069))))))){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",480,14,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (G__58861_59375__$1,path_59376__$1,map__58872_59381,map__58872_59382__$1,target_59383,matching_prefix_59384,target_ast_59385,prefix_length_59386,remaining_path_59387,segment_59388,params_59389,target_ident_59390,map__58871_59377,map__58871_59378__$1,component_59379__$1,path_59380__$2,G__58861_59366,map__58862_59367,map__58862_59368__$1,component_59369,path_59370,app,state_map,root_query,ast,root,result){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["will-enter for router target",com.fulcrologic.fulcro.raw.components.component_name(target_59383),"did not wrap the ident in route-immediate, route-deferred, or route-with-path-ordered-transaction. See https://book.fulcrologic.com/#err-dr-will-enter-missing-metadata"], null);
});})(G__58861_59375__$1,path_59376__$1,map__58872_59381,map__58872_59382__$1,target_59383,matching_prefix_59384,target_ast_59385,prefix_length_59386,remaining_path_59387,segment_59388,params_59389,target_ident_59390,map__58871_59377,map__58871_59378__$1,component_59379__$1,path_59380__$2,G__58861_59366,map__58862_59367,map__58862_59368__$1,component_59369,path_59370,app,state_map,root_query,ast,root,result))
,null)),null,(419),null,null,null);
} else {
}

if(cljs.core.vector_QMARK_(target_ident_59390)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(result,cljs.core.conj,cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$6(target_ident_59390,cljs.core.assoc,new cljs.core.Keyword(null,"component","component",1555936782),target_59383,new cljs.core.Keyword(null,"params","params",710516235),params_59389));
} else {
}

if(cljs.core.seq(remaining_path_59387)){
var G__59402 = com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_route.cljs$core$IFn$_invoke$arity$3(target_ast_59385,remaining_path_59387,state_map);
var G__59403 = remaining_path_59387;
G__58861_59375__$1 = G__59402;
path_59376__$1 = G__59403;
continue;
} else {
}
} else {
}
break;
}

return cljs.core.deref(result);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.proposed_new_path.cljs$lang$maxFixedArity = 4);

/**
 * Tell active routers that they are about to leave the screen. Returns false if any of them deny the route change.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.signal_router_leaving = (function com$fulcrologic$fulcro$routing$dynamic_routing$signal_router_leaving(var_args){
var G__58882 = arguments.length;
switch (G__58882) {
case 3:
return com.fulcrologic.fulcro.routing.dynamic_routing.signal_router_leaving.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return com.fulcrologic.fulcro.routing.dynamic_routing.signal_router_leaving.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.signal_router_leaving.cljs$core$IFn$_invoke$arity$3 = (function (app_or_comp,relative_class_or_instance,new_route){
return com.fulcrologic.fulcro.routing.dynamic_routing.signal_router_leaving.cljs$core$IFn$_invoke$arity$4(app_or_comp,relative_class_or_instance,new_route,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.signal_router_leaving.cljs$core$IFn$_invoke$arity$4 = (function (app_or_comp,relative_class_or_instance,new_route,timeouts_and_params){
var new_path = com.fulcrologic.fulcro.routing.dynamic_routing.proposed_new_path.cljs$core$IFn$_invoke$arity$4(app_or_comp,relative_class_or_instance,new_route,timeouts_and_params);
var app = com.fulcrologic.fulcro.raw.components.any__GT_app(app_or_comp);
var state_map = com.fulcrologic.fulcro.application.current_state(app);
var router = relative_class_or_instance;
var root_query = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(router,state_map);
var ast = edn_query_language.core.query__GT_ast(root_query);
var root = com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_live_router(app,ast);
var to_signal = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var to_cancel = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var _ = (function (){var G__58884 = root;
var map__58885 = G__58884;
var map__58885__$1 = cljs.core.__destructure_map(map__58885);
var node = map__58885__$1;
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58885__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58885__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var new_path_remaining = new_path;
var G__58884__$1 = G__58884;
var new_path_remaining__$1 = new_path_remaining;
while(true){
var map__58886 = G__58884__$1;
var map__58886__$1 = cljs.core.__destructure_map(map__58886);
var node__$1 = map__58886__$1;
var component__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58886__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var children__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58886__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var new_path_remaining__$2 = new_path_remaining__$1;
if(cljs.core.truth_((function (){var and__5000__auto__ = component__$1;
if(cljs.core.truth_(and__5000__auto__)){
return com.fulcrologic.fulcro.routing.dynamic_routing.router_QMARK_(component__$1);
} else {
return and__5000__auto__;
}
})())){
var new_target = cljs.core.first(new_path_remaining__$2);
var router_ident = com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(component__$1,cljs.core.PersistentArrayMap.EMPTY);
var active_target = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(router_ident,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871)));
var map__58887 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(router_ident,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","pending-route","com.fulcrologic.fulcro.routing.dynamic-routing/pending-route",-1358888373)));
var map__58887__$1 = cljs.core.__destructure_map(map__58887);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58887__$1,new cljs.core.Keyword(null,"target","target",253001721));
var next_router = cljs.core.some(((function (G__58884__$1,new_path_remaining__$1,new_target,router_ident,active_target,map__58887,map__58887__$1,target,map__58886,map__58886__$1,node__$1,component__$1,children__$1,new_path_remaining__$2,G__58884,map__58885,map__58885__$1,node,component,children,new_path_remaining,new_path,app,state_map,router,root_query,ast,root,to_signal,to_cancel){
return (function (p1__58879_SHARP_){
return com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_live_router(app,p1__58879_SHARP_);
});})(G__58884__$1,new_path_remaining__$1,new_target,router_ident,active_target,map__58887,map__58887__$1,target,map__58886,map__58886__$1,node__$1,component__$1,children__$1,new_path_remaining__$2,G__58884,map__58885,map__58885__$1,node,component,children,new_path_remaining,new_path,app,state_map,router,root_query,ast,root,to_signal,to_cancel))
,children__$1);
if(edn_query_language.core.ident_QMARK_(target)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(to_cancel,cljs.core.conj,target);
} else {
}

if(((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new_target,active_target)) && (cljs.core.vector_QMARK_(active_target)))){
var mounted_target_class_59414 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (G__58884__$1,new_path_remaining__$1,new_target,router_ident,active_target,map__58887,map__58887__$1,target,next_router,map__58886,map__58886__$1,node__$1,component__$1,children__$1,new_path_remaining__$2,G__58884,map__58885,map__58885__$1,node,component,children,new_path_remaining,new_path,app,state_map,router,root_query,ast,root,to_signal,to_cancel){
return (function (acc,p__58888){
var map__58889 = p__58888;
var map__58889__$1 = cljs.core.__destructure_map(map__58889);
var dispatch_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58889__$1,new cljs.core.Keyword(null,"dispatch-key","dispatch-key",733619510));
var component__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58889__$1,new cljs.core.Keyword(null,"component","component",1555936782));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871),dispatch_key)){
return cljs.core.reduced(component__$2);
} else {
return null;
}
});})(G__58884__$1,new_path_remaining__$1,new_target,router_ident,active_target,map__58887,map__58887__$1,target,next_router,map__58886,map__58886__$1,node__$1,component__$1,children__$1,new_path_remaining__$2,G__58884,map__58885,map__58885__$1,node,component,children,new_path_remaining,new_path,app,state_map,router,root_query,ast,root,to_signal,to_cancel))
,null,(function (){var G__58890 = component__$1;
var G__58890__$1 = (((G__58890 == null))?null:com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(G__58890,state_map));
var G__58890__$2 = (((G__58890__$1 == null))?null:edn_query_language.core.query__GT_ast(G__58890__$1));
if((G__58890__$2 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(G__58890__$2);
}
})());
var mounted_targets_59415 = com.fulcrologic.fulcro.components.class__GT_all(app,mounted_target_class_59414);
if(cljs.core.seq(mounted_targets_59415)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(to_signal,cljs.core.into,mounted_targets_59415);
} else {
}
} else {
}

if(cljs.core.truth_(next_router)){
var G__59419 = next_router;
var G__59420 = cljs.core.rest(new_path_remaining__$2);
G__58884__$1 = G__59419;
new_path_remaining__$1 = G__59420;
continue;
} else {
return null;
}
} else {
return null;
}
break;
}
})();
var components = cljs.core.reverse(cljs.core.deref(to_signal));
var result = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
var seq__58891_59422 = cljs.core.seq(components);
var chunk__58892_59423 = null;
var count__58893_59424 = (0);
var i__58894_59425 = (0);
while(true){
if((i__58894_59425 < count__58893_59424)){
var c_59426 = chunk__58892_59423.cljs$core$IIndexed$_nth$arity$2(null, i__58894_59425);
var will_leave_result_59428 = com.fulcrologic.fulcro.routing.dynamic_routing.will_leave(c_59426,com.fulcrologic.fulcro.raw.components.props(c_59426));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(result,((function (seq__58891_59422,chunk__58892_59423,count__58893_59424,i__58894_59425,will_leave_result_59428,c_59426,new_path,app,state_map,router,root_query,ast,root,to_signal,to_cancel,_,components,result){
return (function (p1__58880_SHARP_){
var and__5000__auto__ = p1__58880_SHARP_;
if(cljs.core.truth_(and__5000__auto__)){
return will_leave_result_59428;
} else {
return and__5000__auto__;
}
});})(seq__58891_59422,chunk__58892_59423,count__58893_59424,i__58894_59425,will_leave_result_59428,c_59426,new_path,app,state_map,router,root_query,ast,root,to_signal,to_cancel,_,components,result))
);


var G__59431 = seq__58891_59422;
var G__59432 = chunk__58892_59423;
var G__59433 = count__58893_59424;
var G__59434 = (i__58894_59425 + (1));
seq__58891_59422 = G__59431;
chunk__58892_59423 = G__59432;
count__58893_59424 = G__59433;
i__58894_59425 = G__59434;
continue;
} else {
var temp__5825__auto___59435 = cljs.core.seq(seq__58891_59422);
if(temp__5825__auto___59435){
var seq__58891_59437__$1 = temp__5825__auto___59435;
if(cljs.core.chunked_seq_QMARK_(seq__58891_59437__$1)){
var c__5525__auto___59438 = cljs.core.chunk_first(seq__58891_59437__$1);
var G__59440 = cljs.core.chunk_rest(seq__58891_59437__$1);
var G__59441 = c__5525__auto___59438;
var G__59442 = cljs.core.count(c__5525__auto___59438);
var G__59443 = (0);
seq__58891_59422 = G__59440;
chunk__58892_59423 = G__59441;
count__58893_59424 = G__59442;
i__58894_59425 = G__59443;
continue;
} else {
var c_59444 = cljs.core.first(seq__58891_59437__$1);
var will_leave_result_59447 = com.fulcrologic.fulcro.routing.dynamic_routing.will_leave(c_59444,com.fulcrologic.fulcro.raw.components.props(c_59444));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(result,((function (seq__58891_59422,chunk__58892_59423,count__58893_59424,i__58894_59425,will_leave_result_59447,c_59444,seq__58891_59437__$1,temp__5825__auto___59435,new_path,app,state_map,router,root_query,ast,root,to_signal,to_cancel,_,components,result){
return (function (p1__58880_SHARP_){
var and__5000__auto__ = p1__58880_SHARP_;
if(cljs.core.truth_(and__5000__auto__)){
return will_leave_result_59447;
} else {
return and__5000__auto__;
}
});})(seq__58891_59422,chunk__58892_59423,count__58893_59424,i__58894_59425,will_leave_result_59447,c_59444,seq__58891_59437__$1,temp__5825__auto___59435,new_path,app,state_map,router,root_query,ast,root,to_signal,to_cancel,_,components,result))
);


var G__59450 = cljs.core.next(seq__58891_59437__$1);
var G__59451 = null;
var G__59452 = (0);
var G__59453 = (0);
seq__58891_59422 = G__59450;
chunk__58892_59423 = G__59451;
count__58893_59424 = G__59452;
i__58894_59425 = G__59453;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(cljs.core.deref(result))){
var seq__58895_59454 = cljs.core.seq(cljs.core.deref(to_cancel));
var chunk__58896_59455 = null;
var count__58897_59456 = (0);
var i__58898_59457 = (0);
while(true){
if((i__58898_59457 < count__58897_59456)){
var t_59458 = chunk__58896_59455.cljs$core$IIndexed$_nth$arity$2(null, i__58898_59457);
var map__58903_59459 = (function (){var G__58904 = t_59458;
if((G__58904 == null)){
return null;
} else {
return cljs.core.meta(G__58904);
}
})();
var map__58903_59460__$1 = cljs.core.__destructure_map(map__58903_59459);
var component_59461 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58903_59460__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var params_59462 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58903_59460__$1,new cljs.core.Keyword(null,"params","params",710516235));
com.fulcrologic.fulcro.routing.dynamic_routing.route_cancelled(component_59461,params_59462);


var G__59464 = seq__58895_59454;
var G__59465 = chunk__58896_59455;
var G__59466 = count__58897_59456;
var G__59467 = (i__58898_59457 + (1));
seq__58895_59454 = G__59464;
chunk__58896_59455 = G__59465;
count__58897_59456 = G__59466;
i__58898_59457 = G__59467;
continue;
} else {
var temp__5825__auto___59469 = cljs.core.seq(seq__58895_59454);
if(temp__5825__auto___59469){
var seq__58895_59470__$1 = temp__5825__auto___59469;
if(cljs.core.chunked_seq_QMARK_(seq__58895_59470__$1)){
var c__5525__auto___59472 = cljs.core.chunk_first(seq__58895_59470__$1);
var G__59474 = cljs.core.chunk_rest(seq__58895_59470__$1);
var G__59475 = c__5525__auto___59472;
var G__59476 = cljs.core.count(c__5525__auto___59472);
var G__59477 = (0);
seq__58895_59454 = G__59474;
chunk__58896_59455 = G__59475;
count__58897_59456 = G__59476;
i__58898_59457 = G__59477;
continue;
} else {
var t_59478 = cljs.core.first(seq__58895_59470__$1);
var map__58905_59479 = (function (){var G__58906 = t_59478;
if((G__58906 == null)){
return null;
} else {
return cljs.core.meta(G__58906);
}
})();
var map__58905_59481__$1 = cljs.core.__destructure_map(map__58905_59479);
var component_59482 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58905_59481__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var params_59483 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58905_59481__$1,new cljs.core.Keyword(null,"params","params",710516235));
com.fulcrologic.fulcro.routing.dynamic_routing.route_cancelled(component_59482,params_59483);


var G__59487 = cljs.core.next(seq__58895_59470__$1);
var G__59488 = null;
var G__59489 = (0);
var G__59490 = (0);
seq__58895_59454 = G__59487;
chunk__58896_59455 = G__59488;
count__58897_59456 = G__59489;
i__58898_59457 = G__59490;
continue;
}
} else {
}
}
break;
}
} else {
}

return cljs.core.deref(result);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.signal_router_leaving.cljs$lang$maxFixedArity = 4);

/**
 * Returns the current active route, starting from the relative Fulcro class or instance.
 * 
 *   Any component using this as a basis for rendering will need to add the following to their query to
 *   ensure the props of that component change on route changes:
 * 
 *   ```
 *   [::uism/asm-id fq-router-kw]
 *   ```
 * 
 *   where `fq-router-kw` is a keyword that has the exact namespace and name of the router you're interested in. If you want
 *   to just over-render you can use a quoted `_` instead.
 * 
 *   NOTE: This function is primarily meant to be used in mutation implementations or with global routing.
 *   It is not reliable to use this function during render because it relies on the router being mounted (and render gets
 *   called in order to determine what to render). If you want to know the current state of a particular
 *   router you should query for it's ASM as indicated above.
 *   
 */
com.fulcrologic.fulcro.routing.dynamic_routing.current_route = (function com$fulcrologic$fulcro$routing$dynamic_routing$current_route(var_args){
var G__58909 = arguments.length;
switch (G__58909) {
case 1:
return com.fulcrologic.fulcro.routing.dynamic_routing.current_route.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.routing.dynamic_routing.current_route.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.current_route.cljs$core$IFn$_invoke$arity$1 = (function (this_or_app){
var temp__5823__auto__ = (function (){var G__58910 = this_or_app;
var G__58910__$1 = (((G__58910 == null))?null:com.fulcrologic.fulcro.raw.components.any__GT_app(G__58910));
if((G__58910__$1 == null)){
return null;
} else {
return com.fulcrologic.fulcro.application.root_class(G__58910__$1);
}
})();
if(cljs.core.truth_(temp__5823__auto__)){
var cls = temp__5823__auto__;
return com.fulcrologic.fulcro.routing.dynamic_routing.current_route.cljs$core$IFn$_invoke$arity$2(this_or_app,cls);
} else {
return cljs.core.PersistentVector.EMPTY;
}
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.current_route.cljs$core$IFn$_invoke$arity$2 = (function (this_or_app,relative_class_or_instance){
var app = com.fulcrologic.fulcro.raw.components.any__GT_app(this_or_app);
var state_map = com.fulcrologic.fulcro.application.current_state(app);
var router = relative_class_or_instance;
var root_query = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(router,state_map);
var ast = edn_query_language.core.query__GT_ast(root_query);
var root = (function (){var or__5002__auto__ = com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_live_router(app,ast);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.first(new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(ast));
}
})();
var result = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var G__58912_59497 = root;
var map__58913_59498 = G__58912_59497;
var map__58913_59499__$1 = cljs.core.__destructure_map(map__58913_59498);
var node_59500 = map__58913_59499__$1;
var component_59501 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58913_59499__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var G__58912_59502__$1 = G__58912_59497;
while(true){
var map__58915_59504 = G__58912_59502__$1;
var map__58915_59505__$1 = cljs.core.__destructure_map(map__58915_59504);
var node_59506__$1 = map__58915_59505__$1;
var component_59507__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58915_59505__$1,new cljs.core.Keyword(null,"component","component",1555936782));
if(cljs.core.truth_((function (){var and__5000__auto__ = component_59507__$1;
if(cljs.core.truth_(and__5000__auto__)){
return com.fulcrologic.fulcro.routing.dynamic_routing.router_QMARK_(component_59507__$1);
} else {
return and__5000__auto__;
}
})())){
var router_ident_59510 = com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(component_59507__$1,cljs.core.PersistentArrayMap.EMPTY);
var router_id_59511 = cljs.core.second(router_ident_59510);
var sm_env_59512 = com.fulcrologic.fulcro.ui_state_machines.state_machine_env.cljs$core$IFn$_invoke$arity$5(state_map,null,router_id_59511,new cljs.core.Keyword(null,"none","none",1333468478),cljs.core.PersistentArrayMap.EMPTY);
var path_segment_59513 = com.fulcrologic.fulcro.ui_state_machines.retrieve.cljs$core$IFn$_invoke$arity$2(sm_env_59512,new cljs.core.Keyword(null,"path-segment","path-segment",1516798997));
var next_router_59514 = cljs.core.some(((function (G__58912_59502__$1,router_ident_59510,router_id_59511,sm_env_59512,path_segment_59513,map__58915_59504,map__58915_59505__$1,node_59506__$1,component_59507__$1,G__58912_59497,map__58913_59498,map__58913_59499__$1,node_59500,component_59501,app,state_map,router,root_query,ast,root,result){
return (function (p1__58907_SHARP_){
return com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_live_router(app,p1__58907_SHARP_);
});})(G__58912_59502__$1,router_ident_59510,router_id_59511,sm_env_59512,path_segment_59513,map__58915_59504,map__58915_59505__$1,node_59506__$1,component_59507__$1,G__58912_59497,map__58913_59498,map__58913_59499__$1,node_59500,component_59501,app,state_map,router,root_query,ast,root,result))
,new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(node_59506__$1));
if(cljs.core.seq(path_segment_59513)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(result,cljs.core.into,path_segment_59513);
} else {
}

if(cljs.core.truth_(next_router_59514)){
var G__59516 = next_router_59514;
G__58912_59502__$1 = G__59516;
continue;
} else {
}
} else {
}
break;
}

return cljs.core.deref(result);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.current_route.cljs$lang$maxFixedArity = 2);

com.fulcrologic.fulcro.routing.dynamic_routing.mounted_targets = (function com$fulcrologic$fulcro$routing$dynamic_routing$mounted_targets(app,router_class){
var state_map = com.fulcrologic.fulcro.application.current_state(app);
var mounted_target_class = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__58916){
var map__58917 = p__58916;
var map__58917__$1 = cljs.core.__destructure_map(map__58917);
var dispatch_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58917__$1,new cljs.core.Keyword(null,"dispatch-key","dispatch-key",733619510));
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58917__$1,new cljs.core.Keyword(null,"component","component",1555936782));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871),dispatch_key)){
return cljs.core.reduced(component);
} else {
return null;
}
}),null,(function (){var G__58918 = router_class;
var G__58918__$1 = (((G__58918 == null))?null:com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(G__58918,state_map));
var G__58918__$2 = (((G__58918__$1 == null))?null:edn_query_language.core.query__GT_ast(G__58918__$1));
if((G__58918__$2 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(G__58918__$2);
}
})());
return com.fulcrologic.fulcro.components.class__GT_all(app,mounted_target_class);
});
com.fulcrologic.fulcro.routing.dynamic_routing.set_force_route_flag_BANG_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$set_force_route_flag_BANG_(route_target){
return com.fulcrologic.fulcro.routing.dynamic_routing.goog$module$goog$object.set(route_target,"fulcro$routing$force_route",true);
});
/**
 * returns true if the given route target's allow-route-change? should be ignored.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.force_route_flagged_QMARK_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$force_route_flagged_QMARK_(route_target){
return com.fulcrologic.fulcro.raw.components.isoget.cljs$core$IFn$_invoke$arity$2(route_target,"fulcro$routing$force_route");
});
/**
 * This function will return the first mounted instance of a route target that is currently indicating it would
 *   deny a route change. If a `relative-class` is given then it only looks for targets that would deny a change within
 *   that router's subtree.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.target_denying_route_changes = (function com$fulcrologic$fulcro$routing$dynamic_routing$target_denying_route_changes(var_args){
var G__58921 = arguments.length;
switch (G__58921) {
case 2:
return com.fulcrologic.fulcro.routing.dynamic_routing.target_denying_route_changes.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return com.fulcrologic.fulcro.routing.dynamic_routing.target_denying_route_changes.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.target_denying_route_changes.cljs$core$IFn$_invoke$arity$2 = (function (this_or_app,relative_class){
var app = com.fulcrologic.fulcro.raw.components.any__GT_app(this_or_app);
var state_map = com.fulcrologic.fulcro.application.current_state(app);
var root_query = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(relative_class,state_map);
var ast = edn_query_language.core.query__GT_ast(root_query);
var root = (function (){var or__5002__auto__ = com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_live_router(app,ast);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.first(new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(ast));
}
})();
var G__58923 = root;
var map__58924 = G__58923;
var map__58924__$1 = cljs.core.__destructure_map(map__58924);
var router_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58924__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58924__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var G__58923__$1 = G__58923;
while(true){
var map__58926 = G__58923__$1;
var map__58926__$1 = cljs.core.__destructure_map(map__58926);
var router_class__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58926__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var children__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58926__$1,new cljs.core.Keyword(null,"children","children",-940561982));
if(cljs.core.truth_((function (){var and__5000__auto__ = router_class__$1;
if(cljs.core.truth_(and__5000__auto__)){
return com.fulcrologic.fulcro.routing.dynamic_routing.router_QMARK_(router_class__$1);
} else {
return and__5000__auto__;
}
})())){
var router_ident = com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(router_class__$1,cljs.core.PersistentArrayMap.EMPTY);
var active_target = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(router_ident,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871)));
var next_router = cljs.core.some(((function (G__58923__$1,router_ident,active_target,map__58926,map__58926__$1,router_class__$1,children__$1,G__58923,map__58924,map__58924__$1,router_class,children,app,state_map,root_query,ast,root){
return (function (p1__58919_SHARP_){
return com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_live_router(app,p1__58919_SHARP_);
});})(G__58923__$1,router_ident,active_target,map__58926,map__58926__$1,router_class__$1,children__$1,G__58923,map__58924,map__58924__$1,router_class,children,app,state_map,root_query,ast,root))
,children__$1);
var rejecting_target = ((cljs.core.vector_QMARK_(active_target))?cljs.core.some(((function (G__58923__$1,router_ident,active_target,next_router,map__58926,map__58926__$1,router_class__$1,children__$1,G__58923,map__58924,map__58924__$1,router_class,children,app,state_map,root_query,ast,root){
return (function (c){
if(((com.fulcrologic.fulcro.routing.dynamic_routing.allow_route_change_QMARK_(c) === false) && (cljs.core.not(com.fulcrologic.fulcro.routing.dynamic_routing.force_route_flagged_QMARK_(c))))){
return c;
} else {
return null;
}
});})(G__58923__$1,router_ident,active_target,next_router,map__58926,map__58926__$1,router_class__$1,children__$1,G__58923,map__58924,map__58924__$1,router_class,children,app,state_map,root_query,ast,root))
,com.fulcrologic.fulcro.routing.dynamic_routing.mounted_targets(app,router_class__$1)):null);
if(cljs.core.truth_(rejecting_target)){
return rejecting_target;
} else {
if(cljs.core.truth_(next_router)){
var G__59526 = next_router;
G__58923__$1 = G__59526;
continue;
} else {
return null;
}
}
} else {
return null;
}
break;
}
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.target_denying_route_changes.cljs$core$IFn$_invoke$arity$1 = (function (this_or_app){
var app = com.fulcrologic.fulcro.raw.components.any__GT_app(this_or_app);
var router = com.fulcrologic.fulcro.application.root_class(app);
return com.fulcrologic.fulcro.routing.dynamic_routing.target_denying_route_changes.cljs$core$IFn$_invoke$arity$2(app,router);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.target_denying_route_changes.cljs$lang$maxFixedArity = 2);

/**
 * Returns true if the active on-screen targets indicate they will allow navigation.
 * 
 *   NOTE: If your route targets have an `:allow-route-change?`, then that will be used to determine if the route can
 *   be abandoned; otherwise `:will-leave` will be called to answer the question; however, this USE of `will-leave`
 *   is DEPRECATED (though the hook is NOT because it serves another purpose). If you side-effect in `:will-leave` this could cause strange
 *   behavior throughout the application.  It is recommended that your targets implement `:allow-route-change?` if they need
 *   to prevent routing, and only leverage `:will-leave` to do things like cancel in-progress loads.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.can_change_route_QMARK_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$can_change_route_QMARK_(var_args){
var G__58928 = arguments.length;
switch (G__58928) {
case 1:
return com.fulcrologic.fulcro.routing.dynamic_routing.can_change_route_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.routing.dynamic_routing.can_change_route_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.can_change_route_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (this_or_app){
return (com.fulcrologic.fulcro.routing.dynamic_routing.target_denying_route_changes.cljs$core$IFn$_invoke$arity$1(this_or_app) == null);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.can_change_route_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (this_or_app,relative_class){
return (com.fulcrologic.fulcro.routing.dynamic_routing.target_denying_route_changes.cljs$core$IFn$_invoke$arity$2(this_or_app,relative_class) == null);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.can_change_route_QMARK_.cljs$lang$maxFixedArity = 2);

/**
 * Takes an on-screen *instance* of a react element and a new route (vector of strings) and returns a vector containing
 * either the original arguments, or an evaluation of relative navigation up the live routing tree.
 * 
 * If `new-route` starts with `:..` (any number of times) then this function finds (and returns) the parent *router*
 * and the new route stripped of `:..` prefix.
 * 
 * For example, say you were in a target instance that has a parent router, which in turn has a parent router called
 * `SomeRouter`. Then:
 * 
 * ```
 * (dr/evaluate-relative-path this [:.. :.. "some-target"])
 * => [SomeRouter ["some-target"]]
 * ```
 * 
 * This function does *not* work on classes. It is meant for live evaluation of on-screen instances to enable relative
 * routing based on the actual on-screen route targets.
 * 
 * CAN return `nil` for the router if no such parent is found.
 * 
 * Returns unmodified input argument if `new-route` does not begin with `:..`.
 * 
 */
com.fulcrologic.fulcro.routing.dynamic_routing.evaluate_relative_path = (function com$fulcrologic$fulcro$routing$dynamic_routing$evaluate_relative_path(relative_instance,new_route){
var current_instance = relative_instance;
var G__58932 = new_route;
var vec__58933 = G__58932;
var seq__58934 = cljs.core.seq(vec__58933);
var first__58935 = cljs.core.first(seq__58934);
var seq__58934__$1 = cljs.core.next(seq__58934);
var lead_element = first__58935;
var remainder = seq__58934__$1;
var path = vec__58933;
var looking_for_router_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"..","..",-1941038947),lead_element);
var current_instance__$1 = current_instance;
var G__58932__$1 = G__58932;
var looking_for_router_QMARK___$1 = looking_for_router_QMARK_;
while(true){
var current_instance__$2 = current_instance__$1;
var vec__58939 = G__58932__$1;
var seq__58940 = cljs.core.seq(vec__58939);
var first__58941 = cljs.core.first(seq__58940);
var seq__58940__$1 = cljs.core.next(seq__58940);
var lead_element__$1 = first__58941;
var remainder__$1 = seq__58940__$1;
var path__$1 = vec__58939;
var looking_for_router_QMARK___$2 = looking_for_router_QMARK___$1;
if((((current_instance__$2 == null)) || (cljs.core.empty_QMARK_(path__$1)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [current_instance__$2,path__$1], null);
} else {
if(cljs.core.truth_((function (){var and__5000__auto__ = looking_for_router_QMARK___$2;
if(cljs.core.truth_(and__5000__auto__)){
return com.fulcrologic.fulcro.routing.dynamic_routing.router_QMARK_(current_instance__$2);
} else {
return and__5000__auto__;
}
})())){
var G__59538 = current_instance__$2;
var G__59540 = cljs.core.vec(remainder__$1);
var G__59541 = false;
current_instance__$1 = G__59538;
G__58932__$1 = G__59540;
looking_for_router_QMARK___$1 = G__59541;
continue;
} else {
if(cljs.core.truth_(looking_for_router_QMARK___$2)){
var G__59542 = com.fulcrologic.fulcro.components.get_parent.cljs$core$IFn$_invoke$arity$1(current_instance__$2);
var G__59543 = path__$1;
var G__59544 = true;
current_instance__$1 = G__59542;
G__58932__$1 = G__59543;
looking_for_router_QMARK___$1 = G__59544;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"..","..",-1941038947),lead_element__$1)){
var G__59547 = com.fulcrologic.fulcro.components.get_parent.cljs$core$IFn$_invoke$arity$1(current_instance__$2);
var G__59548 = path__$1;
var G__59549 = true;
current_instance__$1 = G__59547;
G__58932__$1 = G__59548;
looking_for_router_QMARK___$1 = G__59549;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [current_instance__$2,path__$1], null);

}
}
}
}
break;
}
});
/**
 * Change the route, starting at the given Fulcro class or instance (scanning for the first router from there).  `new-route` is a vector
 *   of string components to pass through to the nearest child router as the new path. The first argument is any live component
 *   or the app.  The `timeouts-and-params` are as in `change-route`.
 * 
 *   When possible (i.e. no circular references to components) you can maintain better code navigation by
 *   generating `new-route` via `path-to`.  This will allow readers of your code to quickly jump to the actual
 *   components that implement the targets when reading the code.
 * 
 *   You may include the special keyword `:..` any number of times at the beginning of `new-route` to indicate the
 *   parent(s) of `relative-class-or-instance`, which allows you to do relative routing to a sibling.
 * 
 *   ```
 *   (dr/change-route-relative this this [:.. "sibling-pattern"])
 *   ```
 * 
 *   Returns one of:
 * 
 *   `:already-there` - The old and new route are the same, and there was no request to force an idempotent routing operation.
 *   `:invalid` - The new route didn't evaluate to a valid location
 *   `:denied` - One or more on-screen targets refused to allow the routing operation
 *   `:routing` - The routing operation is in progress, but deferred operations may still delay the route becoming visible.
 *   
 */
com.fulcrologic.fulcro.routing.dynamic_routing.change_route_relative_BANG_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$change_route_relative_BANG_(var_args){
var G__58943 = arguments.length;
switch (G__58943) {
case 3:
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_relative_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_relative_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.change_route_relative_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (this_or_app,relative_class_or_instance,new_route){
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_relative_BANG_.cljs$core$IFn$_invoke$arity$4(this_or_app,relative_class_or_instance,new_route,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.change_route_relative_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (app_or_comp,relative_class_or_instance,new_route,timeouts_and_params){
var vec__58944 = com.fulcrologic.fulcro.routing.dynamic_routing.evaluate_relative_path(relative_class_or_instance,new_route);
var relative_class_or_instance__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58944,(0),null);
var new_route__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58944,(1),null);
var relative_class = (cljs.core.truth_((com.fulcrologic.fulcro.raw.components.component_QMARK_.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.raw.components.component_QMARK_.cljs$core$IFn$_invoke$arity$1(relative_class_or_instance__$1) : com.fulcrologic.fulcro.raw.components.component_QMARK_.call(null, relative_class_or_instance__$1)))?com.fulcrologic.fulcro.components.react_type(relative_class_or_instance__$1):relative_class_or_instance__$1);
var old_route = com.fulcrologic.fulcro.routing.dynamic_routing.current_route.cljs$core$IFn$_invoke$arity$2(app_or_comp,relative_class);
var new_path = com.fulcrologic.fulcro.routing.dynamic_routing.proposed_new_path.cljs$core$IFn$_invoke$arity$4(app_or_comp,relative_class,new_route__$1,timeouts_and_params);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(old_route,new_route__$1)) && (cljs.core.not(new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","force?","com.fulcrologic.fulcro.routing.dynamic-routing/force?",-1506318960).cljs$core$IFn$_invoke$arity$1(timeouts_and_params))))){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",712,10,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Request to change route, but path is the current route. Ignoring change request."], null);
}),null)),null,(420),null,null,null);

return new cljs.core.Keyword(null,"already-there","already-there",1156142236);
} else {
if(cljs.core.truth_((function (){var and__5000__auto__ = goog.DEBUG;
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not(cljs.core.seq(new_path));
} else {
return and__5000__auto__;
}
})())){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",717,10,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Could not find route targets for new-route",new_route__$1,"See https://book.fulcrologic.com/#err-dr-new-route-target-not-found"], null);
}),null)),null,(421),null,null,null);

return new cljs.core.Keyword(null,"invalid","invalid",412869516);
} else {
if((!(com.fulcrologic.fulcro.routing.dynamic_routing.can_change_route_QMARK_.cljs$core$IFn$_invoke$arity$2(app_or_comp,relative_class)))){
var app = com.fulcrologic.fulcro.raw.components.any__GT_app(app_or_comp);
var target = com.fulcrologic.fulcro.routing.dynamic_routing.target_denying_route_changes.cljs$core$IFn$_invoke$arity$2(app,relative_class);
var route_denied = com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(target,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"route-denied","route-denied",-1140339590)], 0));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",724,10,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Route request denied by on-screen target",target,". Calling component's :route-denied (if defined)."], null);
}),null)),null,(422),null,null,null);

if(cljs.core.truth_(route_denied)){
(route_denied.cljs$core$IFn$_invoke$arity$4 ? route_denied.cljs$core$IFn$_invoke$arity$4(target,relative_class_or_instance__$1,new_route__$1,timeouts_and_params) : route_denied.call(null, target,relative_class_or_instance__$1,new_route__$1,timeouts_and_params));
} else {
}

return new cljs.core.Keyword(null,"denied","denied",-1141109291);
} else {
com.fulcrologic.fulcro.routing.dynamic_routing.signal_router_leaving.cljs$core$IFn$_invoke$arity$4(app_or_comp,relative_class_or_instance__$1,new_route__$1,timeouts_and_params);

var app_59561 = com.fulcrologic.fulcro.raw.components.any__GT_app(app_or_comp);
var state_map_59562 = com.fulcrologic.fulcro.application.current_state(app_59561);
var router_59563 = relative_class_or_instance__$1;
var root_query_59564 = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(router_59563,state_map_59562);
var ast_59565 = edn_query_language.core.query__GT_ast(root_query_59564);
var root_59566 = com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_route.cljs$core$IFn$_invoke$arity$3(ast_59565,new_route__$1,state_map_59562);
var routing_actions_59567 = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.List.EMPTY);
var pessimistic_txn_59568 = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var delayed_targets_59569 = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var G__58948_59571 = root_59566;
var map__58949_59572 = G__58948_59571;
var map__58949_59573__$1 = cljs.core.__destructure_map(map__58949_59572);
var component_59574 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58949_59573__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var path_59575 = new_route__$1;
var G__58948_59577__$1 = G__58948_59571;
var path_59578__$1 = path_59575;
while(true){
var map__58963_59580 = G__58948_59577__$1;
var map__58963_59581__$1 = cljs.core.__destructure_map(map__58963_59580);
var component_59582__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58963_59581__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var path_59583__$2 = path_59578__$1;
if(cljs.core.truth_((function (){var and__5000__auto__ = component_59582__$1;
if(cljs.core.truth_(and__5000__auto__)){
return com.fulcrologic.fulcro.routing.dynamic_routing.router_QMARK_(component_59582__$1);
} else {
return and__5000__auto__;
}
})())){
var map__58964_59585 = com.fulcrologic.fulcro.routing.dynamic_routing.route_target.cljs$core$IFn$_invoke$arity$3(component_59582__$1,path_59583__$2,state_map_59562);
var map__58964_59586__$1 = cljs.core.__destructure_map(map__58964_59585);
var target_59587 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58964_59586__$1,new cljs.core.Keyword(null,"target","target",253001721));
var matching_prefix_59588 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58964_59586__$1,new cljs.core.Keyword(null,"matching-prefix","matching-prefix",-539262173));
var target_ast_59589 = (function (){var G__58966 = target_59587;
var G__58966__$1 = (((G__58966 == null))?null:com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(G__58966,state_map_59562));
if((G__58966__$1 == null)){
return null;
} else {
return edn_query_language.core.query__GT_ast(G__58966__$1);
}
})();
var prefix_length_59590 = cljs.core.count(matching_prefix_59588);
var remaining_path_59591 = cljs.core.vec(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(prefix_length_59590,path_59583__$2));
var segment_59592 = com.fulcrologic.fulcro.routing.dynamic_routing.route_segment(target_59587);
var params_59593 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (G__58948_59577__$1,path_59578__$1,map__58964_59585,map__58964_59586__$1,target_59587,matching_prefix_59588,target_ast_59589,prefix_length_59590,remaining_path_59591,segment_59592,map__58963_59580,map__58963_59581__$1,component_59582__$1,path_59583__$2,G__58948_59571,map__58949_59572,map__58949_59573__$1,component_59574,path_59575,app_59561,state_map_59562,router_59563,root_query_59564,ast_59565,root_59566,routing_actions_59567,pessimistic_txn_59568,delayed_targets_59569,vec__58944,relative_class_or_instance__$1,new_route__$1,relative_class,old_route,new_path){
return (function (p,p__58967){
var vec__58968 = p__58967;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58968,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58968,(1),null);
if((k instanceof cljs.core.Keyword)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p,k,v);
} else {
return p;
}
});})(G__58948_59577__$1,path_59578__$1,map__58964_59585,map__58964_59586__$1,target_59587,matching_prefix_59588,target_ast_59589,prefix_length_59590,remaining_path_59591,segment_59592,map__58963_59580,map__58963_59581__$1,component_59582__$1,path_59583__$2,G__58948_59571,map__58949_59572,map__58949_59573__$1,component_59574,path_59575,app_59561,state_map_59562,router_59563,root_query_59564,ast_59565,root_59566,routing_actions_59567,pessimistic_txn_59568,delayed_targets_59569,vec__58944,relative_class_or_instance__$1,new_route__$1,relative_class,old_route,new_path))
,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(timeouts_and_params,new cljs.core.Keyword(null,"error-timeout","error-timeout",-1004615840),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"deferred-timeout","deferred-timeout",1616220530)], 0)),cljs.core.map.cljs$core$IFn$_invoke$arity$3(((function (G__58948_59577__$1,path_59578__$1,map__58964_59585,map__58964_59586__$1,target_59587,matching_prefix_59588,target_ast_59589,prefix_length_59590,remaining_path_59591,segment_59592,map__58963_59580,map__58963_59581__$1,component_59582__$1,path_59583__$2,G__58948_59571,map__58949_59572,map__58949_59573__$1,component_59574,path_59575,app_59561,state_map_59562,router_59563,root_query_59564,ast_59565,root_59566,routing_actions_59567,pessimistic_txn_59568,delayed_targets_59569,vec__58944,relative_class_or_instance__$1,new_route__$1,relative_class,old_route,new_path){
return (function (a,b){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null);
});})(G__58948_59577__$1,path_59578__$1,map__58964_59585,map__58964_59586__$1,target_59587,matching_prefix_59588,target_ast_59589,prefix_length_59590,remaining_path_59591,segment_59592,map__58963_59580,map__58963_59581__$1,component_59582__$1,path_59583__$2,G__58948_59571,map__58949_59572,map__58949_59573__$1,component_59574,path_59575,app_59561,state_map_59562,router_59563,root_query_59564,ast_59565,root_59566,routing_actions_59567,pessimistic_txn_59568,delayed_targets_59569,vec__58944,relative_class_or_instance__$1,new_route__$1,relative_class,old_route,new_path))
,segment_59592,matching_prefix_59588));
var router_ident_59594 = com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(component_59582__$1,cljs.core.PersistentArrayMap.EMPTY);
var router_id_59595 = cljs.core.second(router_ident_59594);
var target_ident_59596 = com.fulcrologic.fulcro.routing.dynamic_routing.will_enter(target_59587,app_59561,params_59593);
var map__58965_59597 = cljs.core.meta(target_ident_59596);
var map__58965_59598__$1 = cljs.core.__destructure_map(map__58965_59597);
var path_ordered_QMARK__59599 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58965_59598__$1,new cljs.core.Keyword(null,"path-ordered?","path-ordered?",1510080295));
var txn_59600 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58965_59598__$1,new cljs.core.Keyword(null,"txn","txn",-469204789));
var show_early_QMARK__59601 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58965_59598__$1,new cljs.core.Keyword(null,"show-early?","show-early?",-1632022246));
var optimistic_QMARK__59602 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58965_59598__$1,new cljs.core.Keyword(null,"optimistic?","optimistic?",1829830869));
var completing_action_59603 = (function (){var or__5002__auto__ = (function (){var G__58971 = target_ident_59596;
var G__58971__$1 = (((G__58971 == null))?null:cljs.core.meta(G__58971));
if((G__58971__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"fn","fn",-1175266204).cljs$core$IFn$_invoke$arity$1(G__58971__$1);
}
})();
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = (function (){var and__5000__auto__ = optimistic_QMARK__59602;
if(cljs.core.truth_(and__5000__auto__)){
var and__5000__auto____$1 = cljs.core.seq(txn_59600);
if(and__5000__auto____$1){
return ((function (G__58948_59577__$1,path_59578__$1,and__5000__auto____$1,and__5000__auto__,or__5002__auto__,map__58964_59585,map__58964_59586__$1,target_59587,matching_prefix_59588,target_ast_59589,prefix_length_59590,remaining_path_59591,segment_59592,params_59593,router_ident_59594,router_id_59595,target_ident_59596,map__58965_59597,map__58965_59598__$1,path_ordered_QMARK__59599,txn_59600,show_early_QMARK__59601,optimistic_QMARK__59602,map__58963_59580,map__58963_59581__$1,component_59582__$1,path_59583__$2,G__58948_59571,map__58949_59572,map__58949_59573__$1,component_59574,path_59575,app_59561,state_map_59562,router_59563,root_query_59564,ast_59565,root_59566,routing_actions_59567,pessimistic_txn_59568,delayed_targets_59569,vec__58944,relative_class_or_instance__$1,new_route__$1,relative_class,old_route,new_path){
return (function (){
return com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(app_59561,txn_59600);
});
;})(G__58948_59577__$1,path_59578__$1,and__5000__auto____$1,and__5000__auto__,or__5002__auto__,map__58964_59585,map__58964_59586__$1,target_59587,matching_prefix_59588,target_ast_59589,prefix_length_59590,remaining_path_59591,segment_59592,params_59593,router_ident_59594,router_id_59595,target_ident_59596,map__58965_59597,map__58965_59598__$1,path_ordered_QMARK__59599,txn_59600,show_early_QMARK__59601,optimistic_QMARK__59602,map__58963_59580,map__58963_59581__$1,component_59582__$1,path_59583__$2,G__58948_59571,map__58949_59572,map__58949_59573__$1,component_59574,path_59575,app_59561,state_map_59562,router_59563,root_query_59564,ast_59565,root_59566,routing_actions_59567,pessimistic_txn_59568,delayed_targets_59569,vec__58944,relative_class_or_instance__$1,new_route__$1,relative_class,old_route,new_path))
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
})();
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return cljs.core.constantly(true);
}
}
})();
var event_data_59604 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"error-timeout","error-timeout",-1004615840),(5000),new cljs.core.Keyword(null,"deferred-timeout","deferred-timeout",1616220530),(20)], null),timeouts_and_params,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path-segment","path-segment",1516798997),matching_prefix_59588,new cljs.core.Keyword(null,"router","router",1091916230),cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(router_ident_59594,cljs.core.assoc,new cljs.core.Keyword(null,"component","component",1555936782),component_59582__$1),new cljs.core.Keyword(null,"target","target",253001721),cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$6(target_ident_59596,cljs.core.assoc,new cljs.core.Keyword(null,"component","component",1555936782),target_59587,new cljs.core.Keyword(null,"params","params",710516235),params_59593)], null)], 0));
if(cljs.core.truth_((function (){var and__5000__auto__ = path_ordered_QMARK__59599;
if(cljs.core.truth_(and__5000__auto__)){
return ((cljs.core.seq(txn_59600)) && (cljs.core.not(optimistic_QMARK__59602)));
} else {
return and__5000__auto__;
}
})())){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(pessimistic_txn_59568,cljs.core.into,txn_59600);

if(cljs.core.truth_(show_early_QMARK__59601)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(pessimistic_txn_59568,cljs.core.conj,(function (){var G__58972 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),target_ident_59596], null);
return (com.fulcrologic.fulcro.routing.dynamic_routing.target_ready.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.routing.dynamic_routing.target_ready.cljs$core$IFn$_invoke$arity$1(G__58972) : com.fulcrologic.fulcro.routing.dynamic_routing.target_ready.call(null, G__58972));
})());
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(delayed_targets_59569,cljs.core.conj,(function (){var G__58973 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),target_ident_59596], null);
return (com.fulcrologic.fulcro.routing.dynamic_routing.target_ready.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.routing.dynamic_routing.target_ready.cljs$core$IFn$_invoke$arity$1(G__58973) : com.fulcrologic.fulcro.routing.dynamic_routing.target_ready.call(null, G__58973));
})());
}
} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(routing_actions_59567,cljs.core.conj,((function (G__58948_59577__$1,path_59578__$1,map__58964_59585,map__58964_59586__$1,target_59587,matching_prefix_59588,target_ast_59589,prefix_length_59590,remaining_path_59591,segment_59592,params_59593,router_ident_59594,router_id_59595,target_ident_59596,map__58965_59597,map__58965_59598__$1,path_ordered_QMARK__59599,txn_59600,show_early_QMARK__59601,optimistic_QMARK__59602,completing_action_59603,event_data_59604,map__58963_59580,map__58963_59581__$1,component_59582__$1,path_59583__$2,G__58948_59571,map__58949_59572,map__58949_59573__$1,component_59574,path_59575,app_59561,state_map_59562,router_59563,root_query_59564,ast_59565,root_59566,routing_actions_59567,pessimistic_txn_59568,delayed_targets_59569,vec__58944,relative_class_or_instance__$1,new_route__$1,relative_class,old_route,new_path){
return (function (){
if(cljs.core.not(com.fulcrologic.fulcro.ui_state_machines.get_active_state(app_59561,router_id_59595))){
var state_map_59618__$1 = com.fulcrologic.fulcro.components.component__GT_state_map(app_or_comp);
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961).cljs$core$IFn$_invoke$arity$1(state_map_59618__$1),router_id_59595))){
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",781,31,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (G__58948_59577__$1,path_59578__$1,state_map_59618__$1,map__58964_59585,map__58964_59586__$1,target_59587,matching_prefix_59588,target_ast_59589,prefix_length_59590,remaining_path_59591,segment_59592,params_59593,router_ident_59594,router_id_59595,target_ident_59596,map__58965_59597,map__58965_59598__$1,path_ordered_QMARK__59599,txn_59600,show_early_QMARK__59601,optimistic_QMARK__59602,completing_action_59603,event_data_59604,map__58963_59580,map__58963_59581__$1,component_59582__$1,path_59583__$2,G__58948_59571,map__58949_59572,map__58949_59573__$1,component_59574,path_59575,app_59561,state_map_59562,router_59563,root_query_59564,ast_59565,root_59566,routing_actions_59567,pessimistic_txn_59568,delayed_targets_59569,vec__58944,relative_class_or_instance__$1,new_route__$1,relative_class,old_route,new_path){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["You are routing to a router ",router_id_59595,"whose state was not composed into the app from root. Please check your :initial-state. See https://book.fulcrologic.com/#err-dr-router-state-missing"], null);
});})(G__58948_59577__$1,path_59578__$1,state_map_59618__$1,map__58964_59585,map__58964_59586__$1,target_59587,matching_prefix_59588,target_ast_59589,prefix_length_59590,remaining_path_59591,segment_59592,params_59593,router_ident_59594,router_id_59595,target_ident_59596,map__58965_59597,map__58965_59598__$1,path_ordered_QMARK__59599,txn_59600,show_early_QMARK__59601,optimistic_QMARK__59602,completing_action_59603,event_data_59604,map__58963_59580,map__58963_59581__$1,component_59582__$1,path_59583__$2,G__58948_59571,map__58949_59572,map__58949_59573__$1,component_59574,path_59575,app_59561,state_map_59562,router_59563,root_query_59564,ast_59565,root_59566,routing_actions_59567,pessimistic_txn_59568,delayed_targets_59569,vec__58944,relative_class_or_instance__$1,new_route__$1,relative_class,old_route,new_path))
,null)),null,(424),null,null,null);
}

com.fulcrologic.fulcro.ui_state_machines.begin_BANG_.cljs$core$IFn$_invoke$arity$5(app_or_comp,com.fulcrologic.fulcro.routing.dynamic_routing.RouterStateMachine,router_id_59595,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"router","router",1091916230),com.fulcrologic.fulcro.ui_state_machines.with_actor_class(router_ident_59594,component_59582__$1)], null),event_data_59604);
} else {
com.fulcrologic.fulcro.ui_state_machines.trigger_BANG_.cljs$core$IFn$_invoke$arity$4(app_59561,router_id_59595,new cljs.core.Keyword(null,"route!","route!",-1286958144),event_data_59604);
}

var _STAR_after_render_STAR__orig_val__58974 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__58975 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__58975);

try{return (completing_action_59603.cljs$core$IFn$_invoke$arity$0 ? completing_action_59603.cljs$core$IFn$_invoke$arity$0() : completing_action_59603.call(null, ));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__58974);
}});})(G__58948_59577__$1,path_59578__$1,map__58964_59585,map__58964_59586__$1,target_59587,matching_prefix_59588,target_ast_59589,prefix_length_59590,remaining_path_59591,segment_59592,params_59593,router_ident_59594,router_id_59595,target_ident_59596,map__58965_59597,map__58965_59598__$1,path_ordered_QMARK__59599,txn_59600,show_early_QMARK__59601,optimistic_QMARK__59602,completing_action_59603,event_data_59604,map__58963_59580,map__58963_59581__$1,component_59582__$1,path_59583__$2,G__58948_59571,map__58949_59572,map__58949_59573__$1,component_59574,path_59575,app_59561,state_map_59562,router_59563,root_query_59564,ast_59565,root_59566,routing_actions_59567,pessimistic_txn_59568,delayed_targets_59569,vec__58944,relative_class_or_instance__$1,new_route__$1,relative_class,old_route,new_path))
);

if(cljs.core.seq(remaining_path_59591)){
var G__59622 = com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_route.cljs$core$IFn$_invoke$arity$3(target_ast_59589,remaining_path_59591,state_map_59562);
var G__59623 = remaining_path_59591;
G__58948_59577__$1 = G__59622;
path_59578__$1 = G__59623;
continue;
} else {
}
} else {
}
break;
}

var seq__58976_59625 = cljs.core.seq(cljs.core.deref(routing_actions_59567));
var chunk__58977_59626 = null;
var count__58978_59627 = (0);
var i__58979_59628 = (0);
while(true){
if((i__58979_59628 < count__58978_59627)){
var action_59630 = chunk__58977_59626.cljs$core$IIndexed$_nth$arity$2(null, i__58979_59628);
(action_59630.cljs$core$IFn$_invoke$arity$0 ? action_59630.cljs$core$IFn$_invoke$arity$0() : action_59630.call(null, ));


var G__59631 = seq__58976_59625;
var G__59632 = chunk__58977_59626;
var G__59633 = count__58978_59627;
var G__59634 = (i__58979_59628 + (1));
seq__58976_59625 = G__59631;
chunk__58977_59626 = G__59632;
count__58978_59627 = G__59633;
i__58979_59628 = G__59634;
continue;
} else {
var temp__5825__auto___59635 = cljs.core.seq(seq__58976_59625);
if(temp__5825__auto___59635){
var seq__58976_59636__$1 = temp__5825__auto___59635;
if(cljs.core.chunked_seq_QMARK_(seq__58976_59636__$1)){
var c__5525__auto___59639 = cljs.core.chunk_first(seq__58976_59636__$1);
var G__59640 = cljs.core.chunk_rest(seq__58976_59636__$1);
var G__59641 = c__5525__auto___59639;
var G__59642 = cljs.core.count(c__5525__auto___59639);
var G__59643 = (0);
seq__58976_59625 = G__59640;
chunk__58977_59626 = G__59641;
count__58978_59627 = G__59642;
i__58979_59628 = G__59643;
continue;
} else {
var action_59645 = cljs.core.first(seq__58976_59636__$1);
(action_59645.cljs$core$IFn$_invoke$arity$0 ? action_59645.cljs$core$IFn$_invoke$arity$0() : action_59645.call(null, ));


var G__59646 = cljs.core.next(seq__58976_59636__$1);
var G__59647 = null;
var G__59648 = (0);
var G__59649 = (0);
seq__58976_59625 = G__59646;
chunk__58977_59626 = G__59647;
count__58978_59627 = G__59648;
i__58979_59628 = G__59649;
continue;
}
} else {
}
}
break;
}

if(((cljs.core.seq(cljs.core.deref(pessimistic_txn_59568))) || (cljs.core.seq(cljs.core.deref(delayed_targets_59569))))){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",796,14,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Running pessimistic transaction",cljs.core.deref(pessimistic_txn_59568),"with delayed targets",cljs.core.deref(delayed_targets_59569)], null);
}),null)),null,(425),null,null,null);

com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$3(app_59561,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(pessimistic_txn_59568),cljs.core.reverse(cljs.core.deref(delayed_targets_59569)))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"optimistic?","optimistic?",1829830869),false], null));
} else {
}

return new cljs.core.Keyword(null,"routing","routing",1440253662);

}
}
}
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.change_route_relative_BANG_.cljs$lang$maxFixedArity = 4);

/**
 * DEPRECATED NAME: Use change-route-relative!
 */
com.fulcrologic.fulcro.routing.dynamic_routing.change_route_relative = com.fulcrologic.fulcro.routing.dynamic_routing.change_route_relative_BANG_;
/**
 * Retry a route that the receiving component just denied, and ignore this target's answer. All other targets will still
 *   be asked. This is primarily used when you want to be able to use js/confirm in a component to ask the user if
 *   they "really mean to navigate away". You MUST pass the arguments that `:route-denied` received
 *   or you can easily cause an infinite loop. Other on-screen targets can still potentially abort the route.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.retry_route_BANG_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$retry_route_BANG_(var_args){
var G__58981 = arguments.length;
switch (G__58981) {
case 3:
return com.fulcrologic.fulcro.routing.dynamic_routing.retry_route_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return com.fulcrologic.fulcro.routing.dynamic_routing.retry_route_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.retry_route_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (denied_target_instance,relative_root,path){
return com.fulcrologic.fulcro.routing.dynamic_routing.retry_route_BANG_.cljs$core$IFn$_invoke$arity$4(denied_target_instance,relative_root,path,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.retry_route_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (denied_target_instance,relative_root,path,timeouts_and_params){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",813,9,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Retrying route at the request of ",com.fulcrologic.fulcro.raw.components.component_name(denied_target_instance)], null);
}),null)),null,(426),null,null,null);

com.fulcrologic.fulcro.routing.dynamic_routing.set_force_route_flag_BANG_(denied_target_instance);

return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_relative_BANG_.cljs$core$IFn$_invoke$arity$4(denied_target_instance,relative_root,path,timeouts_and_params);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.retry_route_BANG_.cljs$lang$maxFixedArity = 4);

/**
 * Trigger a route change.
 * 
 *   * `this` - The component (or app) that is causing the route change.
 *   * `new-route` - A vector of URI components to pass to the router.
 *   * `timeouts-and-params` - A map of additional parameters and route timeouts that affect UI during deferred routes:
 *   `{:error-timeout ms :deferred-timeout ms}`.  Anything extra will appear in the `params` of `will-enter`.
 * 
 *   The error timeout is how long to wait  (default 5000ms) before showing the error-ui of a route (which must be defined on the
 *   router that is having problems).  The deferred-timeout (default 100ms) is how long to wait before showing the loading-ui of
 *   a deferred router (to prevent flicker).
 * 
 *   Returns one of:
 * 
 *   `:already-there` - The old and new route are the same, and there was no request to force an idempotent routing operation.
 *   `:invalid` - The new route didn't evaluate to a valid location
 *   `:denied` - One or more on-screen targets refused to allow the routing operation
 *   `:routing` - The routing operation is in progress, but deferred operations may still delay the route becoming visible.
 *   
 */
com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$change_route_BANG_(var_args){
var G__58983 = arguments.length;
switch (G__58983) {
case 2:
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (this$,new_route){
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$3(this$,new_route,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (this$,new_route,timeouts_and_params){
var app = com.fulcrologic.fulcro.raw.components.any__GT_app(this$);
var root = com.fulcrologic.fulcro.application.root_class(app);
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_relative_BANG_.cljs$core$IFn$_invoke$arity$4(app,root,new_route,timeouts_and_params);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$lang$maxFixedArity = 3);

com.fulcrologic.fulcro.routing.dynamic_routing.change_route = com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_;
/**
 * Run a runtime validation on route targets to verify that they at least declare a route-segment that is a vector.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.validate_route_targets = (function com$fulcrologic$fulcro$routing$dynamic_routing$validate_route_targets(router_instance){
if(cljs.core.truth_((function (){var and__5000__auto__ = router_instance;
if(cljs.core.truth_(and__5000__auto__)){
var and__5000__auto____$1 = com.fulcrologic.fulcro.raw.components.component_instance_QMARK_(router_instance);
if(and__5000__auto____$1){
return goog.DEBUG;
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
})())){
var state_map = com.fulcrologic.fulcro.application.current_state(router_instance);
var seq__58985 = cljs.core.seq(com.fulcrologic.fulcro.routing.dynamic_routing.get_targets.cljs$core$IFn$_invoke$arity$2(router_instance,state_map));
var chunk__58987 = null;
var count__58988 = (0);
var i__58989 = (0);
while(true){
if((i__58989 < count__58988)){
var t = chunk__58987.cljs$core$IIndexed$_nth$arity$2(null, i__58989);
var segment_59666 = com.fulcrologic.fulcro.routing.dynamic_routing.route_segment(t);
var valid_QMARK__59667 = ((cljs.core.vector_QMARK_(segment_59666)) && ((((!(cljs.core.empty_QMARK_(segment_59666)))) && (cljs.core.every_QMARK_(((function (seq__58985,chunk__58987,count__58988,i__58989,segment_59666,t,state_map){
return (function (p1__58984_SHARP_){
return (((p1__58984_SHARP_ instanceof cljs.core.Keyword)) || (typeof p1__58984_SHARP_ === 'string'));
});})(seq__58985,chunk__58987,count__58988,i__58989,segment_59666,t,state_map))
,segment_59666)))));
if(valid_QMARK__59667){
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",865,11,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (seq__58985,chunk__58987,count__58988,i__58989,segment_59666,valid_QMARK__59667,t,state_map){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Route target ",com.fulcrologic.fulcro.raw.components.component_name(t),"of router",com.fulcrologic.fulcro.raw.components.component_name(router_instance),"does not declare a valid :route-segment. Route segments must be non-empty vector that contain only strings","and keywords. See https://book.fulcrologic.com/#err-dr-target-lacks-r-segment"], null);
});})(seq__58985,chunk__58987,count__58988,i__58989,segment_59666,valid_QMARK__59667,t,state_map))
,null)),null,(429),null,null,null);
}


var G__59706 = seq__58985;
var G__59707 = chunk__58987;
var G__59708 = count__58988;
var G__59709 = (i__58989 + (1));
seq__58985 = G__59706;
chunk__58987 = G__59707;
count__58988 = G__59708;
i__58989 = G__59709;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__58985);
if(temp__5825__auto__){
var seq__58985__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__58985__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__58985__$1);
var G__59710 = cljs.core.chunk_rest(seq__58985__$1);
var G__59711 = c__5525__auto__;
var G__59712 = cljs.core.count(c__5525__auto__);
var G__59713 = (0);
seq__58985 = G__59710;
chunk__58987 = G__59711;
count__58988 = G__59712;
i__58989 = G__59713;
continue;
} else {
var t = cljs.core.first(seq__58985__$1);
var segment_59714 = com.fulcrologic.fulcro.routing.dynamic_routing.route_segment(t);
var valid_QMARK__59715 = ((cljs.core.vector_QMARK_(segment_59714)) && ((((!(cljs.core.empty_QMARK_(segment_59714)))) && (cljs.core.every_QMARK_(((function (seq__58985,chunk__58987,count__58988,i__58989,segment_59714,t,seq__58985__$1,temp__5825__auto__,state_map){
return (function (p1__58984_SHARP_){
return (((p1__58984_SHARP_ instanceof cljs.core.Keyword)) || (typeof p1__58984_SHARP_ === 'string'));
});})(seq__58985,chunk__58987,count__58988,i__58989,segment_59714,t,seq__58985__$1,temp__5825__auto__,state_map))
,segment_59714)))));
if(valid_QMARK__59715){
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",865,11,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (seq__58985,chunk__58987,count__58988,i__58989,segment_59714,valid_QMARK__59715,t,seq__58985__$1,temp__5825__auto__,state_map){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Route target ",com.fulcrologic.fulcro.raw.components.component_name(t),"of router",com.fulcrologic.fulcro.raw.components.component_name(router_instance),"does not declare a valid :route-segment. Route segments must be non-empty vector that contain only strings","and keywords. See https://book.fulcrologic.com/#err-dr-target-lacks-r-segment"], null);
});})(seq__58985,chunk__58987,count__58988,i__58989,segment_59714,valid_QMARK__59715,t,seq__58985__$1,temp__5825__auto__,state_map))
,null)),null,(430),null,null,null);
}


var G__59716 = cljs.core.next(seq__58985__$1);
var G__59717 = null;
var G__59718 = (0);
var G__59719 = (0);
seq__58985 = G__59716;
chunk__58987 = G__59717;
count__58988 = G__59718;
i__58989 = G__59719;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
/**
 * Returns a sequence of all of the routers reachable in the query of the app.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.all_reachable_routers = (function com$fulcrologic$fulcro$routing$dynamic_routing$all_reachable_routers(state_map,component_class){
var root_query = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(component_class,state_map);
var map__58992 = edn_query_language.core.query__GT_ast(root_query);
var map__58992__$1 = cljs.core.__destructure_map(map__58992);
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58992__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var get_routers = (function com$fulcrologic$fulcro$routing$dynamic_routing$all_reachable_routers_$_get_routers_STAR_(nodes){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__58993){
var map__58994 = p__58993;
var map__58994__$1 = cljs.core.__destructure_map(map__58994);
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58994__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var children__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58994__$1,new cljs.core.Keyword(null,"children","children",-940561982));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(((com.fulcrologic.fulcro.routing.dynamic_routing.router_QMARK_(component))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,component):acc),com$fulcrologic$fulcro$routing$dynamic_routing$all_reachable_routers_$_get_routers_STAR_(children__$1));
}),cljs.core.PersistentVector.EMPTY,nodes);
});
return get_routers(children);
});
/**
 * Initialize the routing system.  This ensures that all routers have state machines in app state.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.initialize_BANG_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$initialize_BANG_(app){
var state_map = com.fulcrologic.fulcro.application.current_state(app);
var root = com.fulcrologic.fulcro.application.root_class(app);
var routers = com.fulcrologic.fulcro.routing.dynamic_routing.all_reachable_routers(state_map,root);
var tx = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (r){
var router_ident = com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(r,cljs.core.PersistentArrayMap.EMPTY);
var router_id = cljs.core.second(router_ident);
var G__58995 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),router_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583).cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.routing.dynamic_routing.RouterStateMachine),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path-segment","path-segment",1516798997),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"router","router",1091916230),cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(router_ident,cljs.core.assoc,new cljs.core.Keyword(null,"component","component",1555936782),r)], null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"router","router",1091916230),com.fulcrologic.fulcro.ui_state_machines.with_actor_class(router_ident,r)], null)], null);
return (com.fulcrologic.fulcro.ui_state_machines.begin.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.ui_state_machines.begin.cljs$core$IFn$_invoke$arity$1(G__58995) : com.fulcrologic.fulcro.ui_state_machines.begin.call(null, G__58995));
}),routers);
return com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(app,tx);
});
/**
 * Returns the given `prefix` with the TargetClass segment appended onto it, replacing the final elements with the
 * given (optional) path args.
 * 
 *   ```
 *   (defsc X [_ _]
 *  {:route-segment ["a" :b]})
 * 
 *   (into ["f" "g"] X "22") ; => ["f" "g" "a" "22"]
 *   ```
 *   
 */
com.fulcrologic.fulcro.routing.dynamic_routing.into_path = (function com$fulcrologic$fulcro$routing$dynamic_routing$into_path(var_args){
var args__5732__auto__ = [];
var len__5726__auto___59727 = arguments.length;
var i__5727__auto___59728 = (0);
while(true){
if((i__5727__auto___59728 < len__5726__auto___59727)){
args__5732__auto__.push((arguments[i__5727__auto___59728]));

var G__59730 = (i__5727__auto___59728 + (1));
i__5727__auto___59728 = G__59730;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return com.fulcrologic.fulcro.routing.dynamic_routing.into_path.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(com.fulcrologic.fulcro.routing.dynamic_routing.into_path.cljs$core$IFn$_invoke$arity$variadic = (function (prefix,TargetClass,path_args){
var nargs = cljs.core.count(path_args);
var path = (function (){var G__58999 = TargetClass;
var G__58999__$1 = (((G__58999 == null))?null:com.fulcrologic.fulcro.raw.components.component_options(G__58999));
if((G__58999__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"route-segment","route-segment",1812935886).cljs$core$IFn$_invoke$arity$1(G__58999__$1);
}
})();
var static_elements = (cljs.core.count(path) - nargs);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(prefix,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.take.cljs$core$IFn$_invoke$arity$2(static_elements,path),path_args));
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.into_path.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(com.fulcrologic.fulcro.routing.dynamic_routing.into_path.cljs$lang$applyTo = (function (seq58996){
var G__58997 = cljs.core.first(seq58996);
var seq58996__$1 = cljs.core.next(seq58996);
var G__58998 = cljs.core.first(seq58996__$1);
var seq58996__$2 = cljs.core.next(seq58996__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__58997,G__58998,seq58996__$2);
}));

/**
 * Returns the route segment of the given TargetClass with the trailing elements replaced by path-args.
 * 
 *   ```
 *   (defsc X [_ _]
 *  {:route-segment ["a" :b]})
 * 
 *   (subpath X "22") ; => ["a" "22"]
 *   ```
 *   
 */
com.fulcrologic.fulcro.routing.dynamic_routing.subpath = (function com$fulcrologic$fulcro$routing$dynamic_routing$subpath(var_args){
var args__5732__auto__ = [];
var len__5726__auto___59735 = arguments.length;
var i__5727__auto___59736 = (0);
while(true){
if((i__5727__auto___59736 < len__5726__auto___59735)){
args__5732__auto__.push((arguments[i__5727__auto___59736]));

var G__59738 = (i__5727__auto___59736 + (1));
i__5727__auto___59736 = G__59738;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return com.fulcrologic.fulcro.routing.dynamic_routing.subpath.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(com.fulcrologic.fulcro.routing.dynamic_routing.subpath.cljs$core$IFn$_invoke$arity$variadic = (function (TargetClass,path_args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(com.fulcrologic.fulcro.routing.dynamic_routing.into_path,cljs.core.PersistentVector.EMPTY,TargetClass,path_args);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.subpath.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(com.fulcrologic.fulcro.routing.dynamic_routing.subpath.cljs$lang$applyTo = (function (seq59000){
var G__59001 = cljs.core.first(seq59000);
var seq59000__$1 = cljs.core.next(seq59000);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__59001,seq59000__$1);
}));

/**
 * Convert a sequence of router targets and parameters into a vector of strings that represents the target route. Parameters
 *   can be sequenced inline:
 * 
 *   ```
 *   (defsc A [_ _]
 *  {:route-segment ["a" :a-param]})
 * 
 *   (defsc B [_ _]
 *  {:route-segment ["b" :b-param]})
 * 
 *   (route-segment A a-param1 B b-param ...)
 *   ```
 * 
 *   where the parameters for a target immediately follow the component that requires them. Alternatively
 *   one can specify all of the parameters at the end as a single map using the parameter names that are used in
 *   the component `:route-segment` itself:
 * 
 *   ```
 *   (defsc A [_ _]
 *  {:route-segment ["a" :a-param]})
 * 
 *   (route-segment A B C D {:a-param 1})
 *   ```
 *   
 */
com.fulcrologic.fulcro.routing.dynamic_routing.path_to = (function com$fulcrologic$fulcro$routing$dynamic_routing$path_to(var_args){
var args__5732__auto__ = [];
var len__5726__auto___59741 = arguments.length;
var i__5727__auto___59742 = (0);
while(true){
if((i__5727__auto___59742 < len__5726__auto___59741)){
args__5732__auto__.push((arguments[i__5727__auto___59742]));

var G__59743 = (i__5727__auto___59742 + (1));
i__5727__auto___59742 = G__59743;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.routing.dynamic_routing.path_to.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.routing.dynamic_routing.path_to.cljs$core$IFn$_invoke$arity$variadic = (function (targets_and_params){
var segments = cljs.core.seq(cljs.core.partition_by.cljs$core$IFn$_invoke$arity$2((function (p1__59002_SHARP_){
var and__5000__auto__ = cljs.core.fn_QMARK_(p1__59002_SHARP_);
if(and__5000__auto__){
var or__5002__auto__ = (com.fulcrologic.fulcro.raw.components.component_QMARK_.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.raw.components.component_QMARK_.cljs$core$IFn$_invoke$arity$1(p1__59002_SHARP_) : com.fulcrologic.fulcro.raw.components.component_QMARK_.call(null, p1__59002_SHARP_));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return com.fulcrologic.fulcro.raw.components.component_class_QMARK_(p1__59002_SHARP_);
}
} else {
return and__5000__auto__;
}
}),targets_and_params));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(segments))) && (cljs.core.map_QMARK_(cljs.core.first(cljs.core.second(segments)))))){
var path = cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p1__59003_SHARP_){
return com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(p1__59003_SHARP_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"route-segment","route-segment",1812935886)], 0));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.first(segments)], 0));
var params = cljs.core.first(cljs.core.second(segments));
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(params,i,i);
}),path);
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (path,p__59006){
var vec__59007 = p__59006;
var classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__59007,(0),null);
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__59007,(1),null);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(path,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p1__59004_SHARP_){
return com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(p1__59004_SHARP_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"route-segment","route-segment",1812935886)], 0));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.butlast(classes)], 0))),cljs.core.apply.cljs$core$IFn$_invoke$arity$3(com.fulcrologic.fulcro.routing.dynamic_routing.subpath,cljs.core.last(classes),params));
}),cljs.core.PersistentVector.EMPTY,cljs.core.partition_all.cljs$core$IFn$_invoke$arity$2((2),segments));
}
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.path_to.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.routing.dynamic_routing.path_to.cljs$lang$applyTo = (function (seq59005){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq59005));
}));

com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path_components = (function com$fulcrologic$fulcro$routing$dynamic_routing$resolve_path_components(var_args){
var G__59013 = arguments.length;
switch (G__59013) {
case 2:
return com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path_components.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path_components.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path_components.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path_components.cljs$core$IFn$_invoke$arity$2 = (function (StartingClass,RouteTarget){
return com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path_components.cljs$core$IFn$_invoke$arity$4(StartingClass,RouteTarget,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path_components.cljs$core$IFn$_invoke$arity$3 = (function (StartingClass,RouteTarget,base_path){
return com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path_components.cljs$core$IFn$_invoke$arity$4(StartingClass,RouteTarget,base_path,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path_components.cljs$core$IFn$_invoke$arity$4 = (function (StartingClass,RouteTarget,base_path,p__59014){
var map__59015 = p__59014;
var map__59015__$1 = cljs.core.__destructure_map(map__59015);
var options = map__59015__$1;
var ParentRouter = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59015__$1,new cljs.core.Keyword(null,"ParentRouter","ParentRouter",-1372476111));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(StartingClass,RouteTarget)){
var parent = cljs.core.last(base_path);
var final_path = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(base_path,RouteTarget);
if(((com.fulcrologic.fulcro.routing.dynamic_routing.router_QMARK_(parent)) && ((((ParentRouter == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ParentRouter,parent)))))){
return final_path;
} else {
return null;
}
} else {
var path = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(base_path,StartingClass);
if(com.fulcrologic.fulcro.routing.dynamic_routing.router_QMARK_(StartingClass)){
var targets = com.fulcrologic.fulcro.routing.dynamic_routing.get_targets.cljs$core$IFn$_invoke$arity$2(StartingClass,com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_);
return cljs.core.first(cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__59010_SHARP_){
return com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path_components.cljs$core$IFn$_invoke$arity$4(p1__59010_SHARP_,RouteTarget,path,options);
}),targets));
} else {
var candidates = cljs.core.keep.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"component","component",1555936782),new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(edn_query_language.core.query__GT_ast(com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(StartingClass))));
return cljs.core.first(cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__59011_SHARP_){
return com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path_components.cljs$core$IFn$_invoke$arity$4(p1__59011_SHARP_,RouteTarget,path,options);
}),candidates));
}
}
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path_components.cljs$lang$maxFixedArity = 4);

/**
 * Attempts to resolve a path from StartingClass to the given RouteTarget. Can also be passed `resolved-components`, which
 * is the output of `resolve-path-components`. If ParentRouter is supplied, then if RouteTarget is in multiple places in the
 * UI this function will only consider the path that includes ParentRouter as the immediate parent of the target.
 * 
 * NOTE: This function works against static queries UNLESS you bind `rc/*query-state*` to `app/current-state`.
 * 
 * Returns a vector of route segments. Any keywords in the result will be replaced by the values from `params`, if present.
 * 
 * Returns nil if no path can be found. Be sure rc/*query-state* is bound to current app state if you want to include dynamic queries.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path = (function com$fulcrologic$fulcro$routing$dynamic_routing$resolve_path(var_args){
var G__59018 = arguments.length;
switch (G__59018) {
case 2:
return com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path.cljs$core$IFn$_invoke$arity$2 = (function (resolved_components,params){
if(cljs.core.seq(resolved_components)){
var base_path = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (p1__59016_SHARP_){
return com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(p1__59016_SHARP_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"route-segment","route-segment",1812935886)], 0));
})),resolved_components);
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (ele){
if(cljs.core.contains_QMARK_(params,ele)){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(params,ele));
} else {
return ele;
}
}),base_path);
} else {
return null;
}
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path.cljs$core$IFn$_invoke$arity$3 = (function (StartingClass,RouteTarget,params){
return com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path.cljs$core$IFn$_invoke$arity$4(StartingClass,RouteTarget,params,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path.cljs$core$IFn$_invoke$arity$4 = (function (StartingClass,RouteTarget,params,p__59019){
var map__59020 = p__59019;
var map__59020__$1 = cljs.core.__destructure_map(map__59020);
var options = map__59020__$1;
var ParentRouter = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59020__$1,new cljs.core.Keyword(null,"ParentRouter","ParentRouter",-1372476111));
if(cljs.core.truth_(new cljs.core.Keyword(null,"route-segment","route-segment",1812935886).cljs$core$IFn$_invoke$arity$1((com.fulcrologic.fulcro.components.component_options.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.component_options.cljs$core$IFn$_invoke$arity$1(RouteTarget) : com.fulcrologic.fulcro.components.component_options.call(null, RouteTarget))))){
return com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path_components.cljs$core$IFn$_invoke$arity$4(StartingClass,RouteTarget,cljs.core.PersistentVector.EMPTY,options),params);
} else {
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",1141,6,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Attempt to resolve the path to a component that has no route-segment"], null);
}),null)),null,(431),null,null,null);
}
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path.cljs$lang$maxFixedArity = 4);

/**
 * Given a new-route path (vector of strings): resolves the target (class) that is the ultimate target of that path.
 */
com.fulcrologic.fulcro.routing.dynamic_routing.resolve_target = (function com$fulcrologic$fulcro$routing$dynamic_routing$resolve_target(app,new_route){
var state_map = com.fulcrologic.fulcro.application.current_state(app);
var root_query = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.application.root_class(app),state_map);
var ast = edn_query_language.core.query__GT_ast(root_query);
var root = com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_route.cljs$core$IFn$_invoke$arity$3(ast,new_route,state_map);
var G__59022 = root;
var map__59023 = G__59022;
var map__59023__$1 = cljs.core.__destructure_map(map__59023);
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59023__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var path = new_route;
var G__59022__$1 = G__59022;
var path__$1 = path;
while(true){
var map__59027 = G__59022__$1;
var map__59027__$1 = cljs.core.__destructure_map(map__59027);
var component__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59027__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var path__$2 = path__$1;
if(cljs.core.truth_((function (){var and__5000__auto__ = component__$1;
if(cljs.core.truth_(and__5000__auto__)){
return com.fulcrologic.fulcro.routing.dynamic_routing.router_QMARK_(component__$1);
} else {
return and__5000__auto__;
}
})())){
var map__59028 = com.fulcrologic.fulcro.routing.dynamic_routing.route_target.cljs$core$IFn$_invoke$arity$3(component__$1,path__$2,state_map);
var map__59028__$1 = cljs.core.__destructure_map(map__59028);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59028__$1,new cljs.core.Keyword(null,"target","target",253001721));
var matching_prefix = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59028__$1,new cljs.core.Keyword(null,"matching-prefix","matching-prefix",-539262173));
var target_ast = (function (){var G__59029 = target;
var G__59029__$1 = (((G__59029 == null))?null:com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(G__59029,state_map));
if((G__59029__$1 == null)){
return null;
} else {
return edn_query_language.core.query__GT_ast(G__59029__$1);
}
})();
var prefix_length = cljs.core.count(matching_prefix);
var remaining_path = cljs.core.vec(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(prefix_length,path__$2));
if(cljs.core.seq(remaining_path)){
var G__59771 = com.fulcrologic.fulcro.routing.dynamic_routing.ast_node_for_route.cljs$core$IFn$_invoke$arity$3(target_ast,remaining_path,state_map);
var G__59772 = remaining_path;
G__59022__$1 = G__59771;
path__$1 = G__59772;
continue;
} else {
return target;
}
} else {
return null;
}
break;
}
});
var active_routes_STAR_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$active_routes_STAR_(state_map,p__59043,parent_component,ast_nodes){
var map__59044 = p__59043;
var map__59044__$1 = cljs.core.__destructure_map(map__59044);
var result = map__59044__$1;
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59044__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var segment = (function (){var G__59045 = parent_component;
if((G__59045 == null)){
return null;
} else {
return com.fulcrologic.fulcro.routing.dynamic_routing.route_segment(G__59045);
}
})();
if((parent_component == null)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [result], null);
} else {
if(cljs.core.truth_((function (){var G__59046 = parent_component;
if((G__59046 == null)){
return null;
} else {
return com.fulcrologic.fulcro.routing.dynamic_routing.router_QMARK_(G__59046);
}
})())){
var ident = (function (){var G__59047 = parent_component;
if((G__59047 == null)){
return null;
} else {
var G__59048 = G__59047;
var G__59049 = cljs.core.PersistentArrayMap.EMPTY;
return (com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$2(G__59048,G__59049) : com.fulcrologic.fulcro.components.get_ident.call(null, G__59048,G__59049));
}
})();
var active_ast_node = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__59050){
var map__59051 = p__59050;
var map__59051__$1 = cljs.core.__destructure_map(map__59051);
var dispatch_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59051__$1,new cljs.core.Keyword(null,"dispatch-key","dispatch-key",733619510));
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871),dispatch_key);
}),ast_nodes));
var new_parent = new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1(active_ast_node);
return com$fulcrologic$fulcro$routing$dynamic_routing$active_routes_STAR_(state_map,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path","path",-188191168),cljs.core.into.cljs$core$IFn$_invoke$arity$2(path,segment),new cljs.core.Keyword(null,"target-class","target-class",-955367984),parent_component], null),new_parent,new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(active_ast_node));
} else {
if(cljs.core.truth_(segment)){
var subpath = cljs.core.into.cljs$core$IFn$_invoke$arity$2(path,segment);
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__59052){
var map__59053 = p__59052;
var map__59053__$1 = cljs.core.__destructure_map(map__59053);
var node = map__59053__$1;
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59053__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59053__$1,new cljs.core.Keyword(null,"children","children",-940561982));
return com$fulcrologic$fulcro$routing$dynamic_routing$active_routes_STAR_(state_map,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path","path",-188191168),subpath,new cljs.core.Keyword(null,"target-class","target-class",-955367984),parent_component], null),component,children);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([ast_nodes], 0));
} else {
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__59054){
var map__59055 = p__59054;
var map__59055__$1 = cljs.core.__destructure_map(map__59055);
var node = map__59055__$1;
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59055__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59055__$1,new cljs.core.Keyword(null,"children","children",-940561982));
return com$fulcrologic$fulcro$routing$dynamic_routing$active_routes_STAR_(state_map,result,component,children);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([ast_nodes], 0));

}
}
}
});
/**
 * Return a sequence of the leaf router targets that are routed to in the given app using the active dynamic query
 *   and app state.
 * 
 *   The return values are maps that currently contain a `:path` and `:target-component` key.
 *   Future versions of this function may include additional information.
 * 
 *   Note that dynamic routing purposely supports the ability to have more than one UI path active at a time, as it
 *   is NOT a strict URL-style UI router. However, since your code is ultimately responsible for determining what
 *   parts of the active query are rendered, it is possible for this to return routes that are available (in the props
 *   of components) but are not being rendered by your logic. Thus, the return value of this function isn't necessarily
 *   proof that the routes listed are visible to the user.
 * 
 *   WARNING: If you use disconnected roots (via hooks or otherwise), then you must specify a starting component that is
 *   well-connected (graph/state) from which to scan, and will get back paths relative to that `starting-from`
 *   (a component, element, or factory if you're using factory-based dynamic queries).
 */
com.fulcrologic.fulcro.routing.dynamic_routing.active_routes = (function com$fulcrologic$fulcro$routing$dynamic_routing$active_routes(var_args){
var G__59057 = arguments.length;
switch (G__59057) {
case 1:
return com.fulcrologic.fulcro.routing.dynamic_routing.active_routes.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.routing.dynamic_routing.active_routes.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.active_routes.cljs$core$IFn$_invoke$arity$1 = (function (app){
return com.fulcrologic.fulcro.routing.dynamic_routing.active_routes.cljs$core$IFn$_invoke$arity$2(app,com.fulcrologic.fulcro.application.root_class(app));
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.active_routes.cljs$core$IFn$_invoke$arity$2 = (function (app,starting_from){
var state_map = com.fulcrologic.fulcro.application.current_state(app);
var query = com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$2(starting_from,state_map);
var map__59058 = edn_query_language.core.query__GT_ast(query);
var map__59058__$1 = cljs.core.__destructure_map(map__59058);
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59058__$1,new cljs.core.Keyword(null,"children","children",-940561982));
return cljs.core.set(active_routes_STAR_(state_map,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),cljs.core.PersistentVector.EMPTY], null),starting_from,children));
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.active_routes.cljs$lang$maxFixedArity = 2);

/**
 * The functional version of `defrouter`. Generates a router (particularly useful at runtime for use with dynamically
 * generated components) with the given Fulcro registry-key and list of router-targets. The options map can contain:
 * 
 * * `:render` - A (fn [this props] ...) that needs to function as described in `defrouter`.
 * * Any other options that `defrouter` supports in the component options map.
 * 
 */
com.fulcrologic.fulcro.routing.dynamic_routing.dynamic_router = (function com$fulcrologic$fulcro$routing$dynamic_routing$dynamic_router(var_args){
var G__59060 = arguments.length;
switch (G__59060) {
case 2:
return com.fulcrologic.fulcro.routing.dynamic_routing.dynamic_router.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.routing.dynamic_routing.dynamic_router.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.dynamic_router.cljs$core$IFn$_invoke$arity$2 = (function (registry_key,targets){
return com.fulcrologic.fulcro.routing.dynamic_routing.dynamic_router.cljs$core$IFn$_invoke$arity$3(registry_key,targets,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.dynamic_router.cljs$core$IFn$_invoke$arity$3 = (function (router_registry_key,router_targets,p__59061){
var map__59062 = p__59061;
var map__59062__$1 = cljs.core.__destructure_map(map__59062);
var options = map__59062__$1;
var render = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59062__$1,new cljs.core.Keyword(null,"render","render",-1408033454));
var always_render_body_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59062__$1,new cljs.core.Keyword(null,"always-render-body?","always-render-body?",-17343266));
var main_target = cljs.core.first(router_targets);
var alt_targets = cljs.core.rest(router_targets);
var static_query = cljs.core.into.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("uism","asm-id","uism/asm-id",-1720055638),router_registry_key], null),new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","dynamic-router-targets","com.fulcrologic.fulcro.routing.dynamic-routing/dynamic-router-targets",-786251636),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871),(function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(main_target);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Route target has no query! ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.component_name(main_target))].join(''),cljs.core.PersistentArrayMap.EMPTY);
}
})()], null)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$1((function (idx,c){
return cljs.core.PersistentArrayMap.createAsIfByAssoc([cljs.core.keyword.cljs$core$IFn$_invoke$arity$2("alt",idx),com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(c)]);
})),alt_targets);
var addl_options = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(options,new cljs.core.Keyword(null,"render","render",-1408033454));
var user_render = (function (this$,router_props,route_factory,current_route_target_props){
if(cljs.core.truth_(render)){
var current_state = com.fulcrologic.fulcro.ui_state_machines.get_active_state(this$,router_registry_key);
var state_map = com.fulcrologic.fulcro.components.component__GT_state_map(this$);
var sm_env = com.fulcrologic.fulcro.ui_state_machines.state_machine_env.cljs$core$IFn$_invoke$arity$5(state_map,null,router_registry_key,new cljs.core.Keyword(null,"fake","fake",-904846741),cljs.core.PersistentArrayMap.EMPTY);
var pending_path_segment = ((com.fulcrologic.fulcro.ui_state_machines.asm_active_QMARK_(this$,router_registry_key))?com.fulcrologic.fulcro.ui_state_machines.retrieve.cljs$core$IFn$_invoke$arity$2(sm_env,new cljs.core.Keyword(null,"pending-path-segment","pending-path-segment",-1932876268)):null);
var render_props = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"pending-path-segment","pending-path-segment",-1932876268),pending_path_segment,new cljs.core.Keyword(null,"route-props","route-props",-836332554),current_route_target_props,new cljs.core.Keyword(null,"route-factory","route-factory",-1848194547),route_factory,new cljs.core.Keyword(null,"current-state","current-state",1048284452),current_state,new cljs.core.Keyword(null,"router-state","router-state",-429575372),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(router_props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),router_registry_key], null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","local-storage","com.fulcrologic.fulcro.ui-state-machines/local-storage",969391206)], null))], null);
return (render.cljs$core$IFn$_invoke$arity$2 ? render.cljs$core$IFn$_invoke$arity$2(this$,render_props) : render.call(null, this$,render_props));
} else {
return null;
}
});
var render_target_only = (function (this$,route_target_props,route_factory){
if(cljs.core.truth_(route_factory)){
var G__59063 = route_target_props;
var G__59064 = com.fulcrologic.fulcro.raw.components.get_computed.cljs$core$IFn$_invoke$arity$1(this$);
return (route_factory.cljs$core$IFn$_invoke$arity$2 ? route_factory.cljs$core$IFn$_invoke$arity$2(G__59063,G__59064) : route_factory.call(null, G__59063,G__59064));
} else {
return null;
}
});
return com.fulcrologic.fulcro.components.sc(router_registry_key,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([addl_options,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"preserve-dynamic-query?","preserve-dynamic-query?",893339297),true,new cljs.core.Keyword(null,"router-targets","router-targets",1582229763),router_targets,new cljs.core.Keyword(null,"ident","ident",-742346),(function (_,___$1){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961),router_registry_key], null);
}),new cljs.core.Keyword(null,"componentDidMount","componentDidMount",955710936),(function (this$){
return com.fulcrologic.fulcro.routing.dynamic_routing.validate_route_targets(this$);
}),new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),(function (params){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961),router_registry_key,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871),com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(cljs.core.first(router_targets),params)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$1((function (idx,c){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(["alt",cljs.core.str.cljs$core$IFn$_invoke$arity$1(idx)].join('')),com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(c,cljs.core.PersistentArrayMap.EMPTY)], null);
})),cljs.core.rest(router_targets));
}),new cljs.core.Keyword(null,"query","query",-1288509510),(function (_){
return static_query;
})], null)], 0)),(function (this$,p__59065){
var map__59066 = p__59065;
var map__59066__$1 = cljs.core.__destructure_map(map__59066);
var props = map__59066__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59066__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961));
var current_route = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59066__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871));
var TargetClass = com.fulcrologic.fulcro.routing.dynamic_routing.current_route_class(this$);
var route_factory = (function (){var G__59067 = TargetClass;
if((G__59067 == null)){
return null;
} else {
return com.fulcrologic.fulcro.components.computed_factory.cljs$core$IFn$_invoke$arity$1(G__59067);
}
})();
if(cljs.core.truth_(always_render_body_QMARK_)){
return user_render(this$,props,route_factory,current_route);
} else {
var TargetClass__$1 = com.fulcrologic.fulcro.routing.dynamic_routing.current_route_class(this$);
var current_state = com.fulcrologic.fulcro.ui_state_machines.get_active_state(this$,router_registry_key);
var states_to_render_route = (cljs.core.truth_(render)?new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"deferred","deferred",-1976960688),null,new cljs.core.Keyword(null,"routed","routed",-707282794),null], null), null):cljs.core.constantly(true));
if(cljs.core.truth_((states_to_render_route.cljs$core$IFn$_invoke$arity$1 ? states_to_render_route.cljs$core$IFn$_invoke$arity$1(current_state) : states_to_render_route.call(null, current_state)))){
return render_target_only(this$,current_route,route_factory);
} else {
return user_render(this$,props,route_factory,current_route);
}
}
}));
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.dynamic_router.cljs$lang$maxFixedArity = 3);

/**
 * Mutation helper. Add a target to a router dynamically.
 * 
 *   `router` - A class or registry key
 *   `target` - A class or registry key
 *   `initial-state-params` - Parameters to pass to `get-initial-state` when merging the state of `target` (which is only
 *   done if that component has a stable ident).
 *   
 */
com.fulcrologic.fulcro.routing.dynamic_routing.add_route_target_STAR_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$add_route_target_STAR_(state_map,p__59068){
var map__59069 = p__59068;
var map__59069__$1 = cljs.core.__destructure_map(map__59069);
var router = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59069__$1,new cljs.core.Keyword(null,"router","router",1091916230));
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59069__$1,new cljs.core.Keyword(null,"target","target",253001721));
var initial_state_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59069__$1,new cljs.core.Keyword(null,"initial-state-params","initial-state-params",-1309280029));
var Router = com.fulcrologic.fulcro.raw.components.registry_key__GT_class(router);
var Target = com.fulcrologic.fulcro.raw.components.registry_key__GT_class(target);
var stable_ident_QMARK_ = (function (){var and__5000__auto__ = Target;
if(cljs.core.truth_(and__5000__auto__)){
return (!((cljs.core.second((function (){var G__59070 = Target;
var G__59071 = cljs.core.PersistentArrayMap.EMPTY;
return (com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$2(G__59070,G__59071) : com.fulcrologic.fulcro.components.get_ident.call(null, G__59070,G__59071));
})()) == null)));
} else {
return and__5000__auto__;
}
})();
var router_ident = com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(Router,cljs.core.PersistentArrayMap.EMPTY);
var target_registry_key = com.fulcrologic.fulcro.raw.components.class__GT_registry_key(Target);
if((Router == null)){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",1295,9,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Cannot add route target. Router class not found for",router], null);
}),null)),null,(432),null,null,null);

return state_map;
} else {
if((Target == null)){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",1300,9,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Cannot add route target. Target class not found for",target], null);
}),null)),null,(433),null,null,null);

return state_map;
} else {
if((!(cljs.core.vector_QMARK_(com.fulcrologic.fulcro.routing.dynamic_routing.route_segment(Target))))){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",1305,9,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Cannot add route target. Target class has a missing or invalid :route-segment: ",target], null);
}),null)),null,(434),null,null,null);

return state_map;
} else {
var G__59072 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state_map,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(router_ident,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","dynamic-router-targets","com.fulcrologic.fulcro.routing.dynamic-routing/dynamic-router-targets",-786251636)),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),target_registry_key);
if(cljs.core.truth_(stable_ident_QMARK_)){
return com.fulcrologic.fulcro.algorithms.merge.merge_component(G__59072,Target,com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(Target,(function (){var or__5002__auto__ = initial_state_params;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})()));
} else {
return G__59072;
}

}
}
}
});
/**
 * Mutation. Add a target to a router dynamically.
 * 
 * params:
 * * router - A router class or registry key
 * * target - A target class or registry key (must have :route-segment)
 * * initial-state-params - Parameters for the initial state for merging the target into state (if it has a stable ident)
 * 
 * See also `add-route-target!` and `add-route-target*`.
 * 
 */
com.fulcrologic.fulcro.routing.dynamic_routing.add_route_target = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","add-route-target","com.fulcrologic.fulcro.routing.dynamic-routing/add-route-target",966361223,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","add-route-target","com.fulcrologic.fulcro.routing.dynamic-routing/add-route-target",966361223,null),(function (fulcro_mutation_env_symbol){
var map__59073 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__59073__$1 = cljs.core.__destructure_map(map__59073);
var params = map__59073__$1;
var router = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59073__$1,new cljs.core.Keyword(null,"router","router",1091916230));
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59073__$1,new cljs.core.Keyword(null,"target","target",253001721));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function com$fulcrologic$fulcro$routing$dynamic_routing$action(p__59074){
var map__59075 = p__59074;
var map__59075__$1 = cljs.core.__destructure_map(map__59075);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59075__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__59076_59823 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__59077_59824 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__59077_59824);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,com.fulcrologic.fulcro.routing.dynamic_routing.add_route_target_STAR_,router,target);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__59076_59823);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__59078 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__59079 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__59079);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__59078);
}})], null);
}));
/**
 * Add a target to an existing router.
 * 
 *   app-ish - An app or component
 *   options - A map:
 * * router - A router class or registry key
 * * target - A target class or registry key (must have :route-segment)
 * * initial-state-params - Parameters for the initial state for merging the target into state (if it has a stable ident)
 *   
 */
com.fulcrologic.fulcro.routing.dynamic_routing.add_route_target_BANG_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$add_route_target_BANG_(app_ish,options){
return com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(app_ish,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(com.fulcrologic.fulcro.routing.dynamic_routing.add_route_target.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.routing.dynamic_routing.add_route_target.cljs$core$IFn$_invoke$arity$1(options) : com.fulcrologic.fulcro.routing.dynamic_routing.add_route_target.call(null, options))], null));
});
/**
 * Add a target to an existing router synchronously. This will NOT show in Fulcro Inspect as a transaction.
 * 
 *   app-ish - An app or component
 *   options - A map:
 * * router - A router class or registry key
 * * target - A target class or registry key (must have :route-segment)
 * * initial-state-params - Parameters for the initial state for merging the target into state (if it has a stable ident)
 *   
 */
com.fulcrologic.fulcro.routing.dynamic_routing.add_route_target_BANG__BANG_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$add_route_target_BANG__BANG_(app_ish,options){
var state_atom = new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366).cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.components.any__GT_app(app_ish));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state_atom,com.fulcrologic.fulcro.routing.dynamic_routing.add_route_target_STAR_,options);
});
/**
 * Get the absolute path for the given route target.
 * 
 * NOTE: Using this on a route target that is on multiple paths of your application
 * can lead to ambiguity and failure of general routing, since this will then return an unpredictable result.
 * In those cases you must supply the options map with the ParentRouter of the RouteTarget, which will resolve the ambiguity. 
 */
com.fulcrologic.fulcro.routing.dynamic_routing.absolute_path = (function com$fulcrologic$fulcro$routing$dynamic_routing$absolute_path(var_args){
var G__59081 = arguments.length;
switch (G__59081) {
case 4:
return com.fulcrologic.fulcro.routing.dynamic_routing.absolute_path.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 3:
return com.fulcrologic.fulcro.routing.dynamic_routing.absolute_path.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.routing.dynamic_routing.absolute_path.cljs$core$IFn$_invoke$arity$4 = (function (app_ish,RouteTarget,route_params,p__59082){
var map__59083 = p__59082;
var map__59083__$1 = cljs.core.__destructure_map(map__59083);
var options = map__59083__$1;
var ParentRouter = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59083__$1,new cljs.core.Keyword(null,"ParentRouter","ParentRouter",-1372476111));
var app = com.fulcrologic.fulcro.components.any__GT_app(app_ish);
var app_root = com.fulcrologic.fulcro.application.root_class(app);
var state_map = com.fulcrologic.fulcro.application.current_state(app);
var _STAR_query_state_STAR__orig_val__59084 = com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_;
var _STAR_query_state_STAR__temp_val__59085 = state_map;
(com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_ = _STAR_query_state_STAR__temp_val__59085);

try{return com.fulcrologic.fulcro.routing.dynamic_routing.resolve_path.cljs$core$IFn$_invoke$arity$4(app_root,RouteTarget,route_params,options);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_ = _STAR_query_state_STAR__orig_val__59084);
}}));

(com.fulcrologic.fulcro.routing.dynamic_routing.absolute_path.cljs$core$IFn$_invoke$arity$3 = (function (app_ish,RouteTarget,route_params){
return com.fulcrologic.fulcro.routing.dynamic_routing.absolute_path.cljs$core$IFn$_invoke$arity$4(app_ish,RouteTarget,route_params,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.routing.dynamic_routing.absolute_path.cljs$lang$maxFixedArity = 4);

com.fulcrologic.fulcro.routing.dynamic_routing.loaded_QMARK_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$loaded_QMARK_(k){
var or__5002__auto__ = (k == null);
if(or__5002__auto__){
return or__5002__auto__;
} else {
try{return com.fulcrologic.fulcro.routing.dynamic_routing.goog$module$shadow$loader.loaded_QMARK_(k);
}catch (e59086){var _ = e59086;
return null;
}}
});
/**
 * Route to a specific `target` of the given `Router`. This is different from `change-route!` in that it makes the
 * code a bit more navigable (though a bit less easily refactored), and supports some additional dynamic features:
 * 
 * * Dynamically adding the target to the router if it isn't there
 * * Loading a module that contains the router (dynamic code load through cljs.loader) and adding it to the router
 * 
 * `app-ish` - An app or component instance
 * 
 * The `options` map can contain:
 * 
 * * `router` (OPTIONAL/REQUIRED) - A router class or registry key for that router. Required if you want auto-add or loading to work.
 * * `target` (REQUIRED) - A target class or registry key.
 * * `:route-params` - A map from keywords to values for any of the route parameters expected for the given target.
 * * `:auto-add?` - Default false. Automatically add the target to the router if it isn't already there.
 * * `:load-from <module-name>` - Default nil. Check to see if <module-name> is loaded. If not, load it, IMPLIES `auto-add? true`.
 * * `:initial-state-params` - Parameters to use for the merge with get-initial-state if the component is added, and has a stable ident.
 * * `after-load (fn [app] ...)` - IF dynamically loaded, this function will be called before attempting to add the target, allowing
 *   you to dynamically generate the component from the loaded code if necessary. Such generation MUST be synchronous.
 * * `before-change (fn [app {:keys [target path route-params]}] ...)` - If the routing is possible and is not denied,
 *   this will be called just before the route is put into effect.
 * 
 */
com.fulcrologic.fulcro.routing.dynamic_routing.route_to_BANG_ = (function com$fulcrologic$fulcro$routing$dynamic_routing$route_to_BANG_(app_ish,p__59087){
var map__59088 = p__59087;
var map__59088__$1 = cljs.core.__destructure_map(map__59088);
var options = map__59088__$1;
var Router = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59088__$1,new cljs.core.Keyword(null,"router","router",1091916230));
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59088__$1,new cljs.core.Keyword(null,"target","target",253001721));
var route_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59088__$1,new cljs.core.Keyword(null,"route-params","route-params",2111411055));
var auto_add_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59088__$1,new cljs.core.Keyword(null,"auto-add?","auto-add?",-374601769));
var after_load = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59088__$1,new cljs.core.Keyword(null,"after-load","after-load",-1278503285));
var before_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59088__$1,new cljs.core.Keyword(null,"before-change","before-change",-514763340));
var initial_state_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59088__$1,new cljs.core.Keyword(null,"initial-state-params","initial-state-params",-1309280029));
var load_from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59088__$1,new cljs.core.Keyword(null,"load-from","load-from",-185174201));
var app = com.fulcrologic.fulcro.components.any__GT_app(app_ish);
var state_map = com.fulcrologic.fulcro.application.current_state(app);
var auto_add_QMARK___$1 = (function (){var or__5002__auto__ = auto_add_QMARK_;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.boolean$(load_from);
}
})();
var Router__$1 = com.fulcrologic.fulcro.raw.components.registry_key__GT_class(Router);
var target_key = ((com.fulcrologic.fulcro.raw.components.legal_registry_lookup_key_QMARK_(target))?cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(target):com.fulcrologic.fulcro.raw.components.class__GT_registry_key(target));
var RouteTarget = com.fulcrologic.fulcro.raw.components.registry_key__GT_class(target_key);
var existing_targets = (function (){var and__5000__auto__ = Router__$1;
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.class__GT_registry_key),com.fulcrologic.fulcro.routing.dynamic_routing.get_targets.cljs$core$IFn$_invoke$arity$2(Router__$1,state_map));
} else {
return and__5000__auto__;
}
})();
var present_QMARK_ = (((Router__$1 == null)) || (cljs.core.contains_QMARK_(existing_targets,target_key)));
var loaded_QMARK_ = com.fulcrologic.fulcro.routing.dynamic_routing.loaded_QMARK_(load_from);
if(cljs.core.truth_((function (){var and__5000__auto__ = Router__$1;
if(cljs.core.truth_(and__5000__auto__)){
var and__5000__auto____$1 = auto_add_QMARK___$1;
if(cljs.core.truth_(and__5000__auto____$1)){
var and__5000__auto____$2 = loaded_QMARK_;
if(cljs.core.truth_(and__5000__auto____$2)){
return (!(present_QMARK_));
} else {
return and__5000__auto____$2;
}
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
})())){
com.fulcrologic.fulcro.routing.dynamic_routing.add_route_target_BANG__BANG_(app,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"router","router",1091916230),Router__$1,new cljs.core.Keyword(null,"initial-state-params","initial-state-params",-1309280029),initial_state_params,new cljs.core.Keyword(null,"target","target",253001721),RouteTarget], null));

var G__59089 = app;
var G__59090 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"router","router",1091916230),Router__$1,new cljs.core.Keyword(null,"target","target",253001721),RouteTarget,new cljs.core.Keyword(null,"route-params","route-params",2111411055),route_params,new cljs.core.Keyword(null,"auto-add?","auto-add?",-374601769),false], null);
return (com.fulcrologic.fulcro.routing.dynamic_routing.route_to_BANG_.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.routing.dynamic_routing.route_to_BANG_.cljs$core$IFn$_invoke$arity$2(G__59089,G__59090) : com.fulcrologic.fulcro.routing.dynamic_routing.route_to_BANG_.call(null, G__59089,G__59090));
} else {
if(cljs.core.truth_((function (){var and__5000__auto__ = Router__$1;
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not(loaded_QMARK_);
} else {
return and__5000__auto__;
}
})())){
return com.fulcrologic.fulcro.routing.dynamic_routing.goog$module$shadow$loader.load(load_from,(function (){
if(cljs.core.fn_QMARK_(after_load)){
(after_load.cljs$core$IFn$_invoke$arity$1 ? after_load.cljs$core$IFn$_invoke$arity$1(app) : after_load.call(null, app));
} else {
}

com.fulcrologic.fulcro.routing.dynamic_routing.add_route_target_BANG__BANG_(app,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"router","router",1091916230),Router__$1,new cljs.core.Keyword(null,"initial-state-params","initial-state-params",-1309280029),initial_state_params,new cljs.core.Keyword(null,"target","target",253001721),target_key], null));

var G__59091 = app;
var G__59092 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"router","router",1091916230),Router__$1,new cljs.core.Keyword(null,"target","target",253001721),target_key,new cljs.core.Keyword(null,"route-params","route-params",2111411055),route_params,new cljs.core.Keyword(null,"auto-add?","auto-add?",-374601769),false], null);
return (com.fulcrologic.fulcro.routing.dynamic_routing.route_to_BANG_.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.routing.dynamic_routing.route_to_BANG_.cljs$core$IFn$_invoke$arity$2(G__59091,G__59092) : com.fulcrologic.fulcro.routing.dynamic_routing.route_to_BANG_.call(null, G__59091,G__59092));
}));
} else {
if(cljs.core.truth_((function (){var and__5000__auto__ = present_QMARK_;
if(and__5000__auto__){
return RouteTarget;
} else {
return and__5000__auto__;
}
})())){
var temp__5823__auto__ = com.fulcrologic.fulcro.routing.dynamic_routing.absolute_path.cljs$core$IFn$_invoke$arity$4(app,RouteTarget,route_params,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ParentRouter","ParentRouter",-1372476111),Router__$1], null));
if(cljs.core.truth_(temp__5823__auto__)){
var path = temp__5823__auto__;
if(cljs.core.every_QMARK_(cljs.core.string_QMARK_,path)){
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",1438,13,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Insufficient route parameters passed. Resulting route is probably invalid.",(com.fulcrologic.fulcro.components.component_name.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.component_name.cljs$core$IFn$_invoke$arity$1(RouteTarget) : com.fulcrologic.fulcro.components.component_name.call(null, RouteTarget)),route_params], null);
}),null)),null,(435),null,null,null);
}

if((function (){var and__5000__auto__ = (cljs.core.truth_(Router__$1)?com.fulcrologic.fulcro.routing.dynamic_routing.can_change_route_QMARK_.cljs$core$IFn$_invoke$arity$2(app,Router__$1):com.fulcrologic.fulcro.routing.dynamic_routing.can_change_route_QMARK_.cljs$core$IFn$_invoke$arity$1(app));
if(and__5000__auto__){
return cljs.core.fn_QMARK_(before_change);
} else {
return and__5000__auto__;
}
})()){
var G__59093_59855 = app;
var G__59094_59856 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"target","target",253001721),RouteTarget,new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"route-params","route-params",2111411055),route_params], null);
(before_change.cljs$core$IFn$_invoke$arity$2 ? before_change.cljs$core$IFn$_invoke$arity$2(G__59093_59855,G__59094_59856) : before_change.call(null, G__59093_59855,G__59094_59856));
} else {
}

return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$3(app,path,route_params);
} else {
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",1449,9,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Routing failed. Unable to construct route path from given arguments",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"router","router",1091916230),Router__$1,new cljs.core.Keyword(null,"target","target",253001721),target_key], null)], null);
}),null)),null,(436),null,null,null);
}
} else {
if((((!(present_QMARK_))) && (cljs.core.not(auto_add_QMARK___$1)))){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.routing.dynamic-routing","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/routing/dynamic_routing.cljc",1453,9,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Cannot route to target because the router does not have that target (perhaps it failed to load?, or auto-add? was false).",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"router","router",1091916230),Router__$1,new cljs.core.Keyword(null,"target","target",253001721),target], null)], null);
}),null)),null,(437),null,null,null);
} else {
return null;
}
}
}
}
});

//# sourceMappingURL=com.fulcrologic.fulcro.routing.dynamic_routing.js.map
