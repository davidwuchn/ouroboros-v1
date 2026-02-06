goog.provide('com.fulcrologic.fulcro.rendering.ident_optimized_render');
/**
 * Checks the given `idents` and returns a subset of them where the data they refer to has changed
 * between `old-state` and `new-state`.
 */
com.fulcrologic.fulcro.rendering.ident_optimized_render.dirty_table_entries = (function com$fulcrologic$fulcro$rendering$ident_optimized_render$dirty_table_entries(old_state,new_state,idents){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (result,ident){
if((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(old_state,ident) === cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(new_state,ident))){
return result;
} else {
return cljs.core.cons(ident,result);
}
}),cljs.core.List.EMPTY,idents);
});
/**
 * Uses the component's query and the current application state to query for the current value of that component's
 *   props (subtree). It then sends those props to the component via "props tunnelling" (setting them on a well-known key in
 *   component-local state).
 */
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_component_BANG_ = (function com$fulcrologic$fulcro$rendering$ident_optimized_render$render_component_BANG_(app,ident,c){
if(cljs.core.truth_((function (){var and__5000__auto__ = c;
if(cljs.core.truth_(and__5000__auto__)){
return ident;
} else {
return and__5000__auto__;
}
})())){
var map__56181 = app;
var map__56181__$1 = cljs.core.__destructure_map(map__56181);
var state_atom = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56181__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366));
var state_map = cljs.core.deref(state_atom);
var query = com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$2(c,state_map);
var q = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.createAsIfByAssoc([ident,query])], null);
var prior_computed = (function (){var or__5002__auto__ = (com.fulcrologic.fulcro.components.get_computed.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.get_computed.cljs$core$IFn$_invoke$arity$1(c) : com.fulcrologic.fulcro.components.get_computed.call(null, c));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
var data_tree = (cljs.core.truth_(query)?com.fulcrologic.fulcro.algorithms.denormalize.db__GT_tree(q,state_map,state_map):null);
var new_props = (function (){var G__56183 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data_tree,ident);
var G__56184 = prior_computed;
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__56183,G__56184) : com.fulcrologic.fulcro.components.computed.call(null, G__56183,G__56184));
})();
if(cljs.core.truth_(query)){
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.rendering.ident-optimized-render","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/rendering/ident_optimized_render.cljc",44,26,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Query was empty. Refresh failed for ",cljs.core.type(c),"See https://book.fulcrologic.com/#err-id-opt-render-empty-query"], null);
}),null)),null,(326),null,null,null);
}

return com.fulcrologic.fulcro.components.tunnel_props_BANG_(c,new_props);
} else {
var root = new cljs.core.Keyword("com.fulcrologic.fulcro.application","app-root","com.fulcrologic.fulcro.application/app-root",835379005).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772).cljs$core$IFn$_invoke$arity$1(app)));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,root)){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"com.fulcrologic.fulcro.rendering.ident-optimized-render","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/rendering/ident_optimized_render.cljc",48,12,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed to do optimized update. Component",(function (){var G__56187 = com.fulcrologic.fulcro.components.react_type(c);
return (com.fulcrologic.fulcro.components.class__GT_registry_key.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.class__GT_registry_key.cljs$core$IFn$_invoke$arity$1(G__56187) : com.fulcrologic.fulcro.components.class__GT_registry_key.call(null, G__56187));
})(),"queries for data that changed, but does not have an ident."], null);
}),null)),null,(327),null,null,null);
} else {
}

throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Targeted update failed",cljs.core.PersistentArrayMap.EMPTY);
}
});
/**
 * Renders *only* components that *have* the given ident.
 */
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_components_with_ident_BANG_ = (function com$fulcrologic$fulcro$rendering$ident_optimized_render$render_components_with_ident_BANG_(app,ident){
var seq__56189 = cljs.core.seq(com.fulcrologic.fulcro.components.ident__GT_components(app,ident));
var chunk__56190 = null;
var count__56191 = (0);
var i__56192 = (0);
while(true){
if((i__56192 < count__56191)){
var c = chunk__56190.cljs$core$IIndexed$_nth$arity$2(null, i__56192);
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_component_BANG_(app,ident,c);


var G__56297 = seq__56189;
var G__56298 = chunk__56190;
var G__56299 = count__56191;
var G__56300 = (i__56192 + (1));
seq__56189 = G__56297;
chunk__56190 = G__56298;
count__56191 = G__56299;
i__56192 = G__56300;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__56189);
if(temp__5825__auto__){
var seq__56189__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__56189__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__56189__$1);
var G__56301 = cljs.core.chunk_rest(seq__56189__$1);
var G__56302 = c__5525__auto__;
var G__56303 = cljs.core.count(c__5525__auto__);
var G__56305 = (0);
seq__56189 = G__56301;
chunk__56190 = G__56302;
count__56191 = G__56303;
i__56192 = G__56305;
continue;
} else {
var c = cljs.core.first(seq__56189__$1);
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_component_BANG_(app,ident,c);


var G__56306 = cljs.core.next(seq__56189__$1);
var G__56307 = null;
var G__56308 = (0);
var G__56309 = (0);
seq__56189 = G__56306;
chunk__56190 = G__56307;
count__56191 = G__56308;
i__56192 = G__56309;
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
 * Renders components that have, or query for, the given ident.
 */
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_dependents_of_ident_BANG_ = (function com$fulcrologic$fulcro$rendering$ident_optimized_render$render_dependents_of_ident_BANG_(app,ident){
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_components_with_ident_BANG_(app,ident);

var map__56198 = app;
var map__56198__$1 = cljs.core.__destructure_map(map__56198);
var runtime_atom = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56198__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772));
var map__56199 = cljs.core.deref(runtime_atom);
var map__56199__$1 = cljs.core.__destructure_map(map__56199);
var indexes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56199__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","indexes","com.fulcrologic.fulcro.application/indexes",-165326938));
var map__56200 = indexes;
var map__56200__$1 = cljs.core.__destructure_map(map__56200);
var prop__GT_classes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56200__$1,new cljs.core.Keyword(null,"prop->classes","prop->classes",515892717));
var idents_in_joins = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56200__$1,new cljs.core.Keyword(null,"idents-in-joins","idents-in-joins",-1556962035));
var class__GT_components = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56200__$1,new cljs.core.Keyword(null,"class->components","class->components",436435919));
var idents_in_joins__$1 = (function (){var or__5002__auto__ = idents_in_joins;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})();
if(cljs.core.contains_QMARK_(idents_in_joins__$1,ident)){
var classes = (prop__GT_classes.cljs$core$IFn$_invoke$arity$1 ? prop__GT_classes.cljs$core$IFn$_invoke$arity$1(ident) : prop__GT_classes.call(null, ident));
if(cljs.core.seq(classes)){
var seq__56202 = cljs.core.seq(classes);
var chunk__56203 = null;
var count__56204 = (0);
var i__56205 = (0);
while(true){
if((i__56205 < count__56204)){
var class$ = chunk__56203.cljs$core$IIndexed$_nth$arity$2(null, i__56205);
var seq__56225_56311 = cljs.core.seq((class__GT_components.cljs$core$IFn$_invoke$arity$1 ? class__GT_components.cljs$core$IFn$_invoke$arity$1(class$) : class__GT_components.call(null, class$)));
var chunk__56227_56312 = null;
var count__56228_56313 = (0);
var i__56229_56314 = (0);
while(true){
if((i__56229_56314 < count__56228_56313)){
var component_56315 = chunk__56227_56312.cljs$core$IIndexed$_nth$arity$2(null, i__56229_56314);
var component_ident_56316 = (com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1(component_56315) : com.fulcrologic.fulcro.components.get_ident.call(null, component_56315));
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_component_BANG_(app,component_ident_56316,component_56315);


var G__56317 = seq__56225_56311;
var G__56318 = chunk__56227_56312;
var G__56319 = count__56228_56313;
var G__56320 = (i__56229_56314 + (1));
seq__56225_56311 = G__56317;
chunk__56227_56312 = G__56318;
count__56228_56313 = G__56319;
i__56229_56314 = G__56320;
continue;
} else {
var temp__5825__auto___56321 = cljs.core.seq(seq__56225_56311);
if(temp__5825__auto___56321){
var seq__56225_56322__$1 = temp__5825__auto___56321;
if(cljs.core.chunked_seq_QMARK_(seq__56225_56322__$1)){
var c__5525__auto___56323 = cljs.core.chunk_first(seq__56225_56322__$1);
var G__56324 = cljs.core.chunk_rest(seq__56225_56322__$1);
var G__56325 = c__5525__auto___56323;
var G__56326 = cljs.core.count(c__5525__auto___56323);
var G__56327 = (0);
seq__56225_56311 = G__56324;
chunk__56227_56312 = G__56325;
count__56228_56313 = G__56326;
i__56229_56314 = G__56327;
continue;
} else {
var component_56328 = cljs.core.first(seq__56225_56322__$1);
var component_ident_56329 = (com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1(component_56328) : com.fulcrologic.fulcro.components.get_ident.call(null, component_56328));
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_component_BANG_(app,component_ident_56329,component_56328);


var G__56330 = cljs.core.next(seq__56225_56322__$1);
var G__56331 = null;
var G__56332 = (0);
var G__56333 = (0);
seq__56225_56311 = G__56330;
chunk__56227_56312 = G__56331;
count__56228_56313 = G__56332;
i__56229_56314 = G__56333;
continue;
}
} else {
}
}
break;
}


var G__56334 = seq__56202;
var G__56335 = chunk__56203;
var G__56336 = count__56204;
var G__56337 = (i__56205 + (1));
seq__56202 = G__56334;
chunk__56203 = G__56335;
count__56204 = G__56336;
i__56205 = G__56337;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__56202);
if(temp__5825__auto__){
var seq__56202__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__56202__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__56202__$1);
var G__56338 = cljs.core.chunk_rest(seq__56202__$1);
var G__56339 = c__5525__auto__;
var G__56340 = cljs.core.count(c__5525__auto__);
var G__56341 = (0);
seq__56202 = G__56338;
chunk__56203 = G__56339;
count__56204 = G__56340;
i__56205 = G__56341;
continue;
} else {
var class$ = cljs.core.first(seq__56202__$1);
var seq__56234_56343 = cljs.core.seq((class__GT_components.cljs$core$IFn$_invoke$arity$1 ? class__GT_components.cljs$core$IFn$_invoke$arity$1(class$) : class__GT_components.call(null, class$)));
var chunk__56236_56344 = null;
var count__56237_56345 = (0);
var i__56238_56346 = (0);
while(true){
if((i__56238_56346 < count__56237_56345)){
var component_56347 = chunk__56236_56344.cljs$core$IIndexed$_nth$arity$2(null, i__56238_56346);
var component_ident_56348 = (com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1(component_56347) : com.fulcrologic.fulcro.components.get_ident.call(null, component_56347));
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_component_BANG_(app,component_ident_56348,component_56347);


var G__56349 = seq__56234_56343;
var G__56350 = chunk__56236_56344;
var G__56351 = count__56237_56345;
var G__56352 = (i__56238_56346 + (1));
seq__56234_56343 = G__56349;
chunk__56236_56344 = G__56350;
count__56237_56345 = G__56351;
i__56238_56346 = G__56352;
continue;
} else {
var temp__5825__auto___56353__$1 = cljs.core.seq(seq__56234_56343);
if(temp__5825__auto___56353__$1){
var seq__56234_56354__$1 = temp__5825__auto___56353__$1;
if(cljs.core.chunked_seq_QMARK_(seq__56234_56354__$1)){
var c__5525__auto___56355 = cljs.core.chunk_first(seq__56234_56354__$1);
var G__56356 = cljs.core.chunk_rest(seq__56234_56354__$1);
var G__56357 = c__5525__auto___56355;
var G__56358 = cljs.core.count(c__5525__auto___56355);
var G__56359 = (0);
seq__56234_56343 = G__56356;
chunk__56236_56344 = G__56357;
count__56237_56345 = G__56358;
i__56238_56346 = G__56359;
continue;
} else {
var component_56360 = cljs.core.first(seq__56234_56354__$1);
var component_ident_56361 = (com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1(component_56360) : com.fulcrologic.fulcro.components.get_ident.call(null, component_56360));
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_component_BANG_(app,component_ident_56361,component_56360);


var G__56362 = cljs.core.next(seq__56234_56354__$1);
var G__56363 = null;
var G__56364 = (0);
var G__56365 = (0);
seq__56234_56343 = G__56362;
chunk__56236_56344 = G__56363;
count__56237_56345 = G__56364;
i__56238_56346 = G__56365;
continue;
}
} else {
}
}
break;
}


var G__56366 = cljs.core.next(seq__56202__$1);
var G__56367 = null;
var G__56368 = (0);
var G__56369 = (0);
seq__56202 = G__56366;
chunk__56203 = G__56367;
count__56204 = G__56368;
i__56205 = G__56369;
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
} else {
return null;
}
});
/**
 * Given an app and a `property-set`: returns the components that query for the items in property-set.
 * 
 *   The `property-set` can be any sequence (ideally a set) of keywords and idents that can directly appear
 *   in a component query as a property or join key.
 */
