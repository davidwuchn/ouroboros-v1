goog.provide('ouroboros.frontend.ui.pages.mvp_builder');
/**
 * 
 */
ouroboros.frontend.ui.pages.mvp_builder.start_mvp_session = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.mvp-builder","start-mvp-session","ouroboros.frontend.ui.pages.mvp-builder/start-mvp-session",-2007312527,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.mvp-builder","start-mvp-session","ouroboros.frontend.ui.pages.mvp-builder/start-mvp-session",-2007312527,null),(function (fulcro_mutation_env_symbol){
var map__41594 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41594__$1 = cljs.core.__destructure_map(map__41594);
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41594__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"remote","remote",-1593576576),(function ouroboros$frontend$ui$pages$mvp_builder$remote(env){
return env;
}),new cljs.core.Keyword(null,"ok-action","ok-action",1253795573),(function ouroboros$frontend$ui$pages$mvp_builder$ok_action(p__41608){
var map__41633 = p__41608;
var map__41633__$1 = cljs.core.__destructure_map(map__41633);
var result = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41633__$1,new cljs.core.Keyword(null,"result","result",1415092211));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41633__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41640_41969 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41641_41970 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41641_41970);

try{var session_data_41972 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(result);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"mvp-session","mvp-session",-1807033908),new cljs.core.Keyword("session","data","session/data",2012299945)], null),session_data_41972);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41640_41969);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41646 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41647 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41647);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41646);
}})], null);
}));
/**
 * 
 */
ouroboros.frontend.ui.pages.mvp_builder.submit_mvp_section = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.mvp-builder","submit-mvp-section","ouroboros.frontend.ui.pages.mvp-builder/submit-mvp-section",-183766132,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.mvp-builder","submit-mvp-section","ouroboros.frontend.ui.pages.mvp-builder/submit-mvp-section",-183766132,null),(function (fulcro_mutation_env_symbol){
var map__41677 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41677__$1 = cljs.core.__destructure_map(map__41677);
var session_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41677__$1,new cljs.core.Keyword(null,"session-id","session-id",-1147060351));
var section_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41677__$1,new cljs.core.Keyword(null,"section-key","section-key",-932493555));
var response = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41677__$1,new cljs.core.Keyword(null,"response","response",-1068424192));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"remote","remote",-1593576576),(function ouroboros$frontend$ui$pages$mvp_builder$remote(env){
return env;
}),new cljs.core.Keyword(null,"ok-action","ok-action",1253795573),(function ouroboros$frontend$ui$pages$mvp_builder$ok_action(p__41691){
var map__41693 = p__41691;
var map__41693__$1 = cljs.core.__destructure_map(map__41693);
var result = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41693__$1,new cljs.core.Keyword(null,"result","result",1415092211));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41693__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41698_41977 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41699_41978 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41699_41978);

try{var next_prompt_41980 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(result);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"mvp-session","mvp-session",-1807033908),new cljs.core.Keyword("session","data","session/data",2012299945)], null),new cljs.core.Keyword(null,"session","session",1008279103).cljs$core$IFn$_invoke$arity$1(next_prompt_41980));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"mvp-session","mvp-session",-1807033908),new cljs.core.Keyword("ui","current-prompt","ui/current-prompt",998245290)], null),next_prompt_41980);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41698_41977);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41732 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41733 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41733);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41732);
}})], null);
}));
/**
 * 
 */
ouroboros.frontend.ui.pages.mvp_builder.complete_mvp_session = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.mvp-builder","complete-mvp-session","ouroboros.frontend.ui.pages.mvp-builder/complete-mvp-session",-1518473443,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.mvp-builder","complete-mvp-session","ouroboros.frontend.ui.pages.mvp-builder/complete-mvp-session",-1518473443,null),(function (fulcro_mutation_env_symbol){
var map__41752 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41752__$1 = cljs.core.__destructure_map(map__41752);
var session_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41752__$1,new cljs.core.Keyword(null,"session-id","session-id",-1147060351));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"remote","remote",-1593576576),(function ouroboros$frontend$ui$pages$mvp_builder$remote(env){
return env;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41753 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41754 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41754);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41753);
}})], null);
}));

