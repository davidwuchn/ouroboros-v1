goog.provide('ouroboros.frontend.ui.pages.telemetry');
/**
 * 
 */
ouroboros.frontend.ui.pages.telemetry.handle_load_error = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.telemetry","handle-load-error","ouroboros.frontend.ui.pages.telemetry/handle-load-error",1398122597,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.telemetry","handle-load-error","ouroboros.frontend.ui.pages.telemetry/handle-load-error",1398122597,null),(function (fulcro_mutation_env_symbol){
var map__42407 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__42407__$1 = cljs.core.__destructure_map(map__42407);
var page_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42407__$1,new cljs.core.Keyword(null,"page-id","page-id",-872941168));
var error_message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42407__$1,new cljs.core.Keyword(null,"error-message","error-message",1756021561));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$telemetry$action(p__42408){
var map__42409 = p__42408;
var map__42409__$1 = cljs.core.__destructure_map(map__42409);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42409__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__42410_42446 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__42411_42447 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__42411_42447);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","error","page/error",-985089113),page_id], null),error_message);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__42410_42446);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__42412 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__42413 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__42413);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__42412);
}})], null);
}));
/**
 * 
 */
ouroboros.frontend.ui.pages.telemetry.clear_page_error = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.telemetry","clear-page-error","ouroboros.frontend.ui.pages.telemetry/clear-page-error",107617528,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.telemetry","clear-page-error","ouroboros.frontend.ui.pages.telemetry/clear-page-error",107617528,null),(function (fulcro_mutation_env_symbol){
var map__42416 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__42416__$1 = cljs.core.__destructure_map(map__42416);
var page_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42416__$1,new cljs.core.Keyword(null,"page-id","page-id",-872941168));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$telemetry$action(p__42420){
var map__42421 = p__42420;
var map__42421__$1 = cljs.core.__destructure_map(map__42421);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42421__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__42422_42448 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__42423_42449 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__42423_42449);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update,new cljs.core.Keyword("page","error","page/error",-985089113),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([page_id], 0));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__42422_42448);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__42424 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__42425 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__42425);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__42424);
}})], null);
}));
/**
 * 
 */
ouroboros.frontend.ui.pages.telemetry.add_telemetry_event = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.telemetry","add-telemetry-event","ouroboros.frontend.ui.pages.telemetry/add-telemetry-event",-1610223767,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.telemetry","add-telemetry-event","ouroboros.frontend.ui.pages.telemetry/add-telemetry-event",-1610223767,null),(function (fulcro_mutation_env_symbol){
var map__42427 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__42427__$1 = cljs.core.__destructure_map(map__42427);
var event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42427__$1,new cljs.core.Keyword(null,"event","event",301435442));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$telemetry$action(p__42428){
var map__42429 = p__42428;
var map__42429__$1 = cljs.core.__destructure_map(map__42429);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42429__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__42430_42450 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__42431_42451 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__42431_42451);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235),new cljs.core.Keyword("telemetry","events","telemetry/events",1566822626)], null),(function (events){
var new_events = cljs.core.vec(cljs.core.cons(event,cljs.core.take.cljs$core$IFn$_invoke$arity$2((49),events)));
return new_events;
}));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235),new cljs.core.Keyword("telemetry","total-events","telemetry/total-events",-962742081)], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.inc,(0)));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("tool","invoke","tool/invoke",1150730079),new cljs.core.Keyword(null,"event","event",301435442).cljs$core$IFn$_invoke$arity$1(event))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235),new cljs.core.Keyword("telemetry","tool-invocations","telemetry/tool-invocations",-1568665006)], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.inc,(0)));
} else {
}

