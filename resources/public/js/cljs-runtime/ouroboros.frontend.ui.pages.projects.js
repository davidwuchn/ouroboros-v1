goog.provide('ouroboros.frontend.ui.pages.projects');
/**
 * 
 */
ouroboros.frontend.ui.pages.projects.create_project = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.projects","create-project","ouroboros.frontend.ui.pages.projects/create-project",-1091343436,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.projects","create-project","ouroboros.frontend.ui.pages.projects/create-project",-1091343436,null),(function (fulcro_mutation_env_symbol){
var map__41588 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41588__$1 = cljs.core.__destructure_map(map__41588);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41588__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41588__$1,new cljs.core.Keyword(null,"description","description",-1428560544));
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"remote","remote",-1593576576),(function ouroboros$frontend$ui$pages$projects$remote(env){
return com.fulcrologic.fulcro.mutations.with_target(com.fulcrologic.fulcro.mutations.returning.cljs$core$IFn$_invoke$arity$2(env,ouroboros.frontend.ui.pages.projects.ProjectCard),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("user","projects","user/projects",-352747490)], null));
}),new cljs.core.Keyword(null,"error-action","error-action",-1147840498),(function ouroboros$frontend$ui$pages$projects$error_action(p__41596){
var map__41597 = p__41596;
var map__41597__$1 = cljs.core.__destructure_map(map__41597);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41597__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41599_41939 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41600_41940 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41600_41940);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("component","id","component/id",298306903),new cljs.core.Keyword(null,"project-form","project-form",815351848),new cljs.core.Keyword("ui","creating?","ui/creating?",1447236210)], null),false);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("component","id","component/id",298306903),new cljs.core.Keyword(null,"project-form","project-form",815351848),new cljs.core.Keyword("ui","error","ui/error",-978964660)], null),"Failed to create project");
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41599_41939);
}
return null;
}),new cljs.core.Keyword(null,"ok-action","ok-action",1253795573),(function ouroboros$frontend$ui$pages$projects$ok_action(p__41606){
var map__41607 = p__41606;
var map__41607__$1 = cljs.core.__destructure_map(map__41607);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41607__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var app = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41607__$1,new cljs.core.Keyword(null,"app","app",-560961707));
var _STAR_after_render_STAR__orig_val__41611_41944 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41612_41945 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41612_41945);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("component","id","component/id",298306903),new cljs.core.Keyword(null,"project-form","project-form",815351848),new cljs.core.Keyword("ui","creating?","ui/creating?",1447236210)], null),false);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("component","id","component/id",298306903),new cljs.core.Keyword(null,"project-form","project-form",815351848),new cljs.core.Keyword("ui","new-project-name","ui/new-project-name",-397407670)], null),"");

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("component","id","component/id",298306903),new cljs.core.Keyword(null,"project-form","project-form",815351848),new cljs.core.Keyword("ui","new-project-description","ui/new-project-description",2066075708)], null),"");

com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$3(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("component","id","component/id",298306903),new cljs.core.Keyword(null,"projects-page","projects-page",-2096744574)], null),ouroboros.frontend.ui.pages.projects.ProjectsPage);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41611_41944);
}
return null;
}),new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$projects$action(p__41616){
var map__41617 = p__41616;
var map__41617__$1 = cljs.core.__destructure_map(map__41617);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41617__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41620_41950 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41621_41951 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41621_41951);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("component","id","component/id",298306903),new cljs.core.Keyword(null,"project-form","project-form",815351848),new cljs.core.Keyword("ui","creating?","ui/creating?",1447236210)], null),true);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41620_41950);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41624 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41625 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41625);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41624);
}})], null);
}));
/**
 * 
 */
ouroboros.frontend.ui.pages.projects.delete_project = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.projects","delete-project","ouroboros.frontend.ui.pages.projects/delete-project",-1302044564,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.projects","delete-project","ouroboros.frontend.ui.pages.projects/delete-project",-1302044564,null),(function (fulcro_mutation_env_symbol){
var map__41639 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41639__$1 = cljs.core.__destructure_map(map__41639);
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41639__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"remote","remote",-1593576576),(function ouroboros$frontend$ui$pages$projects$remote(env){
return env;
}),new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$projects$action(p__41649){
var map__41654 = p__41649;
var map__41654__$1 = cljs.core.__destructure_map(map__41654);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41654__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41666_41966 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41667_41967 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41667_41967);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("user","projects","user/projects",-352747490)], null),(function (projects){
return cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__41631_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("project","id","project/id",-791740645).cljs$core$IFn$_invoke$arity$1(p1__41631_SHARP_),project_id);
}),projects));
}));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41666_41966);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41675 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41676 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41676);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41675);
}})], null);
}));

