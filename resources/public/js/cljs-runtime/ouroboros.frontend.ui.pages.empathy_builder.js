goog.provide('ouroboros.frontend.ui.pages.empathy_builder');
/**
 * Start a new empathy mapping session
 */
ouroboros.frontend.ui.pages.empathy_builder.start_empathy_session = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.empathy-builder","start-empathy-session","ouroboros.frontend.ui.pages.empathy-builder/start-empathy-session",-339084218,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.empathy-builder","start-empathy-session","ouroboros.frontend.ui.pages.empathy-builder/start-empathy-session",-339084218,null),(function (fulcro_mutation_env_symbol){
var map__41585 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41585__$1 = cljs.core.__destructure_map(map__41585);
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41585__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
var persona_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41585__$1,new cljs.core.Keyword(null,"persona-name","persona-name",-1081655841));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"remote","remote",-1593576576),(function ouroboros$frontend$ui$pages$empathy_builder$remote(env){
return env;
}),new cljs.core.Keyword(null,"ok-action","ok-action",1253795573),(function ouroboros$frontend$ui$pages$empathy_builder$ok_action(p__41591){
var map__41592 = p__41591;
var map__41592__$1 = cljs.core.__destructure_map(map__41592);
var result = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41592__$1,new cljs.core.Keyword(null,"result","result",1415092211));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41592__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41604_42010 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41605_42011 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41605_42011);

try{var session_data_42012 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(result);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,new cljs.core.Keyword("empathy","session","empathy/session",-1704238869),session_data_42012);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41604_42010);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41613 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41614 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41614);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41613);
}})], null);
}));
/**
 * Update empathy session data via WebSocket
 */
ouroboros.frontend.ui.pages.empathy_builder.update_empathy_data = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.empathy-builder","update-empathy-data","ouroboros.frontend.ui.pages.empathy-builder/update-empathy-data",553364944,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.empathy-builder","update-empathy-data","ouroboros.frontend.ui.pages.empathy-builder/update-empathy-data",553364944,null),(function (fulcro_mutation_env_symbol){
var map__41648 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41648__$1 = cljs.core.__destructure_map(map__41648);
var session_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41648__$1,new cljs.core.Keyword(null,"session-id","session-id",-1147060351));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41648__$1,new cljs.core.Keyword(null,"data","data",-232669377));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"remote","remote",-1593576576),(function ouroboros$frontend$ui$pages$empathy_builder$remote(env){
return env;
}),new cljs.core.Keyword(null,"ok-action","ok-action",1253795573),(function ouroboros$frontend$ui$pages$empathy_builder$ok_action(p__41657){
var map__41658 = p__41657;
var map__41658__$1 = cljs.core.__destructure_map(map__41658);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41658__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41659_42014 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41660_42015 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41660_42015);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("empathy","session","empathy/session",-1704238869),new cljs.core.Keyword("session","data","session/data",2012299945)], null),data);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41659_42014);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41664 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41665 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41665);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41664);
}})], null);
}));
/**
 * Mark empathy session as complete
 */
ouroboros.frontend.ui.pages.empathy_builder.complete_empathy_session = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.empathy-builder","complete-empathy-session","ouroboros.frontend.ui.pages.empathy-builder/complete-empathy-session",-1313258610,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.empathy-builder","complete-empathy-session","ouroboros.frontend.ui.pages.empathy-builder/complete-empathy-session",-1313258610,null),(function (fulcro_mutation_env_symbol){
var map__41678 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41678__$1 = cljs.core.__destructure_map(map__41678);
var session_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41678__$1,new cljs.core.Keyword(null,"session-id","session-id",-1147060351));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"remote","remote",-1593576576),(function ouroboros$frontend$ui$pages$empathy_builder$remote(env){
return env;
}),new cljs.core.Keyword(null,"ok-action","ok-action",1253795573),(function ouroboros$frontend$ui$pages$empathy_builder$ok_action(p__41681){
var map__41682 = p__41681;
var map__41682__$1 = cljs.core.__destructure_map(map__41682);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41682__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41684_42016 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41685_42017 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41685_42017);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("empathy","session","empathy/session",-1704238869),new cljs.core.Keyword("session","state","session/state",-64515581)], null),new cljs.core.Keyword(null,"completed","completed",-486056503));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41684_42016);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41687 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41688 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41688);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41687);
}})], null);
}));
/**
 * Add a sticky note to an empathy section
 */
