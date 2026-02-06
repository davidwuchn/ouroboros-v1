goog.provide('ouroboros.frontend.ui.pages.sessions');
/**
 * 
 */
ouroboros.frontend.ui.pages.sessions.handle_load_error = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.sessions","handle-load-error","ouroboros.frontend.ui.pages.sessions/handle-load-error",-859249375,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.sessions","handle-load-error","ouroboros.frontend.ui.pages.sessions/handle-load-error",-859249375,null),(function (fulcro_mutation_env_symbol){
var map__42156 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__42156__$1 = cljs.core.__destructure_map(map__42156);
var page_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42156__$1,new cljs.core.Keyword(null,"page-id","page-id",-872941168));
var error_message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42156__$1,new cljs.core.Keyword(null,"error-message","error-message",1756021561));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$sessions$action(p__42157){
var map__42158 = p__42157;
var map__42158__$1 = cljs.core.__destructure_map(map__42158);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42158__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__42159_42180 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__42160_42181 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__42160_42181);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","error","page/error",-985089113),page_id], null),error_message);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__42159_42180);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__42161 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__42162 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__42162);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__42161);
}})], null);
}));
/**
 * 
 */
ouroboros.frontend.ui.pages.sessions.clear_page_error = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.sessions","clear-page-error","ouroboros.frontend.ui.pages.sessions/clear-page-error",-1981327820,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.sessions","clear-page-error","ouroboros.frontend.ui.pages.sessions/clear-page-error",-1981327820,null),(function (fulcro_mutation_env_symbol){
var map__42163 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__42163__$1 = cljs.core.__destructure_map(map__42163);
var page_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42163__$1,new cljs.core.Keyword(null,"page-id","page-id",-872941168));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$sessions$action(p__42164){
var map__42165 = p__42164;
var map__42165__$1 = cljs.core.__destructure_map(map__42165);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42165__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__42166_42182 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__42167_42183 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__42167_42183);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update,new cljs.core.Keyword("page","error","page/error",-985089113),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([page_id], 0));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__42166_42182);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__42168 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__42169 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__42169);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__42168);
}})], null);
}));
ouroboros.frontend.ui.pages.sessions.sessions_loading = (function ouroboros$frontend$ui$pages$sessions$sessions_loading(){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h1",({"data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:29"}),"Chat Sessions"]);
var G__42170 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.sessions:28"], null),G__42170], 0));
} else {
return G__42170;
}
})(),ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"Active Sessions"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-table", "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:32"}),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-row", "style": ({"display": "flex", "gap": "1rem", "padding": "0.75rem 0", "borderBottom": "2px solid var(--color-border)", "marginBottom": "0.5rem"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:34"}),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "200px", "fontWeight": "bold"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:40"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "100px", "fontWeight": "bold"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:41"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "80px", "fontWeight": "bold"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:42"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "150px", "fontWeight": "bold"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:43"})]))])),com.fulcrologic.fulcro.components.force_children(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((3),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-row", "style": ({"display": "flex", "gap": "1rem", "padding": "0.75rem 0", "borderBottom": "1px solid var(--color-border)"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:46"}),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "200px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:51"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "100px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:52"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "80px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:53"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "150px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:54"})]))])))])], 0)),ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"Chat Adapters"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "flex flex-col gap-2", "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:57"}),com.fulcrologic.fulcro.components.force_children(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((3),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "flex items-center gap-2", "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:59"}),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "12px", "height": "12px", "borderRadius": "50%"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:60"})])),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "skeleton-text", "style": ({"width": "120px"}), "data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:61"})]))])))])], 0))], null),null);
});

