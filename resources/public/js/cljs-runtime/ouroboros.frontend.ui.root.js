goog.provide('ouroboros.frontend.ui.root');
/**
 * Navigate to a route using the global app instance
 */
ouroboros.frontend.ui.root.navigate_to = (function ouroboros$frontend$ui$root$navigate_to(route){
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.app.app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [route], null));
});

var options__36450__auto___42716 = new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"preserve-dynamic-query?","preserve-dynamic-query?",893339297),true,new cljs.core.Keyword(null,"router-targets","router-targets",1582229763),new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [ouroboros.frontend.ui.pages.dashboard.DashboardPage,ouroboros.frontend.ui.pages.telemetry.TelemetryPage,ouroboros.frontend.ui.pages.users.UsersPage,ouroboros.frontend.ui.pages.sessions.SessionsPage,ouroboros.frontend.ui.pages.projects.ProjectsPage,ouroboros.frontend.ui.pages.project_detail.ProjectDetailPage,ouroboros.frontend.ui.pages.empathy_builder.EmpathyBuilderPage,ouroboros.frontend.ui.pages.value_prop_builder.ValuePropBuilderPage,ouroboros.frontend.ui.pages.mvp_builder.MVPBuilderPage,ouroboros.frontend.ui.pages.lean_canvas_builder.LeanCanvasBuilderPage], null),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$root$render_MainRouter(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__42707 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__42707__$1 = cljs.core.__destructure_map(map__42707);
var props = map__42707__$1;
var current_route = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42707__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871));
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42707__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961));
var current_state = com.fulcrologic.fulcro.ui_state_machines.get_active_state(this$,new cljs.core.Keyword("ouroboros.frontend.ui.root","MainRouter","ouroboros.frontend.ui.root/MainRouter",539809404));
var state_map = com.fulcrologic.fulcro.components.component__GT_state_map(this$);
var sm_env = com.fulcrologic.fulcro.ui_state_machines.state_machine_env.cljs$core$IFn$_invoke$arity$5(state_map,null,new cljs.core.Keyword("ouroboros.frontend.ui.root","MainRouter","ouroboros.frontend.ui.root/MainRouter",539809404),new cljs.core.Keyword(null,"fake","fake",-904846741),cljs.core.PersistentArrayMap.EMPTY);
var pending_path_segment = ((com.fulcrologic.fulcro.ui_state_machines.asm_active_QMARK_(this$,new cljs.core.Keyword("ouroboros.frontend.ui.root","MainRouter","ouroboros.frontend.ui.root/MainRouter",539809404)))?com.fulcrologic.fulcro.ui_state_machines.retrieve.cljs$core$IFn$_invoke$arity$2(sm_env,new cljs.core.Keyword(null,"pending-path-segment","pending-path-segment",-1932876268)):null);
var class$ = com.fulcrologic.fulcro.routing.dynamic_routing.current_route_class(this$);
if(cljs.core.truth_(cljs.core.constantly(true)(current_state))){
if(cljs.core.truth_(class$)){
var factory = com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$1(class$);
var G__42708 = com.fulcrologic.fulcro.raw.components.computed(current_route,com.fulcrologic.fulcro.raw.components.get_computed.cljs$core$IFn$_invoke$arity$1(this$));
return (factory.cljs$core$IFn$_invoke$arity$1 ? factory.cljs$core$IFn$_invoke$arity$1(G__42708) : factory.call(null, G__42708));
} else {
return null;
}
} else {
var this$__$1 = this$;
var props__$1 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"current-state","current-state",1048284452),current_state,new cljs.core.Keyword(null,"route-factory","route-factory",-1848194547),(cljs.core.truth_(class$)?com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$1(class$):null),new cljs.core.Keyword(null,"pending-path-segment","pending-path-segment",-1932876268),pending_path_segment,new cljs.core.Keyword(null,"route-props","route-props",-836332554),current_route], null);
return null;
}
}));
}),new cljs.core.Keyword(null,"use-hooks?","use-hooks?",-1627537900),false,new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$root$ident_STAR_(this$,p__42709){
var map__42710 = p__42709;
var map__42710__$1 = cljs.core.__destructure_map(map__42710);
var props = map__42710__$1;
var current_route = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42710__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871));
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42710__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961),new cljs.core.Keyword("ouroboros.frontend.ui.root","MainRouter","ouroboros.frontend.ui.root/MainRouter",539809404)], null);
}),new cljs.core.Keyword(null,"componentDidMount","componentDidMount",955710936),(function (this__41398__auto__){
return com.fulcrologic.fulcro.routing.dynamic_routing.validate_route_targets(this__41398__auto__);
}),new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),(function ouroboros$frontend$ui$root$build_raw_initial_state_STAR_(params){
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"alt8","alt8",-953819006),new cljs.core.Keyword(null,"alt5","alt5",66789347),new cljs.core.Keyword(null,"alt1","alt1",-496303545),new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871),new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961),new cljs.core.Keyword(null,"alt0","alt0",486699186),new cljs.core.Keyword(null,"alt6","alt6",-2114559563),new cljs.core.Keyword(null,"alt4","alt4",-1320607177),new cljs.core.Keyword(null,"alt3","alt3",-1672179143),new cljs.core.Keyword(null,"alt7","alt7",-1401672995),new cljs.core.Keyword(null,"alt2","alt2",-843512290)],[com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.lean_canvas_builder.LeanCanvasBuilderPage,cljs.core.PersistentArrayMap.EMPTY),com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.empathy_builder.EmpathyBuilderPage,cljs.core.PersistentArrayMap.EMPTY),com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.users.UsersPage,cljs.core.PersistentArrayMap.EMPTY),com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.dashboard.DashboardPage,params),new cljs.core.Keyword("ouroboros.frontend.ui.root","MainRouter","ouroboros.frontend.ui.root/MainRouter",539809404),com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.telemetry.TelemetryPage,cljs.core.PersistentArrayMap.EMPTY),com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.value_prop_builder.ValuePropBuilderPage,cljs.core.PersistentArrayMap.EMPTY),com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.project_detail.ProjectDetailPage,cljs.core.PersistentArrayMap.EMPTY),com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.projects.ProjectsPage,cljs.core.PersistentArrayMap.EMPTY),com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.mvp_builder.MVPBuilderPage,cljs.core.PersistentArrayMap.EMPTY),com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.sessions.SessionsPage,cljs.core.PersistentArrayMap.EMPTY)]);
}),new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$root$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 13, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","id","com.fulcrologic.fulcro.routing.dynamic-routing/id",-214558961),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),new cljs.core.Keyword("ouroboros.frontend.ui.root","MainRouter","ouroboros.frontend.ui.root/MainRouter",539809404)], null),new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","dynamic-router-targets","com.fulcrologic.fulcro.routing.dynamic-routing/dynamic-router-targets",-786251636),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.routing.dynamic-routing","current-route","com.fulcrologic.fulcro.routing.dynamic-routing/current-route",-2083218871),(function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.dashboard.DashboardPage);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Route target has no query! ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.component_name(ouroboros.frontend.ui.pages.dashboard.DashboardPage))].join(''),cljs.core.PersistentArrayMap.EMPTY);
}
})()], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"alt0","alt0",486699186),(function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.telemetry.TelemetryPage);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Route target has no query! ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.component_name(ouroboros.frontend.ui.pages.telemetry.TelemetryPage))].join(''),cljs.core.PersistentArrayMap.EMPTY);
}
})()], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"alt1","alt1",-496303545),(function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.users.UsersPage);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Route target has no query! ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.component_name(ouroboros.frontend.ui.pages.users.UsersPage))].join(''),cljs.core.PersistentArrayMap.EMPTY);
}
})()], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"alt2","alt2",-843512290),(function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.sessions.SessionsPage);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Route target has no query! ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.component_name(ouroboros.frontend.ui.pages.sessions.SessionsPage))].join(''),cljs.core.PersistentArrayMap.EMPTY);
}
})()], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"alt3","alt3",-1672179143),(function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.projects.ProjectsPage);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Route target has no query! ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.component_name(ouroboros.frontend.ui.pages.projects.ProjectsPage))].join(''),cljs.core.PersistentArrayMap.EMPTY);
}
})()], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"alt4","alt4",-1320607177),(function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.project_detail.ProjectDetailPage);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Route target has no query! ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.component_name(ouroboros.frontend.ui.pages.project_detail.ProjectDetailPage))].join(''),cljs.core.PersistentArrayMap.EMPTY);
}
})()], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"alt5","alt5",66789347),(function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.empathy_builder.EmpathyBuilderPage);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Route target has no query! ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.component_name(ouroboros.frontend.ui.pages.empathy_builder.EmpathyBuilderPage))].join(''),cljs.core.PersistentArrayMap.EMPTY);
}
})()], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"alt6","alt6",-2114559563),(function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.value_prop_builder.ValuePropBuilderPage);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Route target has no query! ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.component_name(ouroboros.frontend.ui.pages.value_prop_builder.ValuePropBuilderPage))].join(''),cljs.core.PersistentArrayMap.EMPTY);
}
})()], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"alt7","alt7",-1401672995),(function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.mvp_builder.MVPBuilderPage);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Route target has no query! ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.component_name(ouroboros.frontend.ui.pages.mvp_builder.MVPBuilderPage))].join(''),cljs.core.PersistentArrayMap.EMPTY);
}
})()], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"alt8","alt8",-953819006),(function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.lean_canvas_builder.LeanCanvasBuilderPage);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Route target has no query! ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.component_name(ouroboros.frontend.ui.pages.lean_canvas_builder.LeanCanvasBuilderPage))].join(''),cljs.core.PersistentArrayMap.EMPTY);
}
})()], null)], null);
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.root !== 'undefined') && (typeof ouroboros.frontend.ui.root.MainRouter !== 'undefined')){
} else {
/**
 * @constructor
 */
ouroboros.frontend.ui.root.MainRouter = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42716,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.root.MainRouter,new cljs.core.Keyword("ouroboros.frontend.ui.root","MainRouter","ouroboros.frontend.ui.root/MainRouter",539809404),options__36450__auto___42716);
ouroboros.frontend.ui.root.ui_main_router = com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.root.MainRouter,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keyfn","keyfn",780060332),new cljs.core.Keyword(null,"router-id","router-id",-1735771365)], null));

