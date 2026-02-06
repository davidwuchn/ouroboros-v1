goog.provide('ouroboros.frontend.ui.pages.dashboard');
/**
 * 
 */
ouroboros.frontend.ui.pages.dashboard.handle_load_error = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.dashboard","handle-load-error","ouroboros.frontend.ui.pages.dashboard/handle-load-error",-430075592,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.dashboard","handle-load-error","ouroboros.frontend.ui.pages.dashboard/handle-load-error",-430075592,null),(function (fulcro_mutation_env_symbol){
var map__41584 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41584__$1 = cljs.core.__destructure_map(map__41584);
var page_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41584__$1,new cljs.core.Keyword(null,"page-id","page-id",-872941168));
var error_message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41584__$1,new cljs.core.Keyword(null,"error-message","error-message",1756021561));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$dashboard$action(p__41586){
var map__41587 = p__41586;
var map__41587__$1 = cljs.core.__destructure_map(map__41587);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41587__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41589_41983 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41590_41984 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41590_41984);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","error","page/error",-985089113),page_id], null),error_message);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41589_41983);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41618 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41619 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41619);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41618);
}})], null);
}));
/**
 * 
 */
ouroboros.frontend.ui.pages.dashboard.clear_page_error = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.dashboard","clear-page-error","ouroboros.frontend.ui.pages.dashboard/clear-page-error",-210582051,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.dashboard","clear-page-error","ouroboros.frontend.ui.pages.dashboard/clear-page-error",-210582051,null),(function (fulcro_mutation_env_symbol){
var map__41643 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41643__$1 = cljs.core.__destructure_map(map__41643);
var page_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41643__$1,new cljs.core.Keyword(null,"page-id","page-id",-872941168));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$dashboard$action(p__41650){
var map__41652 = p__41650;
var map__41652__$1 = cljs.core.__destructure_map(map__41652);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41652__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41655_41988 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41656_41989 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41656_41989);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update,new cljs.core.Keyword("page","error","page/error",-985089113),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([page_id], 0));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41655_41988);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41661 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41662 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41662);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41661);
}})], null);
}));
ouroboros.frontend.ui.pages.dashboard.error_state = (function ouroboros$frontend$ui$pages$dashboard$error_state(p__41671){
var map__41679 = p__41671;
var map__41679__$1 = cljs.core.__destructure_map(map__41679);
var props = map__41679__$1;
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41679__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var retry_fn = new cljs.core.Keyword(null,"on-retry","on-retry",-610804293).cljs$core$IFn$_invoke$arity$1(props);
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.pages.dashboard:30", "className": "error-state-icon"}),"\u26A0\uFE0F"]);
var G__41683 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.dashboard:29"], null),G__41683], 0));
} else {
return G__41683;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = message;
var G__41686 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.dashboard:31"], null),G__41686], 0));
} else {
return G__41686;
}
})()], null),new cljs.core.Keyword(null,".error-state-message",".error-state-message",2088094960)),(cljs.core.truth_(retry_fn)?ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),retry_fn,new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"primary","primary",817773892)], null),"Try Again"):null)], null),new cljs.core.Keyword(null,".error-state",".error-state",1256968369));
});
ouroboros.frontend.ui.pages.dashboard.metric_skeleton = (function ouroboros$frontend$ui$pages$dashboard$metric_skeleton(){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "40px", "height": "2.5rem"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.dashboard:45"})]);
var G__41697 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.dashboard:44"], null),G__41697], 0));
} else {
return G__41697;
}
})()], null),new cljs.core.Keyword(null,".metric-value",".metric-value",1990957407));
var G__41702 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.dashboard:43"], null),G__41702], 0));
} else {
return G__41702;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "80px", "margin": "0 auto"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.dashboard:47"})])], null),new cljs.core.Keyword(null,".metric-card",".metric-card",2121565967));
});
ouroboros.frontend.ui.pages.dashboard.card_skeleton = (function ouroboros$frontend$ui$pages$dashboard$card_skeleton(p__41712){
var map__41713 = p__41712;
var map__41713__$1 = cljs.core.__destructure_map(map__41713);
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41713__$1,new cljs.core.Keyword(null,"title","title",636505583));
var metric_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41713__$1,new cljs.core.Keyword(null,"metric-count","metric-count",1192791310));
return ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),title], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (i){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.dashboard:54"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["skeleton-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null)], 0)),ouroboros.frontend.ui.pages.dashboard.metric_skeleton()], null),null);
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(metric_count));
var G__41719 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.dashboard:52"], null),G__41719], 0));
} else {
return G__41719;
}
})()], null),new cljs.core.Keyword(null,".metrics-grid",".metrics-grid",-58656462))], 0));
});
ouroboros.frontend.ui.pages.dashboard.dashboard_loading = (function ouroboros$frontend$ui$pages$dashboard$dashboard_loading(){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h1",({"data-fulcro-source": "ouroboros.frontend.ui.pages.dashboard:60"}),"Dashboard"]);
var G__41724 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.dashboard:59"], null),G__41724], 0));
} else {
return G__41724;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "metrics-grid mb-3", "data-fulcro-source": "ouroboros.frontend.ui.pages.dashboard:61"}),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.pages.dashboard.card_skeleton(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"title","title",636505583),"System Status",new cljs.core.Keyword(null,"metric-count","metric-count",1192791310),(2)], null))),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.pages.dashboard.card_skeleton(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"title","title",636505583),"Telemetry",new cljs.core.Keyword(null,"metric-count","metric-count",1192791310),(3)], null))),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.pages.dashboard.card_skeleton(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"title","title",636505583),"Users",new cljs.core.Keyword(null,"metric-count","metric-count",1192791310),(2)], null))),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.pages.dashboard.card_skeleton(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"title","title",636505583),"Sessions",new cljs.core.Keyword(null,"metric-count","metric-count",1192791310),(1)], null)))]),ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"System Info"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"style": ({"height": "60px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.dashboard:71", "className": "skeleton-text"})])], 0))], null),null);
});
/**
 * System health status card
 */