var options__36450__auto___42184 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$sessions$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chat","id","chat/id",-1385609508),new cljs.core.Keyword("chat","message-count","chat/message-count",-1272214541),new cljs.core.Keyword("chat","created-at","chat/created-at",-92502172),new cljs.core.Keyword("chat","platform","chat/platform",-854565130),new cljs.core.Keyword("chat","running?","chat/running?",-260920835)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$sessions$ident_STAR_(_,props){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chat","id","chat/id",-1385609508),new cljs.core.Keyword("chat","id","chat/id",-1385609508).cljs$core$IFn$_invoke$arity$1(props)], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$sessions$render_ChatSession(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__42171 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__42171__$1 = cljs.core.__destructure_map(map__42171);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42171__$1,new cljs.core.Keyword("chat","id","chat/id",-1385609508));
var message_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42171__$1,new cljs.core.Keyword("chat","message-count","chat/message-count",-1272214541));
var created_at = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42171__$1,new cljs.core.Keyword("chat","created-at","chat/created-at",-92502172));
var platform = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42171__$1,new cljs.core.Keyword("chat","platform","chat/platform",-854565130));
var running_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42171__$1,new cljs.core.Keyword("chat","running?","chat/running?",-260920835));
return com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:73"})]);
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.sessions !== 'undefined') && (typeof ouroboros.frontend.ui.pages.sessions.ChatSession !== 'undefined')){
} else {
/**
 * @constructor
 */
ouroboros.frontend.ui.pages.sessions.ChatSession = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42184,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.sessions.ChatSession,new cljs.core.Keyword("ouroboros.frontend.ui.pages.sessions","ChatSession","ouroboros.frontend.ui.pages.sessions/ChatSession",-205290986),options__36450__auto___42184);

var options__36450__auto___42185 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$sessions$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("adapter","platform","adapter/platform",64122607),new cljs.core.Keyword("adapter","running?","adapter/running?",1039964792)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$sessions$ident_STAR_(this$,p__42172){
var map__42173 = p__42172;
var map__42173__$1 = cljs.core.__destructure_map(map__42173);
var platform = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42173__$1,new cljs.core.Keyword("adapter","platform","adapter/platform",64122607));
var running_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42173__$1,new cljs.core.Keyword("adapter","running?","adapter/running?",1039964792));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("adapter","platform","adapter/platform",64122607),new cljs.core.Keyword("adapter","platform","adapter/platform",64122607).cljs$core$IFn$_invoke$arity$1(this$)], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$sessions$render_ChatAdapter(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__42174 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__42174__$1 = cljs.core.__destructure_map(map__42174);
var platform = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42174__$1,new cljs.core.Keyword("adapter","platform","adapter/platform",64122607));
var running_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42174__$1,new cljs.core.Keyword("adapter","running?","adapter/running?",1039964792));
return com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:79"})]);
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.sessions !== 'undefined') && (typeof ouroboros.frontend.ui.pages.sessions.ChatAdapter !== 'undefined')){
} else {
/**
 * @constructor
 */
ouroboros.frontend.ui.pages.sessions.ChatAdapter = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42185,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.sessions.ChatAdapter,new cljs.core.Keyword("ouroboros.frontend.ui.pages.sessions","ChatAdapter","ouroboros.frontend.ui.pages.sessions/ChatAdapter",625585287),options__36450__auto___42185);
/**
 * Table of chat sessions
 */
ouroboros.frontend.ui.pages.sessions.session_table = (function ouroboros$frontend$ui$pages$sessions$session_table(sessions){
var columns = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"label","label",1718410804),"Session ID"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"platform","platform",-1086422114),new cljs.core.Keyword(null,"label","label",1718410804),"Platform"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"message-count","message-count",-1268963013),new cljs.core.Keyword(null,"label","label",1718410804),"Messages"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"created-at","created-at",-89248644),new cljs.core.Keyword(null,"label","label",1718410804),"Created"], null)], null);
var rows = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (s){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword("chat","id","chat/id",-1385609508).cljs$core$IFn$_invoke$arity$1(s),new cljs.core.Keyword(null,"platform","platform",-1086422114),cljs.core.name((function (){var or__5002__auto__ = new cljs.core.Keyword("chat","platform","chat/platform",-854565130).cljs$core$IFn$_invoke$arity$1(s);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.Keyword(null,"unknown","unknown",-935977881);
}
})()),new cljs.core.Keyword(null,"message-count","message-count",-1268963013),new cljs.core.Keyword("chat","message-count","chat/message-count",-1272214541).cljs$core$IFn$_invoke$arity$1(s),new cljs.core.Keyword(null,"created-at","created-at",-89248644),new cljs.core.Keyword("chat","created-at","chat/created-at",-92502172).cljs$core$IFn$_invoke$arity$1(s)], null);
}),sessions);
return ouroboros.frontend.ui.components.data_table(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"columns","columns",1998437288),columns,new cljs.core.Keyword(null,"rows","rows",850049680),rows,new cljs.core.Keyword(null,"empty-message","empty-message",-1625491415),"No active chat sessions"], null));
});
/**
 * List of chat adapters
 */