var options__36450__auto___42717 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$root$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main-router","main-router",655456432),com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.root.MainRouter)], null)], null);
}),new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),(function ouroboros$frontend$ui$root$build_raw_initial_state_STAR_(_){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main-router","main-router",655456432),(function (){var G__42711 = ouroboros.frontend.ui.root.MainRouter;
var G__42712 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"router-id","router-id",-1735771365),new cljs.core.Keyword(null,"main-router","main-router",655456432)], null);
return (com.fulcrologic.fulcro.components.get_initial_state.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(G__42711,G__42712) : com.fulcrologic.fulcro.components.get_initial_state.call(null, G__42711,G__42712));
})()], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$root$render_Root(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__42713 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__42713__$1 = cljs.core.__destructure_map(map__42713);
var main_router = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42713__$1,new cljs.core.Keyword(null,"main-router","main-router",655456432));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.components.navbar(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"active-route","active-route",-1914333809),"dashboard",new cljs.core.Keyword(null,"on-navigate","on-navigate",-297227908),ouroboros.frontend.ui.root.navigate_to], null));
var G__42714 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.root:59"], null),G__42714], 0));
} else {
return G__42714;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("main",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (ouroboros.frontend.ui.root.ui_main_router.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.root.ui_main_router.cljs$core$IFn$_invoke$arity$1(main_router) : ouroboros.frontend.ui.root.ui_main_router.call(null, main_router));
var G__42715 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.root:63"], null),G__42715], 0));
} else {
return G__42715;
}
})()], null),new cljs.core.Keyword(null,".main-content",".main-content",-1257264451))], null),new cljs.core.Keyword(null,".app-container",".app-container",-962551135));
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.root !== 'undefined') && (typeof ouroboros.frontend.ui.root.Root !== 'undefined')){
} else {
/**
 * @constructor
 */
ouroboros.frontend.ui.root.Root = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42717,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.root.Root,new cljs.core.Keyword("ouroboros.frontend.ui.root","Root","ouroboros.frontend.ui.root/Root",-630317806),options__36450__auto___42717);

//# sourceMappingURL=ouroboros.frontend.ui.root.js.map