ouroboros.frontend.ui.pages.dashboard.system_health_card = (function ouroboros$frontend$ui$pages$dashboard$system_health_card(p__41735){
var map__41736 = p__41735;
var map__41736__$1 = cljs.core.__destructure_map(map__41736);
var healthy_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41736__$1,new cljs.core.Keyword(null,"healthy?","healthy?",1027593366));
var current_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41736__$1,new cljs.core.Keyword(null,"current-state","current-state",1048284452));
return ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"System Status"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),(cljs.core.truth_(healthy_QMARK_)?"\u2713":"\u2717"),new cljs.core.Keyword(null,"label","label",1718410804),"Healthy",new cljs.core.Keyword(null,"className","className",-1983287057),(cljs.core.truth_(healthy_QMARK_)?"text-success":"text-error")], null));
var G__41747 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.dashboard:81"], null),G__41747], 0));
} else {
return G__41747;
}
})(),(cljs.core.truth_(current_state)?ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),cljs.core.count(new cljs.core.Keyword(null,"state","state",-1988618099).cljs$core$IFn$_invoke$arity$1(current_state)),new cljs.core.Keyword(null,"label","label",1718410804),"Active States"], null)):null)], null),new cljs.core.Keyword(null,".metrics-grid",".metrics-grid",-58656462))], 0));
});
/**
 * Telemetry statistics summary
 */
ouroboros.frontend.ui.pages.dashboard.telemetry_summary_card = (function ouroboros$frontend$ui$pages$dashboard$telemetry_summary_card(p__41757){
var map__41758 = p__41757;
var map__41758__$1 = cljs.core.__destructure_map(map__41758);
var total_events = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41758__$1,new cljs.core.Keyword(null,"total-events","total-events",-1205693048));
var tool_invocations = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41758__$1,new cljs.core.Keyword(null,"tool-invocations","tool-invocations",-922489125));
var errors = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41758__$1,new cljs.core.Keyword(null,"errors","errors",-908790718));
return ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"Telemetry"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = total_events;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Total Events"], null));
var G__41767 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.dashboard:95"], null),G__41767], 0));
} else {
return G__41767;
}
})(),ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = tool_invocations;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Tool Invocations"], null)),ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = errors;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Errors",new cljs.core.Keyword(null,"className","className",-1983287057),(((errors > (0)))?"text-warning":null)], null))], null),new cljs.core.Keyword(null,".metrics-grid",".metrics-grid",-58656462))], 0));
});
/**
 * User statistics summary
 */
ouroboros.frontend.ui.pages.dashboard.users_summary_card = (function ouroboros$frontend$ui$pages$dashboard$users_summary_card(p__41783){
var map__41785 = p__41783;
var map__41785__$1 = cljs.core.__destructure_map(map__41785);
var user_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41785__$1,new cljs.core.Keyword(null,"user-count","user-count",762712593));
var admin_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41785__$1,new cljs.core.Keyword(null,"admin-count","admin-count",-1148532136));
return ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"Users"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = user_count;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Total Users"], null));
var G__41791 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.dashboard:111"], null),G__41791], 0));
} else {
return G__41791;
}
})(),ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = admin_count;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Admins"], null))], null),new cljs.core.Keyword(null,".metrics-grid",".metrics-grid",-58656462))], 0));
});
/**
 * Chat sessions summary
 */