var options__36450__auto___41985 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$projects$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("project","id","project/id",-791740645),new cljs.core.Keyword("project","name","project/name",2022968152),new cljs.core.Keyword("project","description","project/description",-649490311),new cljs.core.Keyword("project","status","project/status",-1761879874),new cljs.core.Keyword("project","created-at","project/created-at",-400670813)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$projects$ident_STAR_(_,props){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("project","id","project/id",-791740645),new cljs.core.Keyword("project","id","project/id",-791740645).cljs$core$IFn$_invoke$arity$1(props)], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$projects$render_ProjectCard(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__41704 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__41704__$1 = cljs.core.__destructure_map(map__41704);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41704__$1,new cljs.core.Keyword("project","id","project/id",-791740645));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41704__$1,new cljs.core.Keyword("project","name","project/name",2022968152));
var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41704__$1,new cljs.core.Keyword("project","description","project/description",-649490311));
var status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41704__$1,new cljs.core.Keyword("project","status","project/status",-1761879874));
var created_at = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41704__$1,new cljs.core.Keyword("project","created-at","project/created-at",-400670813));
return ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"title","title",636505583),name,new cljs.core.Keyword(null,"className","className",-1983287057),(function (){var G__41710 = status;
var G__41710__$1 = (((G__41710 instanceof cljs.core.Keyword))?G__41710.fqn:null);
switch (G__41710__$1) {
case "draft":
return "project-draft";

break;
case "active":
return "project-active";

break;
case "completed":
return "project-completed";

break;
default:
return "";

}
})(),new cljs.core.Keyword(null,"actions","actions",-812656882),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["project",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"project-id","project-id",206449307),id], null)], null));
}),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"primary","primary",817773892)], null),"Open");
var G__41715 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:53"], null),G__41715], 0));
} else {
return G__41715;
}
})(),ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__41718 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"project-id","project-id",206449307),id], null);
return (ouroboros.frontend.ui.pages.projects.delete_project.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.pages.projects.delete_project.cljs$core$IFn$_invoke$arity$1(G__41718) : ouroboros.frontend.ui.pages.projects.delete_project.call(null, G__41718));
})()], null));
}),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"danger","danger",-624338030)], null),"Delete")], null),new cljs.core.Keyword(null,".card-actions",".card-actions",-1000790231))], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var or__5002__auto__ = description;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "No description";
}
})();
var G__41720 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:62"], null),G__41720], 0));
} else {
return G__41720;
}
})()], null),new cljs.core.Keyword(null,".project-description",".project-description",66056513)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = cljs.core.str.cljs$core$IFn$_invoke$arity$1((name.cljs$core$IFn$_invoke$arity$1 ? name.cljs$core$IFn$_invoke$arity$1(status) : name.call(null, status)));
var G__41723 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:64"], null),G__41723], 0));
} else {
return G__41723;
}
})()], null),new cljs.core.Keyword(null,".project-status",".project-status",-899046039));
var G__41728 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:63"], null),G__41728], 0));
} else {
return G__41728;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = created_at;
var G__41739 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:65"], null),G__41739], 0));
} else {
return G__41739;
}
})()], null),new cljs.core.Keyword(null,".project-date",".project-date",1204050945))], null),new cljs.core.Keyword(null,".project-meta",".project-meta",-1697893294))], 0));
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.projects !== 'undefined') && (typeof ouroboros.frontend.ui.pages.projects.ProjectCard !== 'undefined')){
} else {
/**
 * Individual project card
 * @constructor
 */
ouroboros.frontend.ui.pages.projects.ProjectCard = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___41985,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.projects.ProjectCard,new cljs.core.Keyword("ouroboros.frontend.ui.pages.projects","ProjectCard","ouroboros.frontend.ui.pages.projects/ProjectCard",88857721),options__36450__auto___41985);
ouroboros.frontend.ui.pages.projects.ui_project_card = com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.projects.ProjectCard,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keyfn","keyfn",780060332),new cljs.core.Keyword("project","id","project/id",-791740645)], null));

