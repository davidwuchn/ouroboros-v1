goog.provide('ouroboros.frontend.ui.components');

var options__36450__auto___40012 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$components$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",-406056002)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$components$ident_STAR_(this$,props){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("component","id","component/id",298306903),new cljs.core.Keyword(null,"error-display","error-display",994206701)], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$components$render_ErrorDisplay(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var props = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var message = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(props);
var retry_fn = new cljs.core.Keyword(null,"on-retry","on-retry",-610804293).cljs$core$IFn$_invoke$arity$1(props);
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.components:17", "className": "error-state-icon"}),"\u26A0\uFE0F"]);
var G__39540 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:16"], null),G__39540], 0));
} else {
return G__39540;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = message;
var G__39553 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:18"], null),G__39553], 0));
} else {
return G__39553;
}
})()], null),new cljs.core.Keyword(null,".error-state-message",".error-state-message",2088094960)),(cljs.core.truth_(retry_fn)?(function (){var G__39562 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),retry_fn,new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"primary","primary",817773892)], null);
var G__39563 = "Try Again";
return (ouroboros.frontend.ui.components.button.cljs$core$IFn$_invoke$arity$2 ? ouroboros.frontend.ui.components.button.cljs$core$IFn$_invoke$arity$2(G__39562,G__39563) : ouroboros.frontend.ui.components.button.call(null, G__39562,G__39563));
})():null)], null),new cljs.core.Keyword(null,".error-state",".error-state",1256968369));
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.components !== 'undefined') && (typeof ouroboros.frontend.ui.components.ErrorDisplay !== 'undefined')){
} else {
/**
 * @constructor
 */
ouroboros.frontend.ui.components.ErrorDisplay = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___40012,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.components.ErrorDisplay,new cljs.core.Keyword("ouroboros.frontend.ui.components","ErrorDisplay","ouroboros.frontend.ui.components/ErrorDisplay",-139681550),options__36450__auto___40012);
ouroboros.frontend.ui.components.connection_status = (function ouroboros$frontend$ui$components$connection_status(p__39599){
var map__39601 = p__39599;
var map__39601__$1 = cljs.core.__destructure_map(map__39601);
var connected_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39601__$1,new cljs.core.Keyword(null,"connected?","connected?",-1197551387));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:30"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",-1983287057),["connection-status ",(cljs.core.truth_(connected_QMARK_)?"connected":"disconnected")].join('')], null)], 0)),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["span",({"data-fulcro-source": "ouroboros.frontend.ui.components:31", "className": "connection-indicator"})]),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (cljs.core.truth_(connected_QMARK_)?"Live":"Offline");
var G__39610 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:32"], null),G__39610], 0));
} else {
return G__39610;
}
})()], null),new cljs.core.Keyword(null,".connection-text",".connection-text",778888999))], null),null);
});
/**
 * Navigation bar component
 */