ouroboros.frontend.ui.pages.dashboard.sessions_summary_card = (function ouroboros$frontend$ui$pages$dashboard$sessions_summary_card(p__41800){
var map__41808 = p__41800;
var map__41808__$1 = cljs.core.__destructure_map(map__41808);
var session_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41808__$1,new cljs.core.Keyword(null,"session-count","session-count",587323089));
return ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"Chat Sessions"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = session_count;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Active Sessions"], null));
var G__41819 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.dashboard:123"], null),G__41819], 0));
} else {
return G__41819;
}
})()], null),new cljs.core.Keyword(null,".metrics-grid",".metrics-grid",-58656462))], 0));
});

var options__36450__auto___42023 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$dashboard$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("system","healthy?","system/healthy?",170149349),new cljs.core.Keyword("system","current-state","system/current-state",1938816723),new cljs.core.Keyword("system","meta","system/meta",-1929596749),new cljs.core.Keyword("telemetry","total-events","telemetry/total-events",-962742081),new cljs.core.Keyword("telemetry","tool-invocations","telemetry/tool-invocations",-1568665006),new cljs.core.Keyword("telemetry","errors","telemetry/errors",1666568953),new cljs.core.Keyword("auth","user-count","auth/user-count",763917241),new cljs.core.Keyword("auth","admin-count","auth/admin-count",-1145770240),new cljs.core.Keyword("chat","session-count","chat/session-count",575879849),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"dashboard","dashboard",-631747508)], null),new cljs.core.Keyword("page","error","page/error",-985089113)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$dashboard$ident_STAR_(this$,p__41899){
var map__41900 = p__41899;
var map__41900__$1 = cljs.core.__destructure_map(map__41900);
var props = map__41900__$1;
var errors = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41900__$1,new cljs.core.Keyword("telemetry","errors","telemetry/errors",1666568953));
var user_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41900__$1,new cljs.core.Keyword("auth","user-count","auth/user-count",763917241));
var total_events = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41900__$1,new cljs.core.Keyword("telemetry","total-events","telemetry/total-events",-962742081));
var admin_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41900__$1,new cljs.core.Keyword("auth","admin-count","auth/admin-count",-1145770240));
var healthy_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41900__$1,new cljs.core.Keyword("system","healthy?","system/healthy?",170149349));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41900__$1,new cljs.core.Keyword("page","error","page/error",-985089113));
var session_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41900__$1,new cljs.core.Keyword("chat","session-count","chat/session-count",575879849));
var tool_invocations = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41900__$1,new cljs.core.Keyword("telemetry","tool-invocations","telemetry/tool-invocations",-1568665006));
var current_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41900__$1,new cljs.core.Keyword("system","current-state","system/current-state",1938816723));
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41900__$1,new cljs.core.Keyword("system","meta","system/meta",-1929596749));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"dashboard","dashboard",-631747508)], null);
}),new cljs.core.Keyword(null,"route-segment","route-segment",1812935886),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["dashboard"], null),new cljs.core.Keyword(null,"will-enter","will-enter",-692415624),(function (app,route_params){
return com.fulcrologic.fulcro.routing.dynamic_routing.route_deferred(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"dashboard","dashboard",-631747508)], null),(function (){
return com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"dashboard","dashboard",-631747508)], null),ouroboros.frontend.ui.pages.dashboard.DashboardPage,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"marker","marker",865118313),new cljs.core.Keyword(null,"dashboard","dashboard",-631747508),new cljs.core.Keyword(null,"post-mutation","post-mutation",-1076606705),new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","target-ready","com.fulcrologic.fulcro.routing.dynamic-routing/target-ready",-111862826,null),new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"dashboard","dashboard",-631747508)], null)], null),new cljs.core.Keyword(null,"fallback","fallback",761637929),new cljs.core.Symbol("ouroboros.frontend.ui.pages.dashboard","handle-load-error","ouroboros.frontend.ui.pages.dashboard/handle-load-error",-430075592,null),new cljs.core.Keyword(null,"fallback-params","fallback-params",-2048144971),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"page-id","page-id",-872941168),new cljs.core.Keyword(null,"dashboard","dashboard",-631747508),new cljs.core.Keyword(null,"error-message","error-message",1756021561),"Failed to load dashboard data"], null)], null));
}));
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$dashboard$render_DashboardPage(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__41916 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__41916__$1 = cljs.core.__destructure_map(map__41916);
var props = map__41916__$1;
var errors = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41916__$1,new cljs.core.Keyword("telemetry","errors","telemetry/errors",1666568953));
var user_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41916__$1,new cljs.core.Keyword("auth","user-count","auth/user-count",763917241));
var total_events = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41916__$1,new cljs.core.Keyword("telemetry","total-events","telemetry/total-events",-962742081));
var admin_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41916__$1,new cljs.core.Keyword("auth","admin-count","auth/admin-count",-1145770240));
var healthy_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41916__$1,new cljs.core.Keyword("system","healthy?","system/healthy?",170149349));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41916__$1,new cljs.core.Keyword("page","error","page/error",-985089113));
var session_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41916__$1,new cljs.core.Keyword("chat","session-count","chat/session-count",575879849));
var tool_invocations = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41916__$1,new cljs.core.Keyword("telemetry","tool-invocations","telemetry/tool-invocations",-1568665006));
var current_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41916__$1,new cljs.core.Keyword("system","current-state","system/current-state",1938816723));
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41916__$1,new cljs.core.Keyword("system","meta","system/meta",-1929596749));
var loading_QMARK_ = com.fulcrologic.fulcro.data_fetch.loading_QMARK_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"dashboard","dashboard",-631747508)], null)));
var error_msg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","error","page/error",-985089113),new cljs.core.Keyword(null,"dashboard","dashboard",-631747508)], null));
if(cljs.core.truth_(error_msg)){
return ouroboros.frontend.ui.pages.dashboard.error_state(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"message","message",-406056002),error_msg,new cljs.core.Keyword(null,"on-retry","on-retry",-610804293),(function (){
com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Symbol("ouroboros.frontend.ui.pages.dashboard","clear-page-error","ouroboros.frontend.ui.pages.dashboard/clear-page-error",-210582051,null),null,(1),null)),(new cljs.core.List(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Keyword(null,"page-id","page-id",-872941168),null,(1),null)),(new cljs.core.List(null,new cljs.core.Keyword(null,"dashboard","dashboard",-631747508),null,(1),null)))))),null,(1),null))))),null,(1),null)))))));

