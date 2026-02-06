goog.provide('ouroboros.frontend.ui.pages.users');
/**
 * 
 */
ouroboros.frontend.ui.pages.users.handle_load_error = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.users","handle-load-error","ouroboros.frontend.ui.pages.users/handle-load-error",975945140,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.users","handle-load-error","ouroboros.frontend.ui.pages.users/handle-load-error",975945140,null),(function (fulcro_mutation_env_symbol){
var map__42198 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__42198__$1 = cljs.core.__destructure_map(map__42198);
var page_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42198__$1,new cljs.core.Keyword(null,"page-id","page-id",-872941168));
var error_message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42198__$1,new cljs.core.Keyword(null,"error-message","error-message",1756021561));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$users$action(p__42199){
var map__42200 = p__42199;
var map__42200__$1 = cljs.core.__destructure_map(map__42200);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42200__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__42201_42221 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__42202_42222 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__42202_42222);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","error","page/error",-985089113),page_id], null),error_message);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__42201_42221);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__42203 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__42204 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__42204);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__42203);
}})], null);
}));
/**
 * 
 */
ouroboros.frontend.ui.pages.users.clear_page_error = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.users","clear-page-error","ouroboros.frontend.ui.pages.users/clear-page-error",520416841,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.users","clear-page-error","ouroboros.frontend.ui.pages.users/clear-page-error",520416841,null),(function (fulcro_mutation_env_symbol){
var map__42205 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__42205__$1 = cljs.core.__destructure_map(map__42205);
var page_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42205__$1,new cljs.core.Keyword(null,"page-id","page-id",-872941168));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$users$action(p__42206){
var map__42207 = p__42206;
var map__42207__$1 = cljs.core.__destructure_map(map__42207);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42207__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__42208_42223 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__42209_42224 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__42209_42224);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update,new cljs.core.Keyword("page","error","page/error",-985089113),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([page_id], 0));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__42208_42223);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__42210 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__42211 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__42211);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__42210);
}})], null);
}));
ouroboros.frontend.ui.pages.users.users_loading = (function ouroboros$frontend$ui$pages$users$users_loading(){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h1",({"data-fulcro-source": "ouroboros.frontend.ui.pages.users:29"}),"Users"]);
var G__42212 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.users:28"], null),G__42212], 0));
} else {
return G__42212;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "metrics-grid mb-3", "data-fulcro-source": "ouroboros.frontend.ui.pages.users:31"}),com.fulcrologic.fulcro.components.force_children(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((2),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "60px", "height": "2.5rem", "margin": "0 auto"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.users:34"})]);
var G__42213 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.users:33"], null),G__42213], 0));
} else {
return G__42213;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "100px", "margin": "0.5rem auto 0"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.users:36"})])], null),new cljs.core.Keyword(null,".metric-card",".metric-card",2121565967))))]),ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"Registered Users"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-table", "data-fulcro-source": "ouroboros.frontend.ui.pages.users:40"}),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-row", "style": ({"display": "flex", "gap": "1rem", "padding": "0.75rem 0", "borderBottom": "2px solid var(--color-border)", "marginBottom": "0.5rem"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.users:42"}),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "100px", "fontWeight": "bold"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.users:48"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "80px", "fontWeight": "bold"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.users:49"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "60px", "fontWeight": "bold"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.users:50"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "120px", "fontWeight": "bold"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.users:51"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "120px", "fontWeight": "bold"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.users:52"})]))])),com.fulcrologic.fulcro.components.force_children(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((5),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-row", "style": ({"display": "flex", "gap": "1rem", "padding": "0.75rem 0", "borderBottom": "1px solid var(--color-border)"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.users:55"}),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "100px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.users:60"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "80px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.users:61"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "60px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.users:62"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "120px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.users:63"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "120px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.users:64"})]))])))])], 0))], null),null);
});