ouroboros.frontend.ui.pages.empathy_builder.add_empathy_note = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.empathy-builder","add-empathy-note","ouroboros.frontend.ui.pages.empathy-builder/add-empathy-note",-1789445198,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.empathy-builder","add-empathy-note","ouroboros.frontend.ui.pages.empathy-builder/add-empathy-note",-1789445198,null),(function (fulcro_mutation_env_symbol){
var map__41695 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41695__$1 = cljs.core.__destructure_map(map__41695);
var session_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41695__$1,new cljs.core.Keyword(null,"session-id","session-id",-1147060351));
var section_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41695__$1,new cljs.core.Keyword(null,"section-key","section-key",-932493555));
var content = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41695__$1,new cljs.core.Keyword(null,"content","content",15833224));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"remote","remote",-1593576576),(function ouroboros$frontend$ui$pages$empathy_builder$remote(env){
return env;
}),new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$empathy_builder$action(p__41705){
var map__41706 = p__41705;
var map__41706__$1 = cljs.core.__destructure_map(map__41706);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41706__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41708_42018 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41709_42019 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41709_42019);

try{var new_note_42020 = ouroboros.frontend.ui.canvas_components.create_sticky_note(section_key,content);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("empathy","notes","empathy/notes",549101985)], null),cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("item","id","item/id",-1385287903).cljs$core$IFn$_invoke$arity$1(new_note_42020),new_note_42020], 0));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41708_42018);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41725 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41726 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41726);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41725);
}})], null);
}));
/**
 * Update a sticky note
 */
ouroboros.frontend.ui.pages.empathy_builder.update_empathy_note = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.empathy-builder","update-empathy-note","ouroboros.frontend.ui.pages.empathy-builder/update-empathy-note",-954729656,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.empathy-builder","update-empathy-note","ouroboros.frontend.ui.pages.empathy-builder/update-empathy-note",-954729656,null),(function (fulcro_mutation_env_symbol){
var map__41734 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41734__$1 = cljs.core.__destructure_map(map__41734);
var note_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41734__$1,new cljs.core.Keyword(null,"note-id","note-id",-873684363));
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41734__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$empathy_builder$action(p__41737){
var map__41741 = p__41737;
var map__41741__$1 = cljs.core.__destructure_map(map__41741);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41741__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41742_42021 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41744_42022 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41744_42022);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("empathy","notes","empathy/notes",549101985),note_id], null),cljs.core.merge,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([updates], 0));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41742_42021);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41749 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41751 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41751);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41749);
}})], null);
}));
/**
 * Delete a sticky note
 */
ouroboros.frontend.ui.pages.empathy_builder.delete_empathy_note = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.empathy-builder","delete-empathy-note","ouroboros.frontend.ui.pages.empathy-builder/delete-empathy-note",1170694511,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.empathy-builder","delete-empathy-note","ouroboros.frontend.ui.pages.empathy-builder/delete-empathy-note",1170694511,null),(function (fulcro_mutation_env_symbol){
var map__41763 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41763__$1 = cljs.core.__destructure_map(map__41763);
var note_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41763__$1,new cljs.core.Keyword(null,"note-id","note-id",-873684363));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$empathy_builder$action(p__41773){
var map__41774 = p__41773;
var map__41774__$1 = cljs.core.__destructure_map(map__41774);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41774__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41779_42024 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41780_42025 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41780_42025);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update,new cljs.core.Keyword("empathy","notes","empathy/notes",549101985),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([note_id], 0));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41779_42024);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41789 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41790 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41790);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41789);
}})], null);
}));
/**
 * Show completion progress for empathy map
 */