var options__36450__auto___41986 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$mvp_builder$render_MVPSection(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__41787 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__41787__$1 = cljs.core.__destructure_map(map__41787);
var section_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41787__$1,new cljs.core.Keyword(null,"section-key","section-key",-932493555));
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41787__$1,new cljs.core.Keyword(null,"title","title",636505583));
var response = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41787__$1,new cljs.core.Keyword(null,"response","response",-1068424192));
var completed_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41787__$1,new cljs.core.Keyword(null,"completed?","completed?",946828354));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:39"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",-1983287057),["mvp-section ",(cljs.core.truth_(completed_QMARK_)?"completed":null)].join('')], null)], 0)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("h4",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = title;
var G__41817 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:41"], null),G__41817], 0));
} else {
return G__41817;
}
})()], null),null);
var G__41820 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:40"], null),G__41820], 0));
} else {
return G__41820;
}
})(),(cljs.core.truth_(completed_QMARK_)?com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["span",({"data-fulcro-source": "ouroboros.frontend.ui.pages.mvp-builder:43", "className": "completed-badge"}),"\u2713"]):null)], null),new cljs.core.Keyword(null,".section-header",".section-header",1606655368)),(cljs.core.truth_(response)?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = response;
var G__41821 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:45"], null),G__41821], 0));
} else {
return G__41821;
}
})()], null),new cljs.core.Keyword(null,".section-response",".section-response",652316517)):null)], null),null);
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.mvp_builder !== 'undefined') && (typeof ouroboros.frontend.ui.pages.mvp_builder.MVPSection !== 'undefined')){
} else {
/**
 * Individual MVP planning section display
 * @constructor
 */
ouroboros.frontend.ui.pages.mvp_builder.MVPSection = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___41986,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.mvp_builder.MVPSection,new cljs.core.Keyword("ouroboros.frontend.ui.pages.mvp-builder","MVPSection","ouroboros.frontend.ui.pages.mvp-builder/MVPSection",234609937),options__36450__auto___41986);
ouroboros.frontend.ui.pages.mvp_builder.ui_mvp_section = com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.mvp_builder.MVPSection,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keyfn","keyfn",780060332),new cljs.core.Keyword(null,"section-key","section-key",-932493555)], null));
ouroboros.frontend.ui.pages.mvp_builder.mvp_progress = (function ouroboros$frontend$ui$pages$mvp_builder$mvp_progress(p__41831){
var map__41832 = p__41831;
var map__41832__$1 = cljs.core.__destructure_map(map__41832);
var current = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41832__$1,new cljs.core.Keyword(null,"current","current",-1088038603));
var total = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41832__$1,new cljs.core.Keyword(null,"total","total",1916810418));
var percentage = (((total > (0)))?((100) * (current / total)):(0));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:57"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(percentage),"%"].join('')], null)], null)], 0))], null),new cljs.core.Keyword(null,".progress-fill",".progress-fill",1272680128));
var G__41839 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:56"], null),G__41839], 0));
} else {
return G__41839;
}
})()], null),new cljs.core.Keyword(null,".progress-bar",".progress-bar",-701697842));
var G__41840 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:55"], null),G__41840], 0));
} else {
return G__41840;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current),"/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(total)," sections"].join('');
var G__41841 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:58"], null),G__41841], 0));
} else {
return G__41841;
}
})()], null),new cljs.core.Keyword(null,".progress-text",".progress-text",-313300272))], null),new cljs.core.Keyword(null,".progress-container",".progress-container",-714249022));
});