com.fulcrologic.fulcro.rendering.ident_optimized_render.props__GT_components = (function com$fulcrologic$fulcro$rendering$ident_optimized_render$props__GT_components(app,property_set){
if(cljs.core.seq(property_set)){
var map__56246 = app;
var map__56246__$1 = cljs.core.__destructure_map(map__56246);
var runtime_atom = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56246__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772));
var map__56247 = cljs.core.deref(runtime_atom);
var map__56247__$1 = cljs.core.__destructure_map(map__56247);
var indexes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56247__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","indexes","com.fulcrologic.fulcro.application/indexes",-165326938));
var map__56248 = indexes;
var map__56248__$1 = cljs.core.__destructure_map(map__56248);
var prop__GT_classes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56248__$1,new cljs.core.Keyword(null,"prop->classes","prop->classes",515892717));
var class__GT_components = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56248__$1,new cljs.core.Keyword(null,"class->components","class->components",436435919));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (result,prop){
var classes = (prop__GT_classes.cljs$core$IFn$_invoke$arity$1 ? prop__GT_classes.cljs$core$IFn$_invoke$arity$1(prop) : prop__GT_classes.call(null, prop));
var components = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p1__56243_SHARP_,p2__56244_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(p1__56243_SHARP_,(class__GT_components.cljs$core$IFn$_invoke$arity$1 ? class__GT_components.cljs$core$IFn$_invoke$arity$1(p2__56244_SHARP_) : class__GT_components.call(null, p2__56244_SHARP_)));
}),cljs.core.PersistentHashSet.EMPTY,classes);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(result,components);
}),cljs.core.PersistentHashSet.EMPTY,property_set);
} else {
return null;
}
});
/**
 * This function tracks the state of the app at the time of prior render in the app's runtime-atom. It
 * uses that to do a comparison of old vs. current application state (bounded by the needs of on-screen components).
 * When it finds data that has changed it renders all of the components that depend on that data.
 */
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_stale_components_BANG_ = (function com$fulcrologic$fulcro$rendering$ident_optimized_render$render_stale_components_BANG_(app){
var map__56250 = app;
var map__56250__$1 = cljs.core.__destructure_map(map__56250);
var runtime_atom = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56250__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772));
var state_atom = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56250__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366));
var map__56251 = cljs.core.deref(runtime_atom);
var map__56251__$1 = cljs.core.__destructure_map(map__56251);
var indexes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56251__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","indexes","com.fulcrologic.fulcro.application/indexes",-165326938));
var last_rendered_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56251__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","last-rendered-state","com.fulcrologic.fulcro.application/last-rendered-state",1438978441));
var to_refresh = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56251__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","to-refresh","com.fulcrologic.fulcro.application/to-refresh",-967758829));
var only_refresh = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56251__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","only-refresh","com.fulcrologic.fulcro.application/only-refresh",1300408206));
var map__56252 = indexes;
var map__56252__$1 = cljs.core.__destructure_map(map__56252);
var linked_props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56252__$1,new cljs.core.Keyword(null,"linked-props","linked-props",1547374714));
var ident__GT_components = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56252__$1,new cljs.core.Keyword(null,"ident->components","ident->components",-1952169224));
var prop__GT_classes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56252__$1,new cljs.core.Keyword(null,"prop->classes","prop->classes",515892717));
var idents_in_joins = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56252__$1,new cljs.core.Keyword(null,"idents-in-joins","idents-in-joins",-1556962035));
var limited_refresh_QMARK_ = cljs.core.seq(only_refresh);
if(limited_refresh_QMARK_){
var map__56254 = cljs.core.group_by(edn_query_language.core.ident_QMARK_,only_refresh);
var map__56254__$1 = cljs.core.__destructure_map(map__56254);
var limited_idents = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56254__$1,true);
var limited_props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56254__$1,false);
var limited_to_render = com.fulcrologic.fulcro.rendering.ident_optimized_render.props__GT_components(app,limited_props);
var seq__56255_56371 = cljs.core.seq(limited_to_render);
var chunk__56257_56372 = null;
var count__56258_56373 = (0);
var i__56259_56374 = (0);
while(true){
if((i__56259_56374 < count__56258_56373)){
var c_56375 = chunk__56257_56372.cljs$core$IIndexed$_nth$arity$2(null, i__56259_56374);
var ident_56376 = (com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1(c_56375) : com.fulcrologic.fulcro.components.get_ident.call(null, c_56375));
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_component_BANG_(app,ident_56376,c_56375);


var G__56378 = seq__56255_56371;
var G__56379 = chunk__56257_56372;
var G__56380 = count__56258_56373;
var G__56381 = (i__56259_56374 + (1));
seq__56255_56371 = G__56378;
chunk__56257_56372 = G__56379;
count__56258_56373 = G__56380;
i__56259_56374 = G__56381;
continue;
} else {
var temp__5825__auto___56382 = cljs.core.seq(seq__56255_56371);
if(temp__5825__auto___56382){
var seq__56255_56383__$1 = temp__5825__auto___56382;
if(cljs.core.chunked_seq_QMARK_(seq__56255_56383__$1)){
var c__5525__auto___56384 = cljs.core.chunk_first(seq__56255_56383__$1);
var G__56385 = cljs.core.chunk_rest(seq__56255_56383__$1);
var G__56386 = c__5525__auto___56384;
var G__56387 = cljs.core.count(c__5525__auto___56384);
var G__56388 = (0);
seq__56255_56371 = G__56385;
chunk__56257_56372 = G__56386;
count__56258_56373 = G__56387;
i__56259_56374 = G__56388;
continue;
} else {
var c_56389 = cljs.core.first(seq__56255_56383__$1);
var ident_56390 = (com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1(c_56389) : com.fulcrologic.fulcro.components.get_ident.call(null, c_56389));
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_component_BANG_(app,ident_56390,c_56389);


var G__56391 = cljs.core.next(seq__56255_56383__$1);
var G__56392 = null;
var G__56393 = (0);
var G__56394 = (0);
seq__56255_56371 = G__56391;
chunk__56257_56372 = G__56392;
count__56258_56373 = G__56393;
i__56259_56374 = G__56394;
continue;
}
} else {
}
}
break;
}