ouroboros.frontend.ui.pages.empathy_builder.empathy_progress_bar = (function ouroboros$frontend$ui$pages$empathy_builder$empathy_progress_bar(p__41799){
var map__41801 = p__41799;
var map__41801__$1 = cljs.core.__destructure_map(map__41801);
var completed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41801__$1,new cljs.core.Keyword(null,"completed","completed",-486056503));
var total = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41801__$1,new cljs.core.Keyword(null,"total","total",1916810418));
var percentage = (((total > (0)))?((100) * (completed / total)):(0));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h3",({"data-fulcro-source": "ouroboros.frontend.ui.pages.empathy-builder:74"}),"Progress"]);
var G__41807 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:73"], null),G__41807], 0));
} else {
return G__41807;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:77"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(percentage),"%"].join('')], null)], null)], 0))], null),new cljs.core.Keyword(null,".progress-fill",".progress-fill",1272680128));
var G__41811 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:76"], null),G__41811], 0));
} else {
return G__41811;
}
})()], null),new cljs.core.Keyword(null,".progress-bar",".progress-bar",-701697842));
var G__41816 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:75"], null),G__41816], 0));
} else {
return G__41816;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(completed),"/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(total)," sections"].join('');
var G__41818 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:78"], null),G__41818], 0));
} else {
return G__41818;
}
})()], null),new cljs.core.Keyword(null,".progress-text",".progress-text",-313300272))], null),new cljs.core.Keyword(null,".progress-container",".progress-container",-714249022))], null),new cljs.core.Keyword(null,".builder-progress",".builder-progress",-336698641));
});

var options__36450__auto___42026 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$empathy_builder$render_PersonaCard(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__41824 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__41824__$1 = cljs.core.__destructure_map(map__41824);
var persona_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41824__$1,new cljs.core.Keyword(null,"persona-name","persona-name",-1081655841));
var persona_details = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41824__$1,new cljs.core.Keyword(null,"persona-details","persona-details",498984148));
var on_edit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41824__$1,new cljs.core.Keyword(null,"on-edit","on-edit",745088083));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.pages.empathy-builder:84", "className": "persona-avatar"}),"\uD83D\uDC64"]);
var G__41825 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:83"], null),G__41825], 0));
} else {
return G__41825;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("h3",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = persona_name;
var G__41827 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:86"], null),G__41827], 0));
} else {
return G__41827;
}
})()], null),null);
var G__41829 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:85"], null),G__41829], 0));
} else {
return G__41829;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("p",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = persona_details;
var G__41833 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:87"], null),G__41833], 0));
} else {
return G__41833;
}
})()], null),null)], null),new cljs.core.Keyword(null,".persona-info",".persona-info",1477307042)),ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_edit,new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"secondary","secondary",-669381460)], null),"Edit")], null),new cljs.core.Keyword(null,".persona-card",".persona-card",1680540416));
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.empathy_builder !== 'undefined') && (typeof ouroboros.frontend.ui.pages.empathy_builder.PersonaCard !== 'undefined')){
} else {
/**
 * Display the persona card prominently
 * @constructor
 */
ouroboros.frontend.ui.pages.empathy_builder.PersonaCard = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42026,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.empathy_builder.PersonaCard,new cljs.core.Keyword("ouroboros.frontend.ui.pages.empathy-builder","PersonaCard","ouroboros.frontend.ui.pages.empathy-builder/PersonaCard",-162641764),options__36450__auto___42026);