if(new cljs.core.Keyword(null,"success?","success?",-122854052).cljs$core$IFn$_invoke$arity$1(event) === false){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235),new cljs.core.Keyword("telemetry","errors","telemetry/errors",1666568953)], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.inc,(0)));
} else {
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__42430_42450);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__42432 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__42433 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__42433);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__42432);
}})], null);
}));
ouroboros.frontend.ui.pages.telemetry.telemetry_loading = (function ouroboros$frontend$ui$pages$telemetry$telemetry_loading(){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h1",({"data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:44"}),"Telemetry"]);
var G__42434 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.telemetry:43"], null),G__42434], 0));
} else {
return G__42434;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "metrics-grid mb-3", "data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:45"}),com.fulcrologic.fulcro.components.force_children(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((4),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "60px", "height": "2.5rem", "margin": "0 auto"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:48"})]);
var G__42435 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.telemetry:47"], null),G__42435], 0));
} else {
return G__42435;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "100px", "margin": "0.5rem auto 0"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:50"})])], null),new cljs.core.Keyword(null,".metric-card",".metric-card",2121565967))))]),ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"Error Rate"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "80px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:53"})])], 0)),ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"Recent Events"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-table", "data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:55"}),com.fulcrologic.fulcro.components.force_children(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((5),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-row", "style": ({"display": "flex", "gap": "1rem", "padding": "0.75rem 0", "borderBottom": "1px solid var(--color-border)"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:57"}),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "120px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:62"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "100px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:63"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "80px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:64"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "60px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:65"})]))])))])], 0))], null),null);
});
/**
 * Format an event for display
 */
ouroboros.frontend.ui.pages.telemetry.event_row = (function ouroboros$frontend$ui$pages$telemetry$event_row(event){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),new cljs.core.Keyword("event","timestamp","event/timestamp",-1672439471).cljs$core$IFn$_invoke$arity$1(event),new cljs.core.Keyword(null,"event-type","event-type",319722813),cljs.core.name((function (){var or__5002__auto__ = new cljs.core.Keyword(null,"event","event",301435442).cljs$core$IFn$_invoke$arity$1(event);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.Keyword(null,"unknown","unknown",-935977881);
}
})()),new cljs.core.Keyword(null,"tool","tool",-1298696470),new cljs.core.Keyword(null,"tool","tool",-1298696470).cljs$core$IFn$_invoke$arity$1(event),new cljs.core.Keyword(null,"duration","duration",1444101068),(function (){var temp__5825__auto__ = new cljs.core.Keyword(null,"duration-ms","duration-ms",1993555055).cljs$core$IFn$_invoke$arity$1(event);
if(cljs.core.truth_(temp__5825__auto__)){
var ms = temp__5825__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(Math.round(ms)),"ms"].join('');
} else {
return null;
}
})(),new cljs.core.Keyword(null,"success?","success?",-122854052),new cljs.core.Keyword(null,"success?","success?",-122854052).cljs$core$IFn$_invoke$arity$1(event)], null);
});
/**
 * Table of telemetry events
 */
ouroboros.frontend.ui.pages.telemetry.event_table = (function ouroboros$frontend$ui$pages$telemetry$event_table(events){
var columns = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"timestamp","timestamp",579478971),new cljs.core.Keyword(null,"label","label",1718410804),"Time"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"event-type","event-type",319722813),new cljs.core.Keyword(null,"label","label",1718410804),"Event"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"tool","tool",-1298696470),new cljs.core.Keyword(null,"label","label",1718410804),"Tool"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"duration","duration",1444101068),new cljs.core.Keyword(null,"label","label",1718410804),"Duration"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"success?","success?",-122854052),new cljs.core.Keyword(null,"label","label",1718410804),"Status",new cljs.core.Keyword(null,"format","format",-1306924766),(function (v,_){
if((v == null)){
return "-";
} else {
return ouroboros.frontend.ui.components.status_badge(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ok?","ok?",447310304),v,new cljs.core.Keyword(null,"text","text",-1790561697),(cljs.core.truth_(v)?"Success":"Failed")], null));
}
})], null)], null);
var rows = cljs.core.map.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.telemetry.event_row,events);
return ouroboros.frontend.ui.components.data_table(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"columns","columns",1998437288),columns,new cljs.core.Keyword(null,"rows","rows",850049680),rows,new cljs.core.Keyword(null,"empty-message","empty-message",-1625491415),"No telemetry events"], null));
});