var seq__56263 = cljs.core.seq(limited_idents);
var chunk__56264 = null;
var count__56265 = (0);
var i__56266 = (0);
while(true){
if((i__56266 < count__56265)){
var i = chunk__56264.cljs$core$IIndexed$_nth$arity$2(null, i__56266);
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_dependents_of_ident_BANG_(app,i);


var G__56395 = seq__56263;
var G__56396 = chunk__56264;
var G__56397 = count__56265;
var G__56398 = (i__56266 + (1));
seq__56263 = G__56395;
chunk__56264 = G__56396;
count__56265 = G__56397;
i__56266 = G__56398;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__56263);
if(temp__5825__auto__){
var seq__56263__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__56263__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__56263__$1);
var G__56399 = cljs.core.chunk_rest(seq__56263__$1);
var G__56400 = c__5525__auto__;
var G__56401 = cljs.core.count(c__5525__auto__);
var G__56402 = (0);
seq__56263 = G__56399;
chunk__56264 = G__56400;
count__56265 = G__56401;
i__56266 = G__56402;
continue;
} else {
var i = cljs.core.first(seq__56263__$1);
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_dependents_of_ident_BANG_(app,i);


var G__56403 = cljs.core.next(seq__56263__$1);
var G__56404 = null;
var G__56405 = (0);
var G__56406 = (0);
seq__56263 = G__56403;
chunk__56264 = G__56404;
count__56265 = G__56405;
i__56266 = G__56406;
continue;
}
} else {
return null;
}
}
break;
}
} else {
var state_map = cljs.core.deref(state_atom);
var idents_in_joins__$1 = (function (){var or__5002__auto__ = idents_in_joins;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})();
var dirty_linked_props = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p){
if((!((cljs.core.get.cljs$core$IFn$_invoke$arity$2(state_map,p) === cljs.core.get.cljs$core$IFn$_invoke$arity$2(last_rendered_state,p))))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,p);
} else {
return acc;
}
}),cljs.core.PersistentHashSet.EMPTY,linked_props);
var map__56269 = cljs.core.group_by(edn_query_language.core.ident_QMARK_,to_refresh);
var map__56269__$1 = cljs.core.__destructure_map(map__56269);
var idents_to_force = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56269__$1,true);
var props_to_force = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56269__$1,false);
var props_to_force__$1 = clojure.set.union.cljs$core$IFn$_invoke$arity$2(props_to_force,dirty_linked_props);
var mounted_idents = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.keys(ident__GT_components),idents_in_joins__$1);
var stale_idents = com.fulcrologic.fulcro.rendering.ident_optimized_render.dirty_table_entries(last_rendered_state,state_map,mounted_idents);
var extra_to_force = com.fulcrologic.fulcro.rendering.ident_optimized_render.props__GT_components(app,props_to_force__$1);
var all_idents = clojure.set.union.cljs$core$IFn$_invoke$arity$2(cljs.core.set(idents_to_force),cljs.core.set(stale_idents));
var seq__56271_56408 = cljs.core.seq(all_idents);
var chunk__56272_56409 = null;
var count__56273_56410 = (0);
var i__56274_56411 = (0);
while(true){
if((i__56274_56411 < count__56273_56410)){
var i_56412 = chunk__56272_56409.cljs$core$IIndexed$_nth$arity$2(null, i__56274_56411);
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_dependents_of_ident_BANG_(app,i_56412);


var G__56413 = seq__56271_56408;
var G__56414 = chunk__56272_56409;
var G__56415 = count__56273_56410;
var G__56416 = (i__56274_56411 + (1));
seq__56271_56408 = G__56413;
chunk__56272_56409 = G__56414;
count__56273_56410 = G__56415;
i__56274_56411 = G__56416;
continue;
} else {
var temp__5825__auto___56417 = cljs.core.seq(seq__56271_56408);
if(temp__5825__auto___56417){
var seq__56271_56418__$1 = temp__5825__auto___56417;
if(cljs.core.chunked_seq_QMARK_(seq__56271_56418__$1)){
var c__5525__auto___56419 = cljs.core.chunk_first(seq__56271_56418__$1);
var G__56420 = cljs.core.chunk_rest(seq__56271_56418__$1);
var G__56421 = c__5525__auto___56419;
var G__56422 = cljs.core.count(c__5525__auto___56419);
var G__56423 = (0);
seq__56271_56408 = G__56420;
chunk__56272_56409 = G__56421;
count__56273_56410 = G__56422;
i__56274_56411 = G__56423;
continue;
} else {
var i_56424 = cljs.core.first(seq__56271_56418__$1);
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_dependents_of_ident_BANG_(app,i_56424);


var G__56425 = cljs.core.next(seq__56271_56418__$1);
var G__56426 = null;
var G__56427 = (0);
var G__56428 = (0);
seq__56271_56408 = G__56425;
chunk__56272_56409 = G__56426;
count__56273_56410 = G__56427;
i__56274_56411 = G__56428;
continue;
}
} else {
}
}
break;
}