return com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(this$,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"dashboard","dashboard",-631747508)], null),ouroboros.frontend.ui.pages.dashboard.DashboardPage,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"marker","marker",865118313),new cljs.core.Keyword(null,"dashboard","dashboard",-631747508),new cljs.core.Keyword(null,"fallback","fallback",761637929),new cljs.core.Symbol("ouroboros.frontend.ui.pages.dashboard","handle-load-error","ouroboros.frontend.ui.pages.dashboard/handle-load-error",-430075592,null),new cljs.core.Keyword(null,"fallback-params","fallback-params",-2048144971),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"page-id","page-id",-872941168),new cljs.core.Keyword(null,"dashboard","dashboard",-631747508),new cljs.core.Keyword(null,"error-message","error-message",1756021561),"Failed to load dashboard data"], null)], null));
})], null));
} else {
if(loading_QMARK_){
return ouroboros.frontend.ui.pages.dashboard.dashboard_loading();
} else {
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h1",({"data-fulcro-source": "ouroboros.frontend.ui.pages.dashboard:187"}),"Dashboard"]);
var G__41935 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.dashboard:186"], null),G__41935], 0));
} else {
return G__41935;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "metrics-grid mb-3", "data-fulcro-source": "ouroboros.frontend.ui.pages.dashboard:189"}),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.pages.dashboard.system_health_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"healthy?","healthy?",1027593366),healthy_QMARK_,new cljs.core.Keyword(null,"current-state","current-state",1048284452),current_state], null))),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.pages.dashboard.telemetry_summary_card(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"total-events","total-events",-1205693048),total_events,new cljs.core.Keyword(null,"tool-invocations","tool-invocations",-922489125),tool_invocations,new cljs.core.Keyword(null,"errors","errors",-908790718),errors], null))),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.pages.dashboard.users_summary_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"user-count","user-count",762712593),user_count,new cljs.core.Keyword(null,"admin-count","admin-count",-1148532136),admin_count], null))),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.pages.dashboard.sessions_summary_card(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"session-count","session-count",587323089),session_count], null)))]),(cljs.core.truth_(meta)?ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"System Info"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([meta], 0));
var G__41955 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.dashboard:212"], null),G__41955], 0));
} else {
return G__41955;
}
})()], null),new cljs.core.Keyword(null,".code-block",".code-block",1318233935))], 0)):null)], null),null);

}
}
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.dashboard !== 'undefined') && (typeof ouroboros.frontend.ui.pages.dashboard.DashboardPage !== 'undefined')){
} else {
/**
 * @constructor
 */
ouroboros.frontend.ui.pages.dashboard.DashboardPage = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42023,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.dashboard.DashboardPage,new cljs.core.Keyword("ouroboros.frontend.ui.pages.dashboard","DashboardPage","ouroboros.frontend.ui.pages.dashboard/DashboardPage",694263248),options__36450__auto___42023);

//# sourceMappingURL=ouroboros.frontend.ui.pages.dashboard.js.map