ouroboros.frontend.ui.pages.sessions.adapter_list = (function ouroboros$frontend$ui$pages$sessions$adapter_list(adapters){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (adapter){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.sessions:112"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("adapter","platform","adapter/platform",64122607).cljs$core$IFn$_invoke$arity$1(adapter)),new cljs.core.Keyword(null,"className","className",-1983287057),"flex items-center gap-2 mb-2"], null)], 0)),ouroboros.frontend.ui.components.status_badge(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ok?","ok?",447310304),new cljs.core.Keyword("adapter","running?","adapter/running?",1039964792).cljs$core$IFn$_invoke$arity$1(adapter),new cljs.core.Keyword(null,"text","text",-1790561697),[cljs.core.name(new cljs.core.Keyword("adapter","platform","adapter/platform",64122607).cljs$core$IFn$_invoke$arity$1(adapter))," ",(cljs.core.truth_(new cljs.core.Keyword("adapter","running?","adapter/running?",1039964792).cljs$core$IFn$_invoke$arity$1(adapter))?"Running":"Stopped")].join('')], null))], null),null);
}),adapters);
var G__42175 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.sessions:110"], null),G__42175], 0));
} else {
return G__42175;
}
})()], null),null);
});

var options__36450__auto___42188 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$sessions$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("chat","sessions","chat/sessions",-696083840),com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.sessions.ChatSession)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("chat","adapters","chat/adapters",-1584239691),com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.sessions.ChatAdapter)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"sessions","sessions",-699316392)], null),new cljs.core.Keyword("page","error","page/error",-985089113)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$sessions$ident_STAR_(this$,p__42176){
var map__42177 = p__42176;
var map__42177__$1 = cljs.core.__destructure_map(map__42177);
var props = map__42177__$1;
var sessions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42177__$1,new cljs.core.Keyword("chat","sessions","chat/sessions",-696083840));
var adapters = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42177__$1,new cljs.core.Keyword("chat","adapters","chat/adapters",-1584239691));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42177__$1,new cljs.core.Keyword("page","error","page/error",-985089113));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"sessions","sessions",-699316392)], null);
}),new cljs.core.Keyword(null,"route-segment","route-segment",1812935886),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["sessions"], null),new cljs.core.Keyword(null,"will-enter","will-enter",-692415624),(function (app,route_params){
return com.fulcrologic.fulcro.routing.dynamic_routing.route_deferred(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"sessions","sessions",-699316392)], null),(function (){
return com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"sessions","sessions",-699316392)], null),ouroboros.frontend.ui.pages.sessions.SessionsPage,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"marker","marker",865118313),new cljs.core.Keyword(null,"sessions","sessions",-699316392),new cljs.core.Keyword(null,"post-mutation","post-mutation",-1076606705),new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","target-ready","com.fulcrologic.fulcro.routing.dynamic-routing/target-ready",-111862826,null),new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"sessions","sessions",-699316392)], null)], null),new cljs.core.Keyword(null,"fallback","fallback",761637929),new cljs.core.Symbol("ouroboros.frontend.ui.pages.sessions","handle-load-error","ouroboros.frontend.ui.pages.sessions/handle-load-error",-859249375,null),new cljs.core.Keyword(null,"fallback-params","fallback-params",-2048144971),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"page-id","page-id",-872941168),new cljs.core.Keyword(null,"sessions","sessions",-699316392),new cljs.core.Keyword(null,"error-message","error-message",1756021561),"Failed to load sessions data"], null)], null));
}));
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$sessions$render_SessionsPage(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__42178 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__42178__$1 = cljs.core.__destructure_map(map__42178);
var props = map__42178__$1;
var sessions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42178__$1,new cljs.core.Keyword("chat","sessions","chat/sessions",-696083840));
var adapters = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42178__$1,new cljs.core.Keyword("chat","adapters","chat/adapters",-1584239691));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42178__$1,new cljs.core.Keyword("page","error","page/error",-985089113));
var loading_QMARK_ = com.fulcrologic.fulcro.data_fetch.loading_QMARK_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"sessions","sessions",-699316392)], null)));
var error_msg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","error","page/error",-985089113),new cljs.core.Keyword(null,"sessions","sessions",-699316392)], null));
if(cljs.core.truth_(error_msg)){
var retry_handler = (function (){
com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Symbol("ouroboros.frontend.ui.pages.sessions","clear-page-error","ouroboros.frontend.ui.pages.sessions/clear-page-error",-1981327820,null),null,(1),null)),(new cljs.core.List(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Keyword(null,"page-id","page-id",-872941168),null,(1),null)),(new cljs.core.List(null,new cljs.core.Keyword(null,"sessions","sessions",-699316392),null,(1),null)))))),null,(1),null))))),null,(1),null)))))));