var seq__56277 = cljs.core.seq(extra_to_force);
var chunk__56278 = null;
var count__56279 = (0);
var i__56280 = (0);
while(true){
if((i__56280 < count__56279)){
var c = chunk__56278.cljs$core$IIndexed$_nth$arity$2(null, i__56280);
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_component_BANG_(app,(com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1(c) : com.fulcrologic.fulcro.components.get_ident.call(null, c)),c);


var G__56430 = seq__56277;
var G__56431 = chunk__56278;
var G__56432 = count__56279;
var G__56433 = (i__56280 + (1));
seq__56277 = G__56430;
chunk__56278 = G__56431;
count__56279 = G__56432;
i__56280 = G__56433;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__56277);
if(temp__5825__auto__){
var seq__56277__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__56277__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__56277__$1);
var G__56434 = cljs.core.chunk_rest(seq__56277__$1);
var G__56435 = c__5525__auto__;
var G__56436 = cljs.core.count(c__5525__auto__);
var G__56437 = (0);
seq__56277 = G__56434;
chunk__56278 = G__56435;
count__56279 = G__56436;
i__56280 = G__56437;
continue;
} else {
var c = cljs.core.first(seq__56277__$1);
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_component_BANG_(app,(com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.get_ident.cljs$core$IFn$_invoke$arity$1(c) : com.fulcrologic.fulcro.components.get_ident.call(null, c)),c);


var G__56438 = cljs.core.next(seq__56277__$1);
var G__56439 = null;
var G__56440 = (0);
var G__56441 = (0);
seq__56277 = G__56438;
chunk__56278 = G__56439;
count__56279 = G__56440;
i__56280 = G__56441;
continue;
}
} else {
return null;
}
}
break;
}
}
});
/**
 * DEPRECATED: Careful use of hooks/use-component will give a much more optimized experience, and async rendering in
 * React 18 may break with this renderer. Use at your own risk with React 18+.
 * 
 *   The top-level call for using this optimized render in your application.
 * 
 *   If `:force-root? true` is passed in options, then it just forces a keyframe root render; otherwise
 *   it tries to minimize the work done for screen refresh to just the queries/refreshes needed by the
 *   data that has changed.
 */
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_BANG_ = (function com$fulcrologic$fulcro$rendering$ident_optimized_render$render_BANG_(var_args){
var G__56287 = arguments.length;
switch (G__56287) {
case 1:
return com.fulcrologic.fulcro.rendering.ident_optimized_render.render_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.rendering.ident_optimized_render.render_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.rendering.ident_optimized_render.render_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (app){
return com.fulcrologic.fulcro.rendering.ident_optimized_render.render_BANG_.cljs$core$IFn$_invoke$arity$2(app,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.rendering.ident_optimized_render.render_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (app,p__56289){
var map__56290 = p__56289;
var map__56290__$1 = cljs.core.__destructure_map(map__56290);
var options = map__56290__$1;
var force_root_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56290__$1,new cljs.core.Keyword(null,"force-root?","force-root?",-1598741683));
var root_props_changed_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56290__$1,new cljs.core.Keyword(null,"root-props-changed?","root-props-changed?",1999614835));
if(cljs.core.truth_((function (){var or__5002__auto__ = force_root_QMARK_;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return root_props_changed_QMARK_;
}
})())){
return com.fulcrologic.fulcro.rendering.keyframe_render.render_BANG_(app,options);
} else {
try{return com.fulcrologic.fulcro.rendering.ident_optimized_render.render_stale_components_BANG_(app);
}catch (e56292){var e = e56292;
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"com.fulcrologic.fulcro.rendering.ident-optimized-render","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/rendering/ident_optimized_render.cljc",151,10,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Optimized render failed. Falling back to root render."], null);
}),null)),null,(328),null,null,null);

return com.fulcrologic.fulcro.rendering.keyframe_render.render_BANG_(app,options);
}}
}));

(com.fulcrologic.fulcro.rendering.ident_optimized_render.render_BANG_.cljs$lang$maxFixedArity = 2);


//# sourceMappingURL=com.fulcrologic.fulcro.rendering.ident_optimized_render.js.map