var options__36450__auto___42225 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$users$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("user","id","user/id",-1375756663),new cljs.core.Keyword("user","name","user/name",1848814598),new cljs.core.Keyword("user","platform","user/platform",-855132317),new cljs.core.Keyword("user","role","user/role",-742594495),new cljs.core.Keyword("user","created-at","user/created-at",-84598831),new cljs.core.Keyword("user","last-active","user/last-active",-1899006107)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$users$ident_STAR_(_,props){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("user","id","user/id",-1375756663),new cljs.core.Keyword("user","id","user/id",-1375756663).cljs$core$IFn$_invoke$arity$1(props)], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$users$render_User(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__42214 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__42214__$1 = cljs.core.__destructure_map(map__42214);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42214__$1,new cljs.core.Keyword("user","id","user/id",-1375756663));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42214__$1,new cljs.core.Keyword("user","name","user/name",1848814598));
var platform = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42214__$1,new cljs.core.Keyword("user","platform","user/platform",-855132317));
var role = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42214__$1,new cljs.core.Keyword("user","role","user/role",-742594495));
var created_at = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42214__$1,new cljs.core.Keyword("user","created-at","user/created-at",-84598831));
var last_active = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42214__$1,new cljs.core.Keyword("user","last-active","user/last-active",-1899006107));
return com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.pages.users:76"})]);
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.users !== 'undefined') && (typeof ouroboros.frontend.ui.pages.users.User !== 'undefined')){
} else {
/**
 * @constructor
 */
ouroboros.frontend.ui.pages.users.User = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42225,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.users.User,new cljs.core.Keyword("ouroboros.frontend.ui.pages.users","User","ouroboros.frontend.ui.pages.users/User",-826580102),options__36450__auto___42225);
/**
 * Table of users
 */
ouroboros.frontend.ui.pages.users.user_table = (function ouroboros$frontend$ui$pages$users$user_table(users){
var columns = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"label","label",1718410804),"Name"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"platform","platform",-1086422114),new cljs.core.Keyword(null,"label","label",1718410804),"Platform"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"role","role",-736691072),new cljs.core.Keyword(null,"label","label",1718410804),"Role",new cljs.core.Keyword(null,"format","format",-1306924766),(function (v,_){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.users:90"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",-1983287057),["badge ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__42216 = v;
var G__42216__$1 = (((G__42216 instanceof cljs.core.Keyword))?G__42216.fqn:null);
switch (G__42216__$1) {
case "admin":
return "badge-primary";

break;
default:
return "badge-secondary";

}
})())].join('')], null)], 0)),cljs.core.name(v)], null),null);
})], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"created-at","created-at",-89248644),new cljs.core.Keyword(null,"label","label",1718410804),"Created"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"last-active","last-active",-1897657548),new cljs.core.Keyword(null,"label","label",1718410804),"Last Active"], null)], null);
var rows = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (u){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword("user","name","user/name",1848814598).cljs$core$IFn$_invoke$arity$1(u),new cljs.core.Keyword(null,"platform","platform",-1086422114),cljs.core.name(new cljs.core.Keyword("user","platform","user/platform",-855132317).cljs$core$IFn$_invoke$arity$1(u)),new cljs.core.Keyword(null,"role","role",-736691072),new cljs.core.Keyword("user","role","user/role",-742594495).cljs$core$IFn$_invoke$arity$1(u),new cljs.core.Keyword(null,"created-at","created-at",-89248644),new cljs.core.Keyword("user","created-at","user/created-at",-84598831).cljs$core$IFn$_invoke$arity$1(u),new cljs.core.Keyword(null,"last-active","last-active",-1897657548),new cljs.core.Keyword("user","last-active","user/last-active",-1899006107).cljs$core$IFn$_invoke$arity$1(u)], null);
}),users);
return ouroboros.frontend.ui.components.data_table(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"columns","columns",1998437288),columns,new cljs.core.Keyword(null,"rows","rows",850049680),rows,new cljs.core.Keyword(null,"empty-message","empty-message",-1625491415),"No users registered"], null));
});