var options__36450__auto___42452 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$telemetry$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("event","id","event/id",-1282332774),new cljs.core.Keyword("event","timestamp","event/timestamp",-1672439471),new cljs.core.Keyword(null,"event","event",301435442),new cljs.core.Keyword(null,"tool","tool",-1298696470),new cljs.core.Keyword(null,"duration-ms","duration-ms",1993555055),new cljs.core.Keyword(null,"success?","success?",-122854052)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$telemetry$ident_STAR_(_,props){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("event","id","event/id",-1282332774),new cljs.core.Keyword("event","id","event/id",-1282332774).cljs$core$IFn$_invoke$arity$1(props)], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$telemetry$render_TelemetryEvent(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__42436 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__42436__$1 = cljs.core.__destructure_map(map__42436);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42436__$1,new cljs.core.Keyword("event","id","event/id",-1282332774));
var timestamp = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42436__$1,new cljs.core.Keyword("event","timestamp","event/timestamp",-1672439471));
var event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42436__$1,new cljs.core.Keyword(null,"event","event",301435442));
var tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42436__$1,new cljs.core.Keyword(null,"tool","tool",-1298696470));
var duration_ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42436__$1,new cljs.core.Keyword(null,"duration-ms","duration-ms",1993555055));
var success_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42436__$1,new cljs.core.Keyword(null,"success?","success?",-122854052));
return com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:110"})]);
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.telemetry !== 'undefined') && (typeof ouroboros.frontend.ui.pages.telemetry.TelemetryEvent !== 'undefined')){
} else {
/**
 * @constructor
 */
ouroboros.frontend.ui.pages.telemetry.TelemetryEvent = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42452,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.telemetry.TelemetryEvent,new cljs.core.Keyword("ouroboros.frontend.ui.pages.telemetry","TelemetryEvent","ouroboros.frontend.ui.pages.telemetry/TelemetryEvent",1816155274),options__36450__auto___42452);

var options__36450__auto___42453 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$telemetry$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"connected?","connected?",-1197551387)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$telemetry$ident_STAR_(this$,p__42437){
var map__42438 = p__42437;
var map__42438__$1 = cljs.core.__destructure_map(map__42438);
var connected_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42438__$1,new cljs.core.Keyword(null,"connected?","connected?",-1197551387));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("component","id","component/id",298306903),new cljs.core.Keyword(null,"connection-indicator","connection-indicator",-1638226717)], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$telemetry$render_ConnectionIndicator(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__42439 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__42439__$1 = cljs.core.__destructure_map(map__42439);
var connected_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42439__$1,new cljs.core.Keyword(null,"connected?","connected?",-1197551387));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.telemetry:119"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",-1983287057),["connection-indicator-inline ",(cljs.core.truth_(connected_QMARK_)?"connected":"disconnected")].join('')], null)], 0)),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["span",({"data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:120", "className": "connection-dot"})]),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (cljs.core.truth_(connected_QMARK_)?"Live":"Offline");
var G__42440 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.telemetry:121"], null),G__42440], 0));
} else {
return G__42440;
}
})()], null),new cljs.core.Keyword(null,".connection-label",".connection-label",1017710545))], null),null);
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.telemetry !== 'undefined') && (typeof ouroboros.frontend.ui.pages.telemetry.ConnectionIndicator !== 'undefined')){
} else {
/**
 * @constructor
 */
ouroboros.frontend.ui.pages.telemetry.ConnectionIndicator = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42453,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.telemetry.ConnectionIndicator,new cljs.core.Keyword("ouroboros.frontend.ui.pages.telemetry","ConnectionIndicator","ouroboros.frontend.ui.pages.telemetry/ConnectionIndicator",-168224082),options__36450__auto___42453);