var options__36450__auto___41997 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$mvp_builder$render_MVPInput(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__41850 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__41850__$1 = cljs.core.__destructure_map(map__41850);
var prompt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41850__$1,new cljs.core.Keyword(null,"prompt","prompt",-78109487));
var hint = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41850__$1,new cljs.core.Keyword(null,"hint","hint",439639918));
var on_submit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41850__$1,new cljs.core.Keyword(null,"on-submit","on-submit",1227871159));
var response = (function (){var or__5002__auto__ = com.fulcrologic.fulcro.components.get_state.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.Keyword(null,"response","response",-1068424192));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "";
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("h3",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = prompt;
var G__41852 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:70"], null),G__41852], 0));
} else {
return G__41852;
}
})()], null),new cljs.core.Keyword(null,".prompt-text",".prompt-text",-1996650917));
var G__41854 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:69"], null),G__41854], 0));
} else {
return G__41854;
}
})(),(cljs.core.truth_(hint)?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ["\uD83D\uDCA1 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(hint)].join('');
var G__41857 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:72"], null),G__41857], 0));
} else {
return G__41857;
}
})()], null),new cljs.core.Keyword(null,".prompt-hint",".prompt-hint",-771328558)):null)], null),new cljs.core.Keyword(null,".prompt-section",".prompt-section",-1485723065));
var G__41858 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:68"], null),G__41858], 0));
} else {
return G__41858;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("textarea",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:74"], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"value","value",305978217),response,new cljs.core.Keyword(null,"onChange","onChange",-312891301),(function (p1__41846_SHARP_){
return com.fulcrologic.fulcro.components.set_state_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"response","response",-1068424192),p1__41846_SHARP_.target.value], null));
}),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Type your response here...",new cljs.core.Keyword(null,"rows","rows",850049680),(5)], null)], 0))], null),null);
var G__41861 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:73"], null),G__41861], 0));
} else {
return G__41861;
}
})()], null),new cljs.core.Keyword(null,".input-section",".input-section",712390079)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return (on_submit.cljs$core$IFn$_invoke$arity$1 ? on_submit.cljs$core$IFn$_invoke$arity$1(response) : on_submit.call(null, response));
}),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"primary","primary",817773892),new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core.empty_QMARK_(clojure.string.trim(response))], null),"Submit");
var G__41866 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:78"], null),G__41866], 0));
} else {
return G__41866;
}
})(),ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return (on_submit.cljs$core$IFn$_invoke$arity$1 ? on_submit.cljs$core$IFn$_invoke$arity$1("skip") : on_submit.call(null, "skip"));
}),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"secondary","secondary",-669381460)], null),"Skip")], null),new cljs.core.Keyword(null,".input-actions",".input-actions",-911981032))], null),new cljs.core.Keyword(null,".mvp-input",".mvp-input",1279085885));
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.mvp_builder !== 'undefined') && (typeof ouroboros.frontend.ui.pages.mvp_builder.MVPInput !== 'undefined')){
} else {
/**
 * Input form for current MVP planning section
 * @constructor
 */
ouroboros.frontend.ui.pages.mvp_builder.MVPInput = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___41997,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.mvp_builder.MVPInput,new cljs.core.Keyword("ouroboros.frontend.ui.pages.mvp-builder","MVPInput","ouroboros.frontend.ui.pages.mvp-builder/MVPInput",-1590165747),options__36450__auto___41997);