var options__36450__auto___42002 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$projects$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("ui","new-project-name","ui/new-project-name",-397407670),new cljs.core.Keyword("ui","new-project-description","ui/new-project-description",2066075708),new cljs.core.Keyword("ui","creating?","ui/creating?",1447236210),new cljs.core.Keyword("ui","error","ui/error",-978964660)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$projects$ident_STAR_(this$,p__41768){
var map__41769 = p__41768;
var map__41769__$1 = cljs.core.__destructure_map(map__41769);
var new_project_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41769__$1,new cljs.core.Keyword("ui","new-project-name","ui/new-project-name",-397407670));
var new_project_description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41769__$1,new cljs.core.Keyword("ui","new-project-description","ui/new-project-description",2066075708));
var creating_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41769__$1,new cljs.core.Keyword("ui","creating?","ui/creating?",1447236210));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41769__$1,new cljs.core.Keyword("ui","error","ui/error",-978964660));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("component","id","component/id",298306903),new cljs.core.Keyword(null,"project-form","project-form",815351848)], null);
}),new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),(function ouroboros$frontend$ui$pages$projects$build_raw_initial_state_STAR_(_){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("ui","new-project-name","ui/new-project-name",-397407670),"",new cljs.core.Keyword("ui","new-project-description","ui/new-project-description",2066075708),"",new cljs.core.Keyword("ui","creating?","ui/creating?",1447236210),false,new cljs.core.Keyword("ui","error","ui/error",-978964660),null], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$projects$render_ProjectForm(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__41776 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__41776__$1 = cljs.core.__destructure_map(map__41776);
var new_project_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41776__$1,new cljs.core.Keyword("ui","new-project-name","ui/new-project-name",-397407670));
var new_project_description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41776__$1,new cljs.core.Keyword("ui","new-project-description","ui/new-project-description",2066075708));
var creating_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41776__$1,new cljs.core.Keyword("ui","creating?","ui/creating?",1447236210));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41776__$1,new cljs.core.Keyword("ui","error","ui/error",-978964660));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h3",({"data-fulcro-source": "ouroboros.frontend.ui.pages.projects:79"}),"Create New Project"]);
var G__41784 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:78"], null),G__41784], 0));
} else {
return G__41784;
}
})(),(cljs.core.truth_(error)?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = error;
var G__41788 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:81"], null),G__41788], 0));
} else {
return G__41788;
}
})()], null),new cljs.core.Keyword(null,".error-message",".error-message",791692599)):null),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["label",({"data-fulcro-source": "ouroboros.frontend.ui.pages.projects:83"}),"Project Name"]);
var G__41794 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:82"], null),G__41794], 0));
} else {
return G__41794;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("input",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:84"], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = new_project_name;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "";
}
})(),new cljs.core.Keyword(null,"onChange","onChange",-312891301),(function (p1__41755_SHARP_){
return com.fulcrologic.fulcro.mutations.set_string_BANG_.cljs$core$IFn$_invoke$arity$variadic(this$,new cljs.core.Keyword("ui","new-project-name","ui/new-project-name",-397407670),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"event","event",301435442),p1__41755_SHARP_], 0));
}),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Enter project name"], null)], 0))], null),null)], null),new cljs.core.Keyword(null,".form-group",".form-group",-598355005)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["label",({"data-fulcro-source": "ouroboros.frontend.ui.pages.projects:89"}),"Description"]);
var G__41806 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:88"], null),G__41806], 0));
} else {
return G__41806;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("textarea",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:90"], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = new_project_description;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "";
}
})(),new cljs.core.Keyword(null,"onChange","onChange",-312891301),(function (p1__41756_SHARP_){
return com.fulcrologic.fulcro.mutations.set_string_BANG_.cljs$core$IFn$_invoke$arity$variadic(this$,new cljs.core.Keyword("ui","new-project-description","ui/new-project-description",2066075708),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"event","event",301435442),p1__41756_SHARP_], 0));
}),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Brief description of your project",new cljs.core.Keyword(null,"rows","rows",850049680),(3)], null)], 0))], null),null)], null),new cljs.core.Keyword(null,".form-group",".form-group",-598355005)),ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__41810 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),new_project_name,new cljs.core.Keyword(null,"description","description",-1428560544),new_project_description], null);
return (ouroboros.frontend.ui.pages.projects.create_project.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.pages.projects.create_project.cljs$core$IFn$_invoke$arity$1(G__41810) : ouroboros.frontend.ui.pages.projects.create_project.call(null, G__41810));
})()], null));
}),new cljs.core.Keyword(null,"disabled","disabled",-1529784218),(function (){var or__5002__auto__ = creating_QMARK_;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.empty_QMARK_(clojure.string.trim((function (){var or__5002__auto____$1 = new_project_name;
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return "";
}
})()));
}
})(),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"primary","primary",817773892)], null),(cljs.core.truth_(creating_QMARK_)?"Creating...":"Create Project"))], null),new cljs.core.Keyword(null,".project-form",".project-form",1365594314));
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.projects !== 'undefined') && (typeof ouroboros.frontend.ui.pages.projects.ProjectForm !== 'undefined')){
} else {
/**
 * Form for creating new projects
 * @constructor
 */
ouroboros.frontend.ui.pages.projects.ProjectForm = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42002,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.projects.ProjectForm,new cljs.core.Keyword("ouroboros.frontend.ui.pages.projects","ProjectForm","ouroboros.frontend.ui.pages.projects/ProjectForm",722852775),options__36450__auto___42002);
ouroboros.frontend.ui.pages.projects.ui_project_form = com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.projects.ProjectForm);