var options__36450__auto___42454 = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$telemetry$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("telemetry","total-events","telemetry/total-events",-962742081),new cljs.core.Keyword("telemetry","tool-invocations","telemetry/tool-invocations",-1568665006),new cljs.core.Keyword("telemetry","query-executions","telemetry/query-executions",1384589555),new cljs.core.Keyword("telemetry","errors","telemetry/errors",1666568953),new cljs.core.Keyword("telemetry","error-rate","telemetry/error-rate",-111029903),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("telemetry","events","telemetry/events",1566822626),com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.telemetry.TelemetryEvent)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"telemetry","telemetry",-764940235)], null),new cljs.core.Keyword("page","error","page/error",-985089113)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$telemetry$ident_STAR_(this$,p__42441){
var map__42442 = p__42441;
var map__42442__$1 = cljs.core.__destructure_map(map__42442);
var props = map__42442__$1;
var total_events = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42442__$1,new cljs.core.Keyword("telemetry","total-events","telemetry/total-events",-962742081));
var tool_invocations = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42442__$1,new cljs.core.Keyword("telemetry","tool-invocations","telemetry/tool-invocations",-1568665006));
var query_executions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42442__$1,new cljs.core.Keyword("telemetry","query-executions","telemetry/query-executions",1384589555));
var errors = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42442__$1,new cljs.core.Keyword("telemetry","errors","telemetry/errors",1666568953));
var error_rate = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42442__$1,new cljs.core.Keyword("telemetry","error-rate","telemetry/error-rate",-111029903));
var events = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42442__$1,new cljs.core.Keyword("telemetry","events","telemetry/events",1566822626));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42442__$1,new cljs.core.Keyword("page","error","page/error",-985089113));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235)], null);
}),new cljs.core.Keyword(null,"route-segment","route-segment",1812935886),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["telemetry"], null),new cljs.core.Keyword(null,"will-enter","will-enter",-692415624),(function (app,route_params){
return com.fulcrologic.fulcro.routing.dynamic_routing.route_deferred(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235)], null),(function (){
return com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235)], null),ouroboros.frontend.ui.pages.telemetry.TelemetryPage,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"marker","marker",865118313),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235),new cljs.core.Keyword(null,"post-mutation","post-mutation",-1076606705),new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","target-ready","com.fulcrologic.fulcro.routing.dynamic-routing/target-ready",-111862826,null),new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235)], null)], null),new cljs.core.Keyword(null,"fallback","fallback",761637929),new cljs.core.Symbol("ouroboros.frontend.ui.pages.telemetry","handle-load-error","ouroboros.frontend.ui.pages.telemetry/handle-load-error",1398122597,null),new cljs.core.Keyword(null,"fallback-params","fallback-params",-2048144971),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"page-id","page-id",-872941168),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235),new cljs.core.Keyword(null,"error-message","error-message",1756021561),"Failed to load telemetry data"], null)], null));
}));
}),new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (this$){
var original_handler = ouroboros.frontend.websocket.handle_message;
return (ouroboros.frontend.websocket.handle_message = (function (message){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("telemetry","event","telemetry/event",1056223071),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(message))){
com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Symbol("ouroboros.frontend.ui.pages.telemetry","add-telemetry-event","ouroboros.frontend.ui.pages.telemetry/add-telemetry-event",-1610223767,null),null,(1),null)),(new cljs.core.List(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Keyword(null,"event","event",301435442),null,(1),null)),(new cljs.core.List(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(message),null,(1),null)))))),null,(1),null))))),null,(1),null)))))));
} else {
}

return original_handler.cljs$core$IFn$_invoke$arity$1(message);
}));
}),new cljs.core.Keyword(null,"component-will-unmount","component-will-unmount",-2058314698),(function (this$){
return (ouroboros.frontend.websocket.handle_message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.meta(new cljs.core.Var(function(){return ouroboros.frontend.websocket.handle_message;},new cljs.core.Symbol("ouroboros.frontend.websocket","handle-message","ouroboros.frontend.websocket/handle-message",1075159348,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"ouroboros.frontend.websocket","ouroboros.frontend.websocket",110956692,null),new cljs.core.Symbol(null,"handle-message","handle-message",-1078296217,null),"ouroboros/frontend/websocket.cljs",25,1,23,23,cljs.core.List.EMPTY,null,(cljs.core.truth_(ouroboros.frontend.websocket.handle_message)?ouroboros.frontend.websocket.handle_message.cljs$lang$test:null)]))),new cljs.core.Keyword(null,"original","original",-445386197)));
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$telemetry$render_TelemetryPage(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__42443 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__42443__$1 = cljs.core.__destructure_map(map__42443);
var props = map__42443__$1;
var total_events = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42443__$1,new cljs.core.Keyword("telemetry","total-events","telemetry/total-events",-962742081));
var tool_invocations = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42443__$1,new cljs.core.Keyword("telemetry","tool-invocations","telemetry/tool-invocations",-1568665006));
var query_executions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42443__$1,new cljs.core.Keyword("telemetry","query-executions","telemetry/query-executions",1384589555));
var errors = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42443__$1,new cljs.core.Keyword("telemetry","errors","telemetry/errors",1666568953));
var error_rate = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42443__$1,new cljs.core.Keyword("telemetry","error-rate","telemetry/error-rate",-111029903));
var events = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42443__$1,new cljs.core.Keyword("telemetry","events","telemetry/events",1566822626));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42443__$1,new cljs.core.Keyword("page","error","page/error",-985089113));
var loading_QMARK_ = com.fulcrologic.fulcro.data_fetch.loading_QMARK_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"telemetry","telemetry",-764940235)], null)));
var error_msg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","error","page/error",-985089113),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235)], null));
var ws_connected_QMARK_ = ouroboros.frontend.websocket.connected_QMARK_();
if(cljs.core.truth_(error_msg)){
var retry_handler = (function (){
com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Symbol("ouroboros.frontend.ui.pages.telemetry","clear-page-error","ouroboros.frontend.ui.pages.telemetry/clear-page-error",107617528,null),null,(1),null)),(new cljs.core.List(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Keyword(null,"page-id","page-id",-872941168),null,(1),null)),(new cljs.core.List(null,new cljs.core.Keyword(null,"telemetry","telemetry",-764940235),null,(1),null)))))),null,(1),null))))),null,(1),null)))))));