var options__36450__auto___42006 = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$mvp_builder$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"project-id","project-id",206449307),new cljs.core.Keyword(null,"project-name","project-name",1486861539),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("session","ui","session/ui",1777473981),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("ui","current-section","ui/current-section",1519903024),new cljs.core.Keyword("ui","total-sections","ui/total-sections",-1281242296),new cljs.core.Keyword("ui","prompt","ui/prompt",-78105499),new cljs.core.Keyword("ui","hint","ui/hint",439644130),new cljs.core.Keyword("ui","completed-sections","ui/completed-sections",-877808902),new cljs.core.Keyword("ui","complete?","ui/complete?",-892987611)], null)], null),new cljs.core.Keyword("session","data","session/data",2012299945),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"mvp-builder","mvp-builder",-194444362)], null)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$mvp_builder$ident_STAR_(this$,p__41890){
var map__41892 = p__41890;
var map__41892__$1 = cljs.core.__destructure_map(map__41892);
var props = map__41892__$1;
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41892__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
var project_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41892__$1,new cljs.core.Keyword(null,"project-name","project-name",1486861539));
var ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41892__$1,new cljs.core.Keyword("session","ui","session/ui",1777473981));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"mvp-builder","mvp-builder",-194444362)], null);
}),new cljs.core.Keyword(null,"route-segment","route-segment",1812935886),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["project",new cljs.core.Keyword(null,"project-id","project-id",206449307),"mvp"], null),new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),(function ouroboros$frontend$ui$pages$mvp_builder$build_raw_initial_state_STAR_(_){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("session","ui","session/ui",1777473981),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword("ui","current-section","ui/current-section",1519903024),(0),new cljs.core.Keyword("ui","total-sections","ui/total-sections",-1281242296),(8),new cljs.core.Keyword("ui","prompt","ui/prompt",-78105499),"What is the smallest version of your product?",new cljs.core.Keyword("ui","hint","ui/hint",439644130),"Focus on the core functionality that delivers value",new cljs.core.Keyword("ui","completed-sections","ui/completed-sections",-877808902),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword("ui","complete?","ui/complete?",-892987611),false], null)], null);
}),new cljs.core.Keyword(null,"will-enter","will-enter",-692415624),(function (app,p__41895){
var map__41897 = p__41895;
var map__41897__$1 = cljs.core.__destructure_map(map__41897);
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41897__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
return com.fulcrologic.fulcro.routing.dynamic_routing.route_deferred(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"mvp-builder","mvp-builder",-194444362)], null),(function (){
return com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"mvp-builder","mvp-builder",-194444362)], null),ouroboros.frontend.ui.pages.mvp_builder.MVPBuilderPage,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"marker","marker",865118313),new cljs.core.Keyword(null,"mvp-builder","mvp-builder",-194444362),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"project-id","project-id",206449307),project_id], null),new cljs.core.Keyword(null,"post-mutation","post-mutation",-1076606705),new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","target-ready","com.fulcrologic.fulcro.routing.dynamic-routing/target-ready",-111862826,null),new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"mvp-builder","mvp-builder",-194444362)], null)], null)], null));
}));
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$mvp_builder$render_MVPBuilderPage(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__41904 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__41904__$1 = cljs.core.__destructure_map(map__41904);
var props = map__41904__$1;
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41904__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
var project_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41904__$1,new cljs.core.Keyword(null,"project-name","project-name",1486861539));
var ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41904__$1,new cljs.core.Keyword("session","ui","session/ui",1777473981));
var loading_QMARK_ = com.fulcrologic.fulcro.data_fetch.loading_QMARK_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"mvp-builder","mvp-builder",-194444362)], null)));
var map__41905 = (function (){var or__5002__auto__ = ui;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
var map__41905__$1 = cljs.core.__destructure_map(map__41905);
var current_section = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41905__$1,new cljs.core.Keyword("ui","current-section","ui/current-section",1519903024));
var total_sections = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41905__$1,new cljs.core.Keyword("ui","total-sections","ui/total-sections",-1281242296));
var prompt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41905__$1,new cljs.core.Keyword("ui","prompt","ui/prompt",-78105499));
var hint = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41905__$1,new cljs.core.Keyword("ui","hint","ui/hint",439644130));
var completed_sections = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41905__$1,new cljs.core.Keyword("ui","completed-sections","ui/completed-sections",-877808902));
var complete_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41905__$1,new cljs.core.Keyword("ui","complete?","ui/complete?",-892987611));
var session_data = (function (){var or__5002__auto__ = new cljs.core.Keyword("session","data","session/data",2012299945).cljs$core$IFn$_invoke$arity$1(props);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
if(loading_QMARK_){
return com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.pages.mvp-builder:124", "className": "loading"}),"Loading MVP planner..."]);
} else {
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h1",({"data-fulcro-source": "ouroboros.frontend.ui.pages.mvp-builder:128"}),"\uD83D\uDE80 MVP Planning Builder"]);
var G__41920 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:127"], null),G__41920], 0));
} else {
return G__41920;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("p",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ["Project: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(project_name)].join('');
var G__41925 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:129"], null),G__41925], 0));
} else {
return G__41925;
}
})()], null),new cljs.core.Keyword(null,".builder-subtitle",".builder-subtitle",-578112461))], null),new cljs.core.Keyword(null,".builder-header",".builder-header",275446169));
var G__41927 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:125"], null),G__41927], 0));
} else {
return G__41927;
}
})(),ouroboros.frontend.ui.pages.mvp_builder.mvp_progress(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"current","current",-1088038603),cljs.core.count(completed_sections),new cljs.core.Keyword(null,"total","total",1916810418),total_sections], null)),(cljs.core.truth_(complete_QMARK_)?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.pages.mvp-builder:137", "className": "completion-icon"}),"\uD83C\uDF89"]);
var G__41929 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:136"], null),G__41929], 0));
} else {
return G__41929;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h2",({"data-fulcro-source": "ouroboros.frontend.ui.pages.mvp-builder:138"}),"MVP Plan Complete!"]),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["p",({"data-fulcro-source": "ouroboros.frontend.ui.pages.mvp-builder:139"}),"You now have a clear MVP plan. Ready for the next step?"]),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["project",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"project-id","project-id",206449307),project_id], null)], null));
}),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"secondary","secondary",-669381460)], null),"Back to Project");
var G__41936 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:140"], null),G__41936], 0));
} else {
return G__41936;
}
})(),ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["project",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"project-id","project-id",206449307),project_id], null),"canvas"], null));
}),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"primary","primary",817773892)], null),"Continue to Lean Canvas \u2192")], null),new cljs.core.Keyword(null,".completion-actions",".completion-actions",-154906479))], null),new cljs.core.Keyword(null,".completion-state",".completion-state",59901358)):com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (cljs.core.truth_(prompt)?ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),["Section ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.count(completed_sections) + (1))),"/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(total_sections)].join('')], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var G__41941 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"prompt","prompt",-78109487),prompt,new cljs.core.Keyword(null,"hint","hint",439639918),hint,new cljs.core.Keyword(null,"on-submit","on-submit",1227871159),(function (response){
return com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__41943 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"session-id","session-id",-1147060351),new cljs.core.Keyword("session","id","session/id",604977054).cljs$core$IFn$_invoke$arity$1(session_data),new cljs.core.Keyword(null,"section-key","section-key",-932493555),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(["section-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(current_section)].join('')),new cljs.core.Keyword(null,"response","response",-1068424192),response], null);
return (ouroboros.frontend.ui.pages.mvp_builder.submit_mvp_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.pages.mvp_builder.submit_mvp_section.cljs$core$IFn$_invoke$arity$1(G__41943) : ouroboros.frontend.ui.pages.mvp_builder.submit_mvp_section.call(null, G__41943));
})()], null));
})], null);
return (ouroboros.frontend.ui.pages.mvp_builder.mvp_input.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.pages.mvp_builder.mvp_input.cljs$core$IFn$_invoke$arity$1(G__41941) : ouroboros.frontend.ui.pages.mvp_builder.mvp_input.call(null, G__41941));
})()], 0)):null);
var G__41954 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:151"], null),G__41954], 0));
} else {
return G__41954;
}
})(),((cljs.core.seq(completed_sections))?ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),"Completed Sections"], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__41882_SHARP_){
return (ouroboros.frontend.ui.pages.mvp_builder.ui_mvp_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.pages.mvp_builder.ui_mvp_section.cljs$core$IFn$_invoke$arity$1(p1__41882_SHARP_) : ouroboros.frontend.ui.pages.mvp_builder.ui_mvp_section.call(null, p1__41882_SHARP_));
}),completed_sections);
var G__41961 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.mvp-builder:167"], null),G__41961], 0));
} else {
return G__41961;
}
})()], null),new cljs.core.Keyword(null,".completed-sections",".completed-sections",-941116985))], 0)):null)], null),new cljs.core.Keyword(null,".builder-content",".builder-content",876497535)))], null),new cljs.core.Keyword(null,".mvp-builder-page",".mvp-builder-page",1576861411));
}
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.mvp_builder !== 'undefined') && (typeof ouroboros.frontend.ui.pages.mvp_builder.MVPBuilderPage !== 'undefined')){
} else {
/**
 * MVP Planning builder page
 * @constructor
 */
ouroboros.frontend.ui.pages.mvp_builder.MVPBuilderPage = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42006,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.mvp_builder.MVPBuilderPage,new cljs.core.Keyword("ouroboros.frontend.ui.pages.mvp-builder","MVPBuilderPage","ouroboros.frontend.ui.pages.mvp-builder/MVPBuilderPage",2085415253),options__36450__auto___42006);

//# sourceMappingURL=ouroboros.frontend.ui.pages.mvp_builder.js.map