ouroboros.frontend.ui.components.navbar = (function ouroboros$frontend$ui$components$navbar(p__39623){
var map__39624 = p__39623;
var map__39624__$1 = cljs.core.__destructure_map(map__39624);
var active_route = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39624__$1,new cljs.core.Keyword(null,"active-route","active-route",-1914333809));
var on_navigate = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39624__$1,new cljs.core.Keyword(null,"on-navigate","on-navigate",-297227908));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("nav",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("a",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:43"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (){
return (on_navigate.cljs$core$IFn$_invoke$arity$1 ? on_navigate.cljs$core$IFn$_invoke$arity$1("dashboard") : on_navigate.call(null, "dashboard"));
})], null)], 0)),"\uD83D\uDC0D Ouroboros"], null),new cljs.core.Keyword(null,".navbar-brand",".navbar-brand",828707457));
var G__39636 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:42"], null),G__39636], 0));
} else {
return G__39636;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("ul",new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("li",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("a",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:47"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"className","className",-1983287057),["nav-link",((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(active_route,"dashboard"))?" active":null)].join(''),new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (){
return (on_navigate.cljs$core$IFn$_invoke$arity$1 ? on_navigate.cljs$core$IFn$_invoke$arity$1("dashboard") : on_navigate.call(null, "dashboard"));
})], null)], 0)),"Dashboard"], null),null);
var G__39647 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:47"], null),G__39647], 0));
} else {
return G__39647;
}
})()], null),null);
var G__39648 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:46"], null),G__39648], 0));
} else {
return G__39648;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("li",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("a",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:50"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"className","className",-1983287057),["nav-link",((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(active_route,"projects"))?" active":null)].join(''),new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (){
return (on_navigate.cljs$core$IFn$_invoke$arity$1 ? on_navigate.cljs$core$IFn$_invoke$arity$1("projects") : on_navigate.call(null, "projects"));
})], null)], 0)),"Projects"], null),null);
var G__39651 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:50"], null),G__39651], 0));
} else {
return G__39651;
}
})()], null),null),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("li",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("a",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:53"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"className","className",-1983287057),["nav-link",((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(active_route,"telemetry"))?" active":null)].join(''),new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (){
return (on_navigate.cljs$core$IFn$_invoke$arity$1 ? on_navigate.cljs$core$IFn$_invoke$arity$1("telemetry") : on_navigate.call(null, "telemetry"));
})], null)], 0)),"Telemetry"], null),null);
var G__39660 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:53"], null),G__39660], 0));
} else {
return G__39660;
}
})()], null),null),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("li",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("a",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:56"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"className","className",-1983287057),["nav-link",((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(active_route,"users"))?" active":null)].join(''),new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (){
return (on_navigate.cljs$core$IFn$_invoke$arity$1 ? on_navigate.cljs$core$IFn$_invoke$arity$1("users") : on_navigate.call(null, "users"));
})], null)], 0)),"Users"], null),null);
var G__39666 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:56"], null),G__39666], 0));
} else {
return G__39666;
}
})()], null),null),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("li",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("a",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:59"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"className","className",-1983287057),["nav-link",((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(active_route,"sessions"))?" active":null)].join(''),new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (){
return (on_navigate.cljs$core$IFn$_invoke$arity$1 ? on_navigate.cljs$core$IFn$_invoke$arity$1("sessions") : on_navigate.call(null, "sessions"));
})], null)], 0)),"Sessions"], null),null);
var G__39678 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:59"], null),G__39678], 0));
} else {
return G__39678;
}
})()], null),null)], null),new cljs.core.Keyword(null,".navbar-nav",".navbar-nav",-2133462441))], null),new cljs.core.Keyword(null,".navbar",".navbar",1661594887));
});
/**
 * Main application layout
 */
ouroboros.frontend.ui.components.main_layout = (function ouroboros$frontend$ui$components$main_layout(p__39685){
var map__39686 = p__39685;
var map__39686__$1 = cljs.core.__destructure_map(map__39686);
var navbar_content = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39686__$1,new cljs.core.Keyword(null,"navbar-content","navbar-content",-2062785741));
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39686__$1,new cljs.core.Keyword(null,"children","children",-940561982));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = navbar_content;
var G__39691 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:66"], null),G__39691], 0));
} else {
return G__39691;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("main",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = children;
var G__39694 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:68"], null),G__39694], 0));
} else {
return G__39694;
}
})()], null),new cljs.core.Keyword(null,".main-content",".main-content",-1257264451))], null),new cljs.core.Keyword(null,".app-container",".app-container",-962551135));
});
/**
 * Display a metric with label
 */
ouroboros.frontend.ui.components.metric_card = (function ouroboros$frontend$ui$components$metric_card(p__39698){
var map__39699 = p__39698;
var map__39699__$1 = cljs.core.__destructure_map(map__39699);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39699__$1,new cljs.core.Keyword(null,"value","value",305978217));
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39699__$1,new cljs.core.Keyword(null,"label","label",1718410804));
var className = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39699__$1,new cljs.core.Keyword(null,"className","className",-1983287057));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:79"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",-1983287057),["metric-value ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(className)].join('')], null)], 0)),value], null),null);
var G__39704 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:78"], null),G__39704], 0));
} else {
return G__39704;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = label;
var G__39707 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:80"], null),G__39707], 0));
} else {
return G__39707;
}
})()], null),new cljs.core.Keyword(null,".metric-label",".metric-label",-1235108808))], null),new cljs.core.Keyword(null,".metric-card",".metric-card",2121565967));
});
/**
 * Card container with optional title
 */