return com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(this$,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235)], null),ouroboros.frontend.ui.pages.telemetry.TelemetryPage,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"marker","marker",865118313),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235),new cljs.core.Keyword(null,"fallback","fallback",761637929),new cljs.core.Symbol("ouroboros.frontend.ui.pages.telemetry","handle-load-error","ouroboros.frontend.ui.pages.telemetry/handle-load-error",1398122597,null),new cljs.core.Keyword(null,"fallback-params","fallback-params",-2048144971),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"page-id","page-id",-872941168),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235),new cljs.core.Keyword(null,"error-message","error-message",1756021561),"Failed to load telemetry data"], null)], null));
});
return ouroboros.frontend.ui.components.error_state(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"message","message",-406056002),error_msg,new cljs.core.Keyword(null,"on-retry","on-retry",-610804293),retry_handler], null));
} else {
if(loading_QMARK_){
return ouroboros.frontend.ui.pages.telemetry.telemetry_loading();
} else {
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "flex items-center justify-between", "data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:193"}),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h1",({"data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:194"}),"Telemetry"])),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.components.connection_status(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connected?","connected?",-1197551387),ws_connected_QMARK_], null)))]);
var G__42444 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.telemetry:192"], null),G__42444], 0));
} else {
return G__42444;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "metrics-grid mb-3", "data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:198"}),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = total_events;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Total Events"], null))),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = tool_invocations;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Tool Invocations"], null))),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = query_executions;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Query Executions"], null))),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = errors;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Errors",new cljs.core.Keyword(null,"className","className",-1983287057),((((function (){var or__5002__auto__ = errors;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})() > (0)))?"text-warning":null)], null)))]),(cljs.core.truth_(error_rate)?ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"Error Rate"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(Math.round(((100) * error_rate))),"%"].join('');
var G__42445 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.telemetry:216"], null),G__42445], 0));
} else {
return G__42445;
}
})()], null),null)], 0)):null),ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"title","title",636505583),"Recent Events",new cljs.core.Keyword(null,"actions","actions",-812656882),(cljs.core.truth_(ws_connected_QMARK_)?com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["span",({"className": "live-badge", "data-fulcro-source": "ouroboros.frontend.ui.pages.telemetry:222"}),"\u25CF LIVE"]):null)], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core.seq(events))?ouroboros.frontend.ui.pages.telemetry.event_table(events):ouroboros.frontend.ui.components.empty_state(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"icon","icon",1679606541),"Telemetry",new cljs.core.Keyword(null,"message","message",-406056002),"No telemetry events recorded"], null)))], 0))], null),null);

}
}
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.telemetry !== 'undefined') && (typeof ouroboros.frontend.ui.pages.telemetry.TelemetryPage !== 'undefined')){
} else {
/**
 * @constructor
 */
ouroboros.frontend.ui.pages.telemetry.TelemetryPage = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42454,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.telemetry.TelemetryPage,new cljs.core.Keyword("ouroboros.frontend.ui.pages.telemetry","TelemetryPage","ouroboros.frontend.ui.pages.telemetry/TelemetryPage",1898660255),options__36450__auto___42454);

//# sourceMappingURL=ouroboros.frontend.ui.pages.telemetry.js.map