var options__36450__auto___42027 = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$empathy_builder$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"project-id","project-id",206449307),new cljs.core.Keyword(null,"project-name","project-name",1486861539),new cljs.core.Keyword("empathy","session","empathy/session",-1704238869),new cljs.core.Keyword("empathy","notes","empathy/notes",549101985),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ui","ui",-469653645),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("ui","persona-name","ui/persona-name",-1081651117),new cljs.core.Keyword("ui","persona-details","ui/persona-details",498987552),new cljs.core.Keyword("ui","show-persona-modal","ui/show-persona-modal",666786092)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"empathy-builder","empathy-builder",457402130)], null)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$empathy_builder$ident_STAR_(this$,p__41863){
var map__41867 = p__41863;
var map__41867__$1 = cljs.core.__destructure_map(map__41867);
var props = map__41867__$1;
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41867__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
var project_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41867__$1,new cljs.core.Keyword(null,"project-name","project-name",1486861539));
var session = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41867__$1,new cljs.core.Keyword("empathy","session","empathy/session",-1704238869));
var notes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41867__$1,new cljs.core.Keyword("empathy","notes","empathy/notes",549101985));
var ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41867__$1,new cljs.core.Keyword(null,"ui","ui",-469653645));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"empathy-builder","empathy-builder",457402130)], null);
}),new cljs.core.Keyword(null,"route-segment","route-segment",1812935886),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["project",new cljs.core.Keyword(null,"project-id","project-id",206449307),"empathy"], null),new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),(function ouroboros$frontend$ui$pages$empathy_builder$build_raw_initial_state_STAR_(_){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("empathy","notes","empathy/notes",549101985),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ui","ui",-469653645),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("ui","persona-name","ui/persona-name",-1081651117),"",new cljs.core.Keyword("ui","persona-details","ui/persona-details",498987552),"",new cljs.core.Keyword("ui","show-persona-modal","ui/show-persona-modal",666786092),true], null)], null);
}),new cljs.core.Keyword(null,"will-enter","will-enter",-692415624),(function (app,p__41870){
var map__41871 = p__41870;
var map__41871__$1 = cljs.core.__destructure_map(map__41871);
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41871__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
return com.fulcrologic.fulcro.routing.dynamic_routing.route_deferred(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"empathy-builder","empathy-builder",457402130)], null),(function (){
return com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"empathy-builder","empathy-builder",457402130)], null),ouroboros.frontend.ui.pages.empathy_builder.EmpathyBuilderPage,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"marker","marker",865118313),new cljs.core.Keyword(null,"empathy-builder","empathy-builder",457402130),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"project-id","project-id",206449307),project_id], null),new cljs.core.Keyword(null,"post-mutation","post-mutation",-1076606705),new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","target-ready","com.fulcrologic.fulcro.routing.dynamic-routing/target-ready",-111862826,null),new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"empathy-builder","empathy-builder",457402130)], null)], null)], null));
}));
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$empathy_builder$render_EmpathyBuilderPage(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__41877 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__41877__$1 = cljs.core.__destructure_map(map__41877);
var props = map__41877__$1;
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41877__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
var project_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41877__$1,new cljs.core.Keyword(null,"project-name","project-name",1486861539));
var session = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41877__$1,new cljs.core.Keyword("empathy","session","empathy/session",-1704238869));
var notes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41877__$1,new cljs.core.Keyword("empathy","notes","empathy/notes",549101985));
var ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41877__$1,new cljs.core.Keyword(null,"ui","ui",-469653645));
var loading_QMARK_ = com.fulcrologic.fulcro.data_fetch.loading_QMARK_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"empathy-builder","empathy-builder",457402130)], null)));
var session_data = (function (){var or__5002__auto__ = session;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
var notes_map = (function (){var or__5002__auto__ = notes;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
var map__41883 = (function (){var or__5002__auto__ = ui;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
var map__41883__$1 = cljs.core.__destructure_map(map__41883);
var persona_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41883__$1,new cljs.core.Keyword("ui","persona-name","ui/persona-name",-1081651117));
var persona_details = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41883__$1,new cljs.core.Keyword("ui","persona-details","ui/persona-details",498987552));
var show_persona_modal = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41883__$1,new cljs.core.Keyword("ui","show-persona-modal","ui/show-persona-modal",666786092));
var notes_by_section = cljs.core.group_by(new cljs.core.Keyword("item","section","item/section",-301090499),cljs.core.vals(notes_map));
var sections = new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"persona","persona",-908887662),new cljs.core.Keyword(null,"think-feel","think-feel",-1744190610),new cljs.core.Keyword(null,"hear","hear",992369902),new cljs.core.Keyword(null,"see","see",148135546),new cljs.core.Keyword(null,"say-do","say-do",-1819531531),new cljs.core.Keyword(null,"pains-gains","pains-gains",-420992494)], null);
var completed_count = cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__41842_SHARP_){
return cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$2(notes_by_section,p1__41842_SHARP_));
}),sections));
var is_complete_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(completed_count,cljs.core.count(sections));
if(loading_QMARK_){
return com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.pages.empathy-builder:134", "className": "loading"}),"Loading empathy builder..."]);
} else {
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h1",({"data-fulcro-source": "ouroboros.frontend.ui.pages.empathy-builder:139"}),"\uD83E\uDDE0 Empathy Map Builder"]);
var G__41901 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:138"], null),G__41901], 0));
} else {
return G__41901;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("p",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ["Understanding your customer for: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(project_name)].join('');
var G__41902 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:140"], null),G__41902], 0));
} else {
return G__41902;
}
})()], null),new cljs.core.Keyword(null,".builder-subtitle",".builder-subtitle",-578112461))], null),new cljs.core.Keyword(null,".builder-header",".builder-header",275446169));
var G__41907 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:136"], null),G__41907], 0));
} else {
return G__41907;
}
})(),(function (){var G__41910 = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"on-export","on-export",1803619391),(function (){
var json_data = ouroboros.frontend.ui.canvas_components.export_canvas_to_json(cljs.core.vals(notes_map));
return ouroboros.frontend.ui.canvas_components.download_json(["empathy-map-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(project_id),".json"].join(''),json_data);
}),new cljs.core.Keyword(null,"on-share","on-share",732084173),(function (){
return alert("Share link copied to clipboard!");
}),new cljs.core.Keyword(null,"on-present","on-present",966369426),(function (){
return alert("Present mode activated!");
}),new cljs.core.Keyword(null,"on-clear","on-clear",2009781891),(function (){
if(cljs.core.truth_(confirm("Clear all notes? This cannot be undone."))){
return com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__41921 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("empathy","notes","empathy/notes",549101985),cljs.core.PersistentArrayMap.EMPTY], null);
return (com.fulcrologic.fulcro.mutations.set_props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.mutations.set_props.cljs$core$IFn$_invoke$arity$1(G__41921) : com.fulcrologic.fulcro.mutations.set_props.call(null, G__41921));
})()], null));
} else {
return null;
}
}),new cljs.core.Keyword(null,"can-undo?","can-undo?",1175089574),false,new cljs.core.Keyword(null,"can-redo?","can-redo?",1502250971),false], null);
return (ouroboros.frontend.ui.canvas_components.toolbar.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.toolbar.cljs$core$IFn$_invoke$arity$1(G__41910) : ouroboros.frontend.ui.canvas_components.toolbar.call(null, G__41910));
})(),(cljs.core.truth_((function (){var and__5000__auto__ = show_persona_modal;
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.empty_QMARK_(persona_name);
} else {
return and__5000__auto__;
}
})())?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h2",({"data-fulcro-source": "ouroboros.frontend.ui.pages.empathy-builder:160"}),"\uD83D\uDC64 Define Your Persona"]);
var G__41931 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:159"], null),G__41931], 0));
} else {
return G__41931;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["p",({"data-fulcro-source": "ouroboros.frontend.ui.pages.empathy-builder:161"}),"Who is the customer you're building for?"]),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["label",({"data-fulcro-source": "ouroboros.frontend.ui.pages.empathy-builder:163"}),"Persona Name"]);
var G__41937 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:162"], null),G__41937], 0));
} else {
return G__41937;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("input",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:164"], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = persona_name;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "";
}
})(),new cljs.core.Keyword(null,"onChange","onChange",-312891301),(function (p1__41848_SHARP_){
return com.fulcrologic.fulcro.mutations.set_string_BANG_.cljs$core$IFn$_invoke$arity$variadic(this$,new cljs.core.Keyword("ui","persona-name","ui/persona-name",-1081651117),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"event","event",301435442),p1__41848_SHARP_], 0));
}),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"e.g., Alex, the Curious Developer"], null)], 0))], null),null)], null),new cljs.core.Keyword(null,".form-group",".form-group",-598355005)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["label",({"data-fulcro-source": "ouroboros.frontend.ui.pages.empathy-builder:170"}),"Details"]);
var G__41952 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:169"], null),G__41952], 0));
} else {
return G__41952;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("textarea",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:171"], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"value","value",305978217),(function (){var or__5002__auto__ = persona_details;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "";
}
})(),new cljs.core.Keyword(null,"onChange","onChange",-312891301),(function (p1__41849_SHARP_){
return com.fulcrologic.fulcro.mutations.set_string_BANG_.cljs$core$IFn$_invoke$arity$variadic(this$,new cljs.core.Keyword("ui","persona-details","ui/persona-details",498987552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"event","event",301435442),p1__41849_SHARP_], 0));
}),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Age, job, goals, challenges...",new cljs.core.Keyword(null,"rows","rows",850049680),(3)], null)], 0))], null),null)], null),new cljs.core.Keyword(null,".form-group",".form-group",-598355005)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (){
return com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__41959 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"session-id","session-id",-1147060351),new cljs.core.Keyword("session","id","session/id",604977054).cljs$core$IFn$_invoke$arity$1(session_data),new cljs.core.Keyword(null,"section-key","section-key",-932493555),new cljs.core.Keyword(null,"persona","persona",-908887662),new cljs.core.Keyword(null,"content","content",15833224),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(persona_name)," - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(persona_details)].join('')], null);
return (ouroboros.frontend.ui.pages.empathy_builder.add_empathy_note.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.pages.empathy_builder.add_empathy_note.cljs$core$IFn$_invoke$arity$1(G__41959) : ouroboros.frontend.ui.pages.empathy_builder.add_empathy_note.call(null, G__41959));
})(),(function (){var G__41960 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ui","ui",-469653645),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("ui","show-persona-modal","ui/show-persona-modal",666786092),false], null)], null);
return (com.fulcrologic.fulcro.mutations.set_props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.mutations.set_props.cljs$core$IFn$_invoke$arity$1(G__41960) : com.fulcrologic.fulcro.mutations.set_props.call(null, G__41960));
})()], null));
}),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"primary","primary",817773892),new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core.empty_QMARK_(clojure.string.trim((function (){var or__5002__auto__ = persona_name;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "";
}
})()))], null),"Start Building");
var G__41963 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:176"], null),G__41963], 0));
} else {
return G__41963;
}
})()], null),new cljs.core.Keyword(null,".modal-actions",".modal-actions",1889554120))], null),new cljs.core.Keyword(null,".modal-content",".modal-content",245331270));
var G__41965 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:158"], null),G__41965], 0));
} else {
return G__41965;
}
})()], null),new cljs.core.Keyword(null,".modal-overlay",".modal-overlay",-2141548114)):null),ouroboros.frontend.ui.pages.empathy_builder.empathy_progress_bar(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"completed","completed",-486056503),completed_count,new cljs.core.Keyword(null,"total","total",1916810418),cljs.core.count(sections)], null)),((is_complete_QMARK_)?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.pages.empathy-builder:194", "className": "completion-icon"}),"\uD83C\uDF89"]);
var G__41973 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:193"], null),G__41973], 0));
} else {
return G__41973;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h2",({"data-fulcro-source": "ouroboros.frontend.ui.pages.empathy-builder:195"}),"Empathy Map Complete!"]),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["p",({"data-fulcro-source": "ouroboros.frontend.ui.pages.empathy-builder:196"}),"You now deeply understand your customer. The insights you've gathered will inform your Value Proposition."]),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["project",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"project-id","project-id",206449307),project_id], null)], null));
}),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"secondary","secondary",-669381460)], null),"Back to Project");
var G__41979 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:197"], null),G__41979], 0));
} else {
return G__41979;
}
})(),ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["project",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"project-id","project-id",206449307),project_id], null),"valueprop"], null));
}),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"primary","primary",817773892)], null),"Continue to Value Proposition \u2192")], null),new cljs.core.Keyword(null,".completion-actions",".completion-actions",-154906479))], null),new cljs.core.Keyword(null,".completion-state",".completion-state",59901358)):com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.canvas_components.empathy_map(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"sections","sections",-886710106),ouroboros.frontend.ui.canvas_components.initialize_empathy_map(),new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.vals(notes_map),new cljs.core.Keyword(null,"on-item-add","on-item-add",216530268),(function (section_key){
var content = prompt(["Add note to ",cljs.core.name(section_key),":"].join(''));
if(cljs.core.seq(content)){
return com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__41995 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"session-id","session-id",-1147060351),new cljs.core.Keyword("session","id","session/id",604977054).cljs$core$IFn$_invoke$arity$1(session_data),new cljs.core.Keyword(null,"section-key","section-key",-932493555),section_key,new cljs.core.Keyword(null,"content","content",15833224),content], null);
return (ouroboros.frontend.ui.pages.empathy_builder.add_empathy_note.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.pages.empathy_builder.add_empathy_note.cljs$core$IFn$_invoke$arity$1(G__41995) : ouroboros.frontend.ui.pages.empathy_builder.add_empathy_note.call(null, G__41995));
})()], null));
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-item-move","on-item-move",-1044145537),(function (item_id,new_position){
return com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__41996 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"note-id","note-id",-873684363),item_id,new cljs.core.Keyword(null,"updates","updates",2013983452),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("item","position","item/position",-2025529535),new_position], null)], null);
return (ouroboros.frontend.ui.pages.empathy_builder.update_empathy_note.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.pages.empathy_builder.update_empathy_note.cljs$core$IFn$_invoke$arity$1(G__41996) : ouroboros.frontend.ui.pages.empathy_builder.update_empathy_note.call(null, G__41996));
})()], null));
}),new cljs.core.Keyword(null,"on-item-update","on-item-update",-841138763),(function (item_id,updates){
return com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__41998 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"note-id","note-id",-873684363),item_id,new cljs.core.Keyword(null,"updates","updates",2013983452),updates], null);
return (ouroboros.frontend.ui.pages.empathy_builder.update_empathy_note.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.pages.empathy_builder.update_empathy_note.cljs$core$IFn$_invoke$arity$1(G__41998) : ouroboros.frontend.ui.pages.empathy_builder.update_empathy_note.call(null, G__41998));
})()], null));
})], null));
var G__41999 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.empathy-builder:208"], null),G__41999], 0));
} else {
return G__41999;
}
})()], null),new cljs.core.Keyword(null,".canvas-container",".canvas-container",1990259081)))], null),new cljs.core.Keyword(null,".builder-page",".builder-page",2097984029));
}
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.empathy_builder !== 'undefined') && (typeof ouroboros.frontend.ui.pages.empathy_builder.EmpathyBuilderPage !== 'undefined')){
} else {
/**
 * Empathy Map builder with visual canvas interface
 * @constructor
 */
ouroboros.frontend.ui.pages.empathy_builder.EmpathyBuilderPage = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42027,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.empathy_builder.EmpathyBuilderPage,new cljs.core.Keyword("ouroboros.frontend.ui.pages.empathy-builder","EmpathyBuilderPage","ouroboros.frontend.ui.pages.empathy-builder/EmpathyBuilderPage",-1140143068),options__36450__auto___42027);

//# sourceMappingURL=ouroboros.frontend.ui.pages.empathy_builder.js.map