var options__36450__auto___42008 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$projects$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("webux","project-count","webux/project-count",2085942928),new cljs.core.Keyword("webux","active-sessions-count","webux/active-sessions-count",446989253),new cljs.core.Keyword("webux","completed-sessions-count","webux/completed-sessions-count",2092253899),new cljs.core.Keyword("webux","learning-count","webux/learning-count",776972181)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$projects$ident_STAR_(this$,p__41828){
var map__41830 = p__41828;
var map__41830__$1 = cljs.core.__destructure_map(map__41830);
var project_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41830__$1,new cljs.core.Keyword("webux","project-count","webux/project-count",2085942928));
var active_sessions_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41830__$1,new cljs.core.Keyword("webux","active-sessions-count","webux/active-sessions-count",446989253));
var completed_sessions_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41830__$1,new cljs.core.Keyword("webux","completed-sessions-count","webux/completed-sessions-count",2092253899));
var learning_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41830__$1,new cljs.core.Keyword("webux","learning-count","webux/learning-count",776972181));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("component","id","component/id",298306903),new cljs.core.Keyword(null,"webux-stats","webux-stats",-1527229270)], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$projects$render_WebUXStats(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__41836 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__41836__$1 = cljs.core.__destructure_map(map__41836);
var project_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41836__$1,new cljs.core.Keyword("webux","project-count","webux/project-count",2085942928));
var active_sessions_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41836__$1,new cljs.core.Keyword("webux","active-sessions-count","webux/active-sessions-count",446989253));
var completed_sessions_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41836__$1,new cljs.core.Keyword("webux","completed-sessions-count","webux/completed-sessions-count",2092253899));
var learning_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41836__$1,new cljs.core.Keyword("webux","learning-count","webux/learning-count",776972181));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = project_count;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Projects"], null));
var G__41844 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:114"], null),G__41844], 0));
} else {
return G__41844;
}
})(),ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = active_sessions_count;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Active Sessions"], null)),ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = completed_sessions_count;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Completed"], null)),ouroboros.frontend.ui.components.metric_card(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = learning_count;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"label","label",1718410804),"Learnings"], null))], null),new cljs.core.Keyword(null,".stats-grid",".stats-grid",-518005779));
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.projects !== 'undefined') && (typeof ouroboros.frontend.ui.pages.projects.WebUXStats !== 'undefined')){
} else {
/**
 * Web UX Platform statistics
 * @constructor
 */
ouroboros.frontend.ui.pages.projects.WebUXStats = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42008,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.projects.WebUXStats,new cljs.core.Keyword("ouroboros.frontend.ui.pages.projects","WebUXStats","ouroboros.frontend.ui.pages.projects/WebUXStats",-712169234),options__36450__auto___42008);
ouroboros.frontend.ui.pages.projects.ui_webux_stats = com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.projects.WebUXStats);