ouroboros.frontend.ui.components.card = (function ouroboros$frontend$ui$components$card(var_args){
var args__5732__auto__ = [];
var len__5726__auto___40134 = arguments.length;
var i__5727__auto___40135 = (0);
while(true){
if((i__5727__auto___40135 < len__5726__auto___40134)){
args__5732__auto__.push((arguments[i__5727__auto___40135]));

var G__40137 = (i__5727__auto___40135 + (1));
i__5727__auto___40135 = G__40137;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic = (function (p__39762,children){
var map__39763 = p__39762;
var map__39763__$1 = cljs.core.__destructure_map(map__39763);
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39763__$1,new cljs.core.Keyword(null,"title","title",636505583));
var className = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39763__$1,new cljs.core.Keyword(null,"className","className",-1983287057));
var actions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39763__$1,new cljs.core.Keyword(null,"actions","actions",-812656882));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:85"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",-1983287057),["card ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(className)].join('')], null)], 0)),(cljs.core.truth_((function (){var or__5002__auto__ = title;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return actions;
}
})())?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (cljs.core.truth_(title)?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("h2",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = title;
var G__39769 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:89"], null),G__39769], 0));
} else {
return G__39769;
}
})()], null),new cljs.core.Keyword(null,".card-title",".card-title",1927235738)):null);
var G__39772 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:87"], null),G__39772], 0));
} else {
return G__39772;
}
})(),(cljs.core.truth_(actions)?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = actions;
var G__39778 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:91"], null),G__39778], 0));
} else {
return G__39778;
}
})()], null),new cljs.core.Keyword(null,".card-actions",".card-actions",-1000790231)):null)], null),new cljs.core.Keyword(null,".card-header",".card-header",-562313337)):null),children], null),null);
}));

(ouroboros.frontend.ui.components.card.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(ouroboros.frontend.ui.components.card.cljs$lang$applyTo = (function (seq39715){
var G__39727 = cljs.core.first(seq39715);
var seq39715__$1 = cljs.core.next(seq39715);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39727,seq39715__$1);
}));

/**
 * Status indicator badge
 */
ouroboros.frontend.ui.components.status_badge = (function ouroboros$frontend$ui$components$status_badge(p__39786){
var map__39787 = p__39786;
var map__39787__$1 = cljs.core.__destructure_map(map__39787);
var ok_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39787__$1,new cljs.core.Keyword(null,"ok?","ok?",447310304));
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39787__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:101"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",-1983287057),["status-badge ",(cljs.core.truth_(ok_QMARK_)?"status-ok":"status-error")].join('')], null)], 0)),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["span",({"data-fulcro-source": "ouroboros.frontend.ui.components:102", "className": "status-indicator"})]),text], null),null);
});
/**
 * Loading spinner
 */
ouroboros.frontend.ui.components.loading = (function ouroboros$frontend$ui$components$loading(){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.components:109", "className": "spinner"})]);
var G__39794 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:108"], null),G__39794], 0));
} else {
return G__39794;
}
})(),"Loading..."], null),new cljs.core.Keyword(null,".loading",".loading",-2063833370));
});
/**
 * Empty state message
 */
ouroboros.frontend.ui.components.empty_state = (function ouroboros$frontend$ui$components$empty_state(p__39802){
var map__39804 = p__39802;
var map__39804__$1 = cljs.core.__destructure_map(map__39804);
var icon = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39804__$1,new cljs.core.Keyword(null,"icon","icon",1679606541));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39804__$1,new cljs.core.Keyword(null,"message","message",-406056002));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var or__5002__auto__ = icon;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "Empty";
}
})();
var G__39817 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:116"], null),G__39817], 0));
} else {
return G__39817;
}
})()], null),new cljs.core.Keyword(null,".empty-state-icon",".empty-state-icon",490528338));
var G__39818 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:115"], null),G__39818], 0));
} else {
return G__39818;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = message;
var G__39820 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:117"], null),G__39820], 0));
} else {
return G__39820;
}
})()], null),null)], null),new cljs.core.Keyword(null,".empty-state",".empty-state",-1634974870));
});
/**
 * Error state message with optional retry
 */
ouroboros.frontend.ui.components.error_state = (function ouroboros$frontend$ui$components$error_state(p__39824){
var map__39825 = p__39824;
var map__39825__$1 = cljs.core.__destructure_map(map__39825);
var props = map__39825__$1;
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39825__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var retry_fn = new cljs.core.Keyword(null,"on-retry","on-retry",-610804293).cljs$core$IFn$_invoke$arity$1(props);
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.components:124", "className": "error-state-icon"}),"\u26A0\uFE0F"]);
var G__39828 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:123"], null),G__39828], 0));
} else {
return G__39828;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = message;
var G__39830 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:125"], null),G__39830], 0));
} else {
return G__39830;
}
})()], null),new cljs.core.Keyword(null,".error-state-message",".error-state-message",2088094960)),(cljs.core.truth_(retry_fn)?(function (){var G__39831 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),retry_fn,new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"primary","primary",817773892)], null);
var G__39832 = "Try Again";
return (ouroboros.frontend.ui.components.button.cljs$core$IFn$_invoke$arity$2 ? ouroboros.frontend.ui.components.button.cljs$core$IFn$_invoke$arity$2(G__39831,G__39832) : ouroboros.frontend.ui.components.button.call(null, G__39831,G__39832));
})():null)], null),new cljs.core.Keyword(null,".error-state",".error-state",1256968369));
});
/**
 * Generic data table
 */