var options__36450__auto___42227 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$users$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("auth","user-count","auth/user-count",763917241),new cljs.core.Keyword("auth","admin-count","auth/admin-count",-1145770240),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("auth","users","auth/users",-710531305),com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.users.User)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"users","users",-713552705)], null),new cljs.core.Keyword("page","error","page/error",-985089113)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$users$ident_STAR_(this$,p__42217){
var map__42218 = p__42217;
var map__42218__$1 = cljs.core.__destructure_map(map__42218);
var props = map__42218__$1;
var user_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42218__$1,new cljs.core.Keyword("auth","user-count","auth/user-count",763917241));
var admin_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42218__$1,new cljs.core.Keyword("auth","admin-count","auth/admin-count",-1145770240));
var users = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42218__$1,new cljs.core.Keyword("auth","users","auth/users",-710531305));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42218__$1,new cljs.core.Keyword("page","error","page/error",-985089113));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"users","users",-713552705)], null);
}),new cljs.core.Keyword(null,"route-segment","route-segment",1812935886),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["users"], null),new cljs.core.Keyword(null,"will-enter","will-enter",-692415624),(function (app,route_params){
return com.fulcrologic.fulcro.routing.dynamic_routing.route_deferred(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"users","users",-713552705)], null),(function (){
return com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"users","users",-713552705)], null),ouroboros.frontend.ui.pages.users.UsersPage,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"marker","marker",865118313),new cljs.core.Keyword(null,"users","users",-713552705),new cljs.core.Keyword(null,"post-mutation","post-mutation",-1076606705),new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","target-ready","com.fulcrologic.fulcro.routing.dynamic-routing/target-ready",-111862826,null),new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"users","users",-713552705)], null)], null),new cljs.core.Keyword(null,"fallback","fallback",761637929),new cljs.core.Symbol("ouroboros.frontend.ui.pages.users","handle-load-error","ouroboros.frontend.ui.pages.users/handle-load-error",975945140,null),new cljs.core.Keyword(null,"fallback-params","fallback-params",-2048144971),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"page-id","page-id",-872941168),new cljs.core.Keyword(null,"users","users",-713552705),new cljs.core.Keyword(null,"error-message","error-message",1756021561),"Failed to load users data"], null)], null));
}));
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$users$render_UsersPage(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__42219 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__42219__$1 = cljs.core.__destructure_map(map__42219);
var props = map__42219__$1;
var user_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42219__$1,new cljs.core.Keyword("auth","user-count","auth/user-count",763917241));
var admin_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42219__$1,new cljs.core.Keyword("auth","admin-count","auth/admin-count",-1145770240));
var users = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42219__$1,new cljs.core.Keyword("auth","users","auth/users",-710531305));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42219__$1,new cljs.core.Keyword("page","error","page/error",-985089113));
var loading_QMARK_ = com.fulcrologic.fulcro.data_fetch.loading_QMARK_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"users","users",-713552705)], null)));
var error_msg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","error","page/error",-985089113),new cljs.core.Keyword(null,"users","users",-713552705)], null));
if(cljs.core.truth_(error_msg)){
var retry_handler = (function (){
com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Symbol("ouroboros.frontend.ui.pages.users","clear-page-error","ouroboros.frontend.ui.pages.users/clear-page-error",520416841,null),null,(1),null)),(new cljs.core.List(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Keyword(null,"page-id","page-id",-872941168),null,(1),null)),(new cljs.core.List(null,new cljs.core.Keyword(null,"users","users",-713552705),null,(1),null)))))),null,(1),null))))),null,(1),null)))))));

return com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(this$,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"users","users",-713552705)], null),ouroboros.frontend.ui.pages.users.UsersPage,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"marker","marker",865118313),new cljs.core.Keyword(null,"users","users",-713552705),new cljs.core.Keyword(null,"fallback","fallback",761637929),new cljs.core.Symbol("ouroboros.frontend.ui.pages.users","handle-load-error","ouroboros.frontend.ui.pages.users/handle-load-error",975945140,null),new cljs.core.Keyword(null,"fallback-params","fallback-params",-2048144971),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"page-id","page-id",-872941168),new cljs.core.Keyword(null,"users","users",-713552705),new cljs.core.Keyword(null,"error-message","error-message",1756021561),"Failed to load users data"], null)], null));
});
return ouroboros.frontend.ui.components.error_state(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"message","message",-406056002),error_msg,new cljs.core.Keyword(null,"on-retry","on-retry",-610804293),retry_handler], null));
} else {
if(loading_QMARK_){
return ouroboros.frontend.ui.pages.users.users_loading();
} else {
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h1",({"data-fulcro-source": "ouroboros.frontend.ui.pages.users:156"}),"Users"]);
var G__42220 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.users:155"], null),G__42220], 0));
} else {
return G__42220;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "metrics-grid mb-3", "data-fulcro-source": "ouroboros.frontend.ui.pages.users:159"}),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = user_count;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Total Users"], null))),com.fulcrologic.fulcro.components.force_children(ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = admin_count;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Admins"], null)))]),ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"Registered Users"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core.seq(users))?ouroboros.frontend.ui.pages.users.user_table(users):ouroboros.frontend.ui.components.empty_state(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"icon","icon",1679606541),"Users",new cljs.core.Keyword(null,"message","message",-406056002),"No users registered yet"], null)))], 0))], null),null);

}
}
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.users !== 'undefined') && (typeof ouroboros.frontend.ui.pages.users.UsersPage !== 'undefined')){
} else {
/**
 * @constructor
 */
ouroboros.frontend.ui.pages.users.UsersPage = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42227,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.users.UsersPage,new cljs.core.Keyword("ouroboros.frontend.ui.pages.users","UsersPage","ouroboros.frontend.ui.pages.users/UsersPage",1818802358),options__36450__auto___42227);

//# sourceMappingURL=ouroboros.frontend.ui.pages.users.js.map