return com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(this$,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"sessions","sessions",-699316392)], null),ouroboros.frontend.ui.pages.sessions.SessionsPage,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"marker","marker",865118313),new cljs.core.Keyword(null,"sessions","sessions",-699316392),new cljs.core.Keyword(null,"fallback","fallback",761637929),new cljs.core.Symbol("ouroboros.frontend.ui.pages.sessions","handle-load-error","ouroboros.frontend.ui.pages.sessions/handle-load-error",-859249375,null),new cljs.core.Keyword(null,"fallback-params","fallback-params",-2048144971),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"page-id","page-id",-872941168),new cljs.core.Keyword(null,"sessions","sessions",-699316392),new cljs.core.Keyword(null,"error-message","error-message",1756021561),"Failed to load sessions data"], null)], null));
});
return ouroboros.frontend.ui.components.error_state(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"message","message",-406056002),error_msg,new cljs.core.Keyword(null,"on-retry","on-retry",-610804293),retry_handler], null));
} else {
if(loading_QMARK_){
return ouroboros.frontend.ui.pages.sessions.sessions_loading();
} else {
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h1",({"data-fulcro-source": "ouroboros.frontend.ui.pages.sessions:166"}),"Chat Sessions"]);
var G__42179 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.sessions:165"], null),G__42179], 0));
} else {
return G__42179;
}
})(),ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),["Active Sessions (",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(sessions)),")"].join('')], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core.seq(sessions))?ouroboros.frontend.ui.pages.sessions.session_table(sessions):ouroboros.frontend.ui.components.empty_state(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"icon","icon",1679606541),"Chat",new cljs.core.Keyword(null,"message","message",-406056002),"No active chat sessions"], null)))], 0)),((cljs.core.seq(adapters))?ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"Chat Adapters"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([ouroboros.frontend.ui.pages.sessions.adapter_list(adapters)], 0)):null)], null),null);

}
}
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.sessions !== 'undefined') && (typeof ouroboros.frontend.ui.pages.sessions.SessionsPage !== 'undefined')){
} else {
/**
 * @constructor
 */
ouroboros.frontend.ui.pages.sessions.SessionsPage = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42188,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.sessions.SessionsPage,new cljs.core.Keyword("ouroboros.frontend.ui.pages.sessions","SessionsPage","ouroboros.frontend.ui.pages.sessions/SessionsPage",2017588116),options__36450__auto___42188);

//# sourceMappingURL=ouroboros.frontend.ui.pages.sessions.js.map