var options__36450__auto___42013 = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$projects$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("user","projects","user/projects",-352747490),com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.projects.ProjectCard)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("ui","project-form","ui/project-form",815246260),com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.projects.ProjectForm)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("ui","webux-stats","ui/webux-stats",-1527225026),com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.projects.WebUXStats)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"projects","projects",-364845983)], null)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$projects$ident_STAR_(this$,p__41874){
var map__41876 = p__41874;
var map__41876__$1 = cljs.core.__destructure_map(map__41876);
var props = map__41876__$1;
var projects = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41876__$1,new cljs.core.Keyword("user","projects","user/projects",-352747490));
var project_form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41876__$1,new cljs.core.Keyword("ui","project-form","ui/project-form",815246260));
var webux_stats = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41876__$1,new cljs.core.Keyword("ui","webux-stats","ui/webux-stats",-1527225026));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"projects","projects",-364845983)], null);
}),new cljs.core.Keyword(null,"route-segment","route-segment",1812935886),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["projects"], null),new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),(function ouroboros$frontend$ui$pages$projects$build_raw_initial_state_STAR_(_){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("ui","project-form","ui/project-form",815246260),(function (){var G__41884 = ouroboros.frontend.ui.pages.projects.ProjectForm;
var G__41885 = cljs.core.PersistentArrayMap.EMPTY;
return (com.fulcrologic.fulcro.components.get_initial_state.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(G__41884,G__41885) : com.fulcrologic.fulcro.components.get_initial_state.call(null, G__41884,G__41885));
})(),new cljs.core.Keyword("ui","webux-stats","ui/webux-stats",-1527225026),(function (){var G__41887 = ouroboros.frontend.ui.pages.projects.WebUXStats;
var G__41888 = cljs.core.PersistentArrayMap.EMPTY;
return (com.fulcrologic.fulcro.components.get_initial_state.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(G__41887,G__41888) : com.fulcrologic.fulcro.components.get_initial_state.call(null, G__41887,G__41888));
})()], null);
}),new cljs.core.Keyword(null,"will-enter","will-enter",-692415624),(function (app,route_params){
return com.fulcrologic.fulcro.routing.dynamic_routing.route_deferred(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"projects","projects",-364845983)], null),(function (){
return com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"projects","projects",-364845983)], null),ouroboros.frontend.ui.pages.projects.ProjectsPage,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"marker","marker",865118313),new cljs.core.Keyword(null,"projects","projects",-364845983),new cljs.core.Keyword(null,"post-mutation","post-mutation",-1076606705),new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","target-ready","com.fulcrologic.fulcro.routing.dynamic-routing/target-ready",-111862826,null),new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"projects","projects",-364845983)], null)], null)], null));
}));
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$projects$render_ProjectsPage(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__41896 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__41896__$1 = cljs.core.__destructure_map(map__41896);
var props = map__41896__$1;
var projects = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41896__$1,new cljs.core.Keyword("user","projects","user/projects",-352747490));
var project_form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41896__$1,new cljs.core.Keyword("ui","project-form","ui/project-form",815246260));
var webux_stats = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41896__$1,new cljs.core.Keyword("ui","webux-stats","ui/webux-stats",-1527225026));
var loading_QMARK_ = com.fulcrologic.fulcro.data_fetch.loading_QMARK_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"projects","projects",-364845983)], null)));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h1",({"data-fulcro-source": "ouroboros.frontend.ui.pages.projects:147"}),"Projects"]);
var G__41906 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:146"], null),G__41906], 0));
} else {
return G__41906;
}
})(),(cljs.core.truth_(webux_stats)?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (ouroboros.frontend.ui.pages.projects.ui_webux_stats.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.pages.projects.ui_webux_stats.cljs$core$IFn$_invoke$arity$1(webux_stats) : ouroboros.frontend.ui.pages.projects.ui_webux_stats.call(null, webux_stats));
var G__41909 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:151"], null),G__41909], 0));
} else {
return G__41909;
}
})()], null),new cljs.core.Keyword(null,".stats-section",".stats-section",791995323)):null),(cljs.core.truth_(project_form)?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (ouroboros.frontend.ui.pages.projects.ui_project_form.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.pages.projects.ui_project_form.cljs$core$IFn$_invoke$arity$1(project_form) : ouroboros.frontend.ui.pages.projects.ui_project_form.call(null, project_form));
var G__41913 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:156"], null),G__41913], 0));
} else {
return G__41913;
}
})()], null),new cljs.core.Keyword(null,".form-section",".form-section",2120675301)):null),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h2",({"data-fulcro-source": "ouroboros.frontend.ui.pages.projects:160"}),"Your Projects"]),((loading_QMARK_)?com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.pages.projects:162", "className": "loading"}),"Loading projects..."]):((cljs.core.seq(projects))?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = cljs.core.map.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.projects.ui_project_card,projects);
var G__41924 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.projects:164"], null),G__41924], 0));
} else {
return G__41924;
}
})()], null),new cljs.core.Keyword(null,".projects-grid",".projects-grid",1711702827)):ouroboros.frontend.ui.components.empty_state(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"icon","icon",1679606541),"\uD83D\uDCC1",new cljs.core.Keyword(null,"message","message",-406056002),"No projects yet. Create your first project above!"], null))))], null),new cljs.core.Keyword(null,".projects-page",".projects-page",73706507));
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.projects !== 'undefined') && (typeof ouroboros.frontend.ui.pages.projects.ProjectsPage !== 'undefined')){
} else {
/**
 * Main projects listing page
 * @constructor
 */
ouroboros.frontend.ui.pages.projects.ProjectsPage = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42013,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.projects.ProjectsPage,new cljs.core.Keyword("ouroboros.frontend.ui.pages.projects","ProjectsPage","ouroboros.frontend.ui.pages.projects/ProjectsPage",770632367),options__36450__auto___42013);

//# sourceMappingURL=ouroboros.frontend.ui.pages.projects.js.map