ouroboros.frontend.ui.components.data_table = (function ouroboros$frontend$ui$components$data_table(p__39846){
var map__39847 = p__39846;
var map__39847__$1 = cljs.core.__destructure_map(map__39847);
var columns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39847__$1,new cljs.core.Keyword(null,"columns","columns",1998437288));
var rows = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39847__$1,new cljs.core.Keyword(null,"rows","rows",850049680));
var empty_message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39847__$1,new cljs.core.Keyword(null,"empty-message","empty-message",-1625491415));
if(cljs.core.seq(rows)){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("table",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("thead",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("tr",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__39838_SHARP_){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("th",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:144"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(p1__39838_SHARP_)], null)], 0)),new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(p1__39838_SHARP_)], null),null);
}),columns);
var G__39860 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:143"], null),G__39860], 0));
} else {
return G__39860;
}
})()], null),null);
var G__39864 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:142"], null),G__39864], 0));
} else {
return G__39864;
}
})()], null),null);
var G__39869 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:141"], null),G__39869], 0));
} else {
return G__39869;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("tbody",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (idx,row){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("tr",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:148"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),idx], null)], 0)),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (col){
var key = new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(col);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(row,key);
var formatter = new cljs.core.Keyword(null,"format","format",-1306924766).cljs$core$IFn$_invoke$arity$2(col,cljs.core.identity);
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("td",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:153"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),key], null)], 0)),(formatter.cljs$core$IFn$_invoke$arity$2 ? formatter.cljs$core$IFn$_invoke$arity$2(value,row) : formatter.call(null, value,row))], null),null);
}),columns)], null),null);
}),rows);
var G__39875 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:145"], null),G__39875], 0));
} else {
return G__39875;
}
})()], null),null)], null),new cljs.core.Keyword(null,".data-table",".data-table",-953705169));
var G__39877 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:140"], null),G__39877], 0));
} else {
return G__39877;
}
})()], null),new cljs.core.Keyword(null,".table-container",".table-container",-1999206216));
} else {
return ouroboros.frontend.ui.components.empty_state(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),(function (){var or__5002__auto__ = empty_message;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "No data available";
}
})()], null));
}
});
/**
 * Button component
 */
ouroboros.frontend.ui.components.button = (function ouroboros$frontend$ui$components$button(p__39881){
var map__39882 = p__39881;
var map__39882__$1 = cljs.core.__destructure_map(map__39882);
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39882__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543));
var variant = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39882__$1,new cljs.core.Keyword(null,"variant","variant",-424354234));
var disabled = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39882__$1,new cljs.core.Keyword(null,"disabled","disabled",-1529784218));
var className = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39882__$1,new cljs.core.Keyword(null,"className","className",-1983287057));
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39882__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var variant_class = (function (){var G__39886 = variant;
var G__39886__$1 = (((G__39886 instanceof cljs.core.Keyword))?G__39886.fqn:null);
switch (G__39886__$1) {
case "secondary":
return "btn-secondary";

break;
case "danger":
return "btn-danger";

break;
default:
return "btn-primary";

}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("button",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:169"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"className","className",-1983287057),["btn ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(variant_class)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(className)].join(''),new cljs.core.Keyword(null,"disabled","disabled",-1529784218),disabled,new cljs.core.Keyword(null,"onClick","onClick",-1991238530),on_click], null)], 0)),children], null),null);
});
/**
 * Display code/data
 */
ouroboros.frontend.ui.components.code_block = (function ouroboros$frontend$ui$components$code_block(p__39927){
var map__39928 = p__39927;
var map__39928__$1 = cljs.core.__destructure_map(map__39928);
var content = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39928__$1,new cljs.core.Keyword(null,"content","content",15833224));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("pre",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("code",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = cljs.core.str.cljs$core$IFn$_invoke$arity$1(content);
var G__39943 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:183"], null),G__39943], 0));
} else {
return G__39943;
}
})()], null),null);
var G__39950 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.components:182"], null),G__39950], 0));
} else {
return G__39950;
}
})()], null),new cljs.core.Keyword(null,".code-block",".code-block",1318233935));
});

//# sourceMappingURL=ouroboros.frontend.ui.components.js.map
