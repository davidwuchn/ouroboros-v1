goog.provide('ouroboros.frontend.ui.pages.lean_canvas_builder');
/**
 * Start a new Lean Canvas session
 */
ouroboros.frontend.ui.pages.lean_canvas_builder.start_lean_canvas_session = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.lean-canvas-builder","start-lean-canvas-session","ouroboros.frontend.ui.pages.lean-canvas-builder/start-lean-canvas-session",-411462586,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.lean-canvas-builder","start-lean-canvas-session","ouroboros.frontend.ui.pages.lean-canvas-builder/start-lean-canvas-session",-411462586,null),(function (fulcro_mutation_env_symbol){
var map__41628 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41628__$1 = cljs.core.__destructure_map(map__41628);
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41628__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"remote","remote",-1593576576),(function ouroboros$frontend$ui$pages$lean_canvas_builder$remote(env){
return env;
}),new cljs.core.Keyword(null,"ok-action","ok-action",1253795573),(function ouroboros$frontend$ui$pages$lean_canvas_builder$ok_action(p__41632){
var map__41634 = p__41632;
var map__41634__$1 = cljs.core.__destructure_map(map__41634);
var result = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41634__$1,new cljs.core.Keyword(null,"result","result",1415092211));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41634__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41637_41974 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41638_41975 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41638_41975);

try{var session_data_41976 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(result);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,new cljs.core.Keyword("lean-canvas","session","lean-canvas/session",823256224),session_data_41976);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41637_41974);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41644 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41645 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41645);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41644);
}})], null);
}));
/**
 * Update canvas data via WebSocket
 */
ouroboros.frontend.ui.pages.lean_canvas_builder.update_lean_canvas_data = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.lean-canvas-builder","update-lean-canvas-data","ouroboros.frontend.ui.pages.lean-canvas-builder/update-lean-canvas-data",-1847962875,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.lean-canvas-builder","update-lean-canvas-data","ouroboros.frontend.ui.pages.lean-canvas-builder/update-lean-canvas-data",-1847962875,null),(function (fulcro_mutation_env_symbol){
var map__41690 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41690__$1 = cljs.core.__destructure_map(map__41690);
var session_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41690__$1,new cljs.core.Keyword(null,"session-id","session-id",-1147060351));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41690__$1,new cljs.core.Keyword(null,"data","data",-232669377));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"remote","remote",-1593576576),(function ouroboros$frontend$ui$pages$lean_canvas_builder$remote(env){
return env;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41700 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41701 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41701);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41700);
}})], null);
}));
/**
 * Mark canvas session as complete
 */
ouroboros.frontend.ui.pages.lean_canvas_builder.complete_lean_canvas_session = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.lean-canvas-builder","complete-lean-canvas-session","ouroboros.frontend.ui.pages.lean-canvas-builder/complete-lean-canvas-session",-1821948437,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.lean-canvas-builder","complete-lean-canvas-session","ouroboros.frontend.ui.pages.lean-canvas-builder/complete-lean-canvas-session",-1821948437,null),(function (fulcro_mutation_env_symbol){
var map__41730 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41730__$1 = cljs.core.__destructure_map(map__41730);
var session_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41730__$1,new cljs.core.Keyword(null,"session-id","session-id",-1147060351));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"remote","remote",-1593576576),(function ouroboros$frontend$ui$pages$lean_canvas_builder$remote(env){
return env;
}),new cljs.core.Keyword(null,"ok-action","ok-action",1253795573),(function ouroboros$frontend$ui$pages$lean_canvas_builder$ok_action(p__41738){
var map__41740 = p__41738;
var map__41740__$1 = cljs.core.__destructure_map(map__41740);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41740__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41743_41981 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41745_41982 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41745_41982);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lean-canvas","session","lean-canvas/session",823256224),new cljs.core.Keyword("session","state","session/state",-64515581)], null),new cljs.core.Keyword(null,"completed","completed",-486056503));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41743_41981);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41748 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41750 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41750);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41748);
}})], null);
}));
/**
 * Add a sticky note to a canvas block
 */
ouroboros.frontend.ui.pages.lean_canvas_builder.add_canvas_note = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.lean-canvas-builder","add-canvas-note","ouroboros.frontend.ui.pages.lean-canvas-builder/add-canvas-note",-1522924951,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.lean-canvas-builder","add-canvas-note","ouroboros.frontend.ui.pages.lean-canvas-builder/add-canvas-note",-1522924951,null),(function (fulcro_mutation_env_symbol){
var map__41759 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41759__$1 = cljs.core.__destructure_map(map__41759);
var session_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41759__$1,new cljs.core.Keyword(null,"session-id","session-id",-1147060351));
var block_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41759__$1,new cljs.core.Keyword(null,"block-key","block-key",929447377));
var content = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41759__$1,new cljs.core.Keyword(null,"content","content",15833224));
var color = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41759__$1,new cljs.core.Keyword(null,"color","color",1011675173));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"remote","remote",-1593576576),(function ouroboros$frontend$ui$pages$lean_canvas_builder$remote(env){
return env;
}),new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$lean_canvas_builder$action(p__41764){
var map__41765 = p__41764;
var map__41765__$1 = cljs.core.__destructure_map(map__41765);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41765__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41770_41990 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41771_41991 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41771_41991);

try{var new_note_41992 = ouroboros.frontend.ui.canvas_components.create_sticky_note.cljs$core$IFn$_invoke$arity$variadic(block_key,content,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"color","color",1011675173),(function (){var or__5002__auto__ = color;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "yellow";
}
})()], 0));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lean-canvas","notes","lean-canvas/notes",-886950442)], null),cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("item","id","item/id",-1385287903).cljs$core$IFn$_invoke$arity$1(new_note_41992),new_note_41992], 0));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41770_41990);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41777 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41778 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41778);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41777);
}})], null);
}));
/**
 * Update a canvas sticky note
 */
ouroboros.frontend.ui.pages.lean_canvas_builder.update_canvas_note = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.lean-canvas-builder","update-canvas-note","ouroboros.frontend.ui.pages.lean-canvas-builder/update-canvas-note",-854040685,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.lean-canvas-builder","update-canvas-note","ouroboros.frontend.ui.pages.lean-canvas-builder/update-canvas-note",-854040685,null),(function (fulcro_mutation_env_symbol){
var map__41792 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41792__$1 = cljs.core.__destructure_map(map__41792);
var note_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41792__$1,new cljs.core.Keyword(null,"note-id","note-id",-873684363));
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41792__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$lean_canvas_builder$action(p__41793){
var map__41795 = p__41793;
var map__41795__$1 = cljs.core.__destructure_map(map__41795);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41795__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41796_42000 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41797_42001 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41797_42001);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lean-canvas","notes","lean-canvas/notes",-886950442),note_id], null),cljs.core.merge,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([updates], 0));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41796_42000);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41802 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41803 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41803);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41802);
}})], null);
}));
/**
 * Delete a canvas sticky note
 */
ouroboros.frontend.ui.pages.lean_canvas_builder.delete_canvas_note = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.pages.lean-canvas-builder","delete-canvas-note","ouroboros.frontend.ui.pages.lean-canvas-builder/delete-canvas-note",1772176363,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.pages.lean-canvas-builder","delete-canvas-note","ouroboros.frontend.ui.pages.lean-canvas-builder/delete-canvas-note",1772176363,null),(function (fulcro_mutation_env_symbol){
var map__41809 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__41809__$1 = cljs.core.__destructure_map(map__41809);
var note_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41809__$1,new cljs.core.Keyword(null,"note-id","note-id",-873684363));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$pages$lean_canvas_builder$action(p__41812){
var map__41813 = p__41812;
var map__41813__$1 = cljs.core.__destructure_map(map__41813);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41813__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__41814_42004 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41815_42005 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41815_42005);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update,new cljs.core.Keyword("lean-canvas","notes","lean-canvas/notes",-886950442),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([note_id], 0));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41814_42004);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__41822 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__41823 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__41823);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__41822);
}})], null);
}));
/**
 * Configuration for the 9 Lean Canvas blocks
 */
ouroboros.frontend.ui.pages.lean_canvas_builder.lean_canvas_blocks = new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"problems","problems",2097327077),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDE2B Problems",new cljs.core.Keyword(null,"description","description",-1428560544),"Top 3 problems",new cljs.core.Keyword(null,"color","color",1011675173),"red",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"problems"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"solution","solution",-1727231491),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDCA1 Solution",new cljs.core.Keyword(null,"description","description",-1428560544),"How you solve them",new cljs.core.Keyword(null,"color","color",1011675173),"green",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"solution"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"uvp","uvp",-1489127703),new cljs.core.Keyword(null,"title","title",636505583),"\u2728 Unique Value Proposition",new cljs.core.Keyword(null,"description","description",-1428560544),"Why you're different",new cljs.core.Keyword(null,"color","color",1011675173),"purple",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"uvp"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"unfair-advantage","unfair-advantage",1693371236),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDEE1\uFE0F Unfair Advantage",new cljs.core.Keyword(null,"description","description",-1428560544),"Can't be copied",new cljs.core.Keyword(null,"color","color",1011675173),"gold",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"unfair-advantage"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"customer-segments","customer-segments",-393478998),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDC65 Customer Segments",new cljs.core.Keyword(null,"description","description",-1428560544),"Target customers",new cljs.core.Keyword(null,"color","color",1011675173),"blue",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"customer-segments"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"key-metrics","key-metrics",859160814),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDCCA Key Metrics",new cljs.core.Keyword(null,"description","description",-1428560544),"What you measure",new cljs.core.Keyword(null,"color","color",1011675173),"teal",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"key-metrics"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"channels","channels",1132759174),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDCE2 Channels",new cljs.core.Keyword(null,"description","description",-1428560544),"How you reach them",new cljs.core.Keyword(null,"color","color",1011675173),"orange",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"channels"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"cost-structure","cost-structure",-1168471561),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDCB0 Cost Structure",new cljs.core.Keyword(null,"description","description",-1428560544),"Fixed & variable costs",new cljs.core.Keyword(null,"color","color",1011675173),"pink",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"cost-structure"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"revenue-streams","revenue-streams",-1450897798),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDCB5 Revenue Streams",new cljs.core.Keyword(null,"description","description",-1428560544),"How you make money",new cljs.core.Keyword(null,"color","color",1011675173),"green",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"revenue-streams"], null)], null);
/**
 * Show completion progress for Lean Canvas
 */
ouroboros.frontend.ui.pages.lean_canvas_builder.canvas_progress_bar = (function ouroboros$frontend$ui$pages$lean_canvas_builder$canvas_progress_bar(p__41834){
var map__41835 = p__41834;
var map__41835__$1 = cljs.core.__destructure_map(map__41835);
var completed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41835__$1,new cljs.core.Keyword(null,"completed","completed",-486056503));
var total = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41835__$1,new cljs.core.Keyword(null,"total","total",1916810418));
var percentage = (((total > (0)))?((100) * (completed / total)):(0));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h3",({"data-fulcro-source": "ouroboros.frontend.ui.pages.lean-canvas-builder:96"}),"Canvas Completion"]);
var G__41838 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.lean-canvas-builder:95"], null),G__41838], 0));
} else {
return G__41838;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.lean-canvas-builder:99"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(percentage),"%"].join('')], null)], null)], 0))], null),new cljs.core.Keyword(null,".progress-fill",".progress-fill",1272680128));
var G__41843 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.lean-canvas-builder:98"], null),G__41843], 0));
} else {
return G__41843;
}
})()], null),new cljs.core.Keyword(null,".progress-bar",".progress-bar",-701697842));
var G__41845 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.lean-canvas-builder:97"], null),G__41845], 0));
} else {
return G__41845;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(completed),"/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(total)," blocks"].join('');
var G__41847 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.lean-canvas-builder:100"], null),G__41847], 0));
} else {
return G__41847;
}
})()], null),new cljs.core.Keyword(null,".progress-text",".progress-text",-313300272))], null),new cljs.core.Keyword(null,".progress-container",".progress-container",-714249022))], null),new cljs.core.Keyword(null,".builder-progress",".builder-progress",-336698641));
});

var options__36450__auto___42009 = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$lean_canvas_builder$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"project-id","project-id",206449307),new cljs.core.Keyword(null,"project-name","project-name",1486861539),new cljs.core.Keyword("lean-canvas","session","lean-canvas/session",823256224),new cljs.core.Keyword("lean-canvas","notes","lean-canvas/notes",-886950442),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"lean-canvas-builder","lean-canvas-builder",1005712797)], null)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$lean_canvas_builder$ident_STAR_(this$,p__41872){
var map__41873 = p__41872;
var map__41873__$1 = cljs.core.__destructure_map(map__41873);
var props = map__41873__$1;
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41873__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
var project_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41873__$1,new cljs.core.Keyword(null,"project-name","project-name",1486861539));
var session = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41873__$1,new cljs.core.Keyword("lean-canvas","session","lean-canvas/session",823256224));
var notes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41873__$1,new cljs.core.Keyword("lean-canvas","notes","lean-canvas/notes",-886950442));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"lean-canvas-builder","lean-canvas-builder",1005712797)], null);
}),new cljs.core.Keyword(null,"route-segment","route-segment",1812935886),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["project",new cljs.core.Keyword(null,"project-id","project-id",206449307),"canvas"], null),new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),(function ouroboros$frontend$ui$pages$lean_canvas_builder$build_raw_initial_state_STAR_(_){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lean-canvas","notes","lean-canvas/notes",-886950442),cljs.core.PersistentArrayMap.EMPTY], null);
}),new cljs.core.Keyword(null,"will-enter","will-enter",-692415624),(function (app,p__41878){
var map__41879 = p__41878;
var map__41879__$1 = cljs.core.__destructure_map(map__41879);
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41879__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
return com.fulcrologic.fulcro.routing.dynamic_routing.route_deferred(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"lean-canvas-builder","lean-canvas-builder",1005712797)], null),(function (){
return com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"lean-canvas-builder","lean-canvas-builder",1005712797)], null),ouroboros.frontend.ui.pages.lean_canvas_builder.LeanCanvasBuilderPage,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"marker","marker",865118313),new cljs.core.Keyword(null,"lean-canvas-builder","lean-canvas-builder",1005712797),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"project-id","project-id",206449307),project_id], null),new cljs.core.Keyword(null,"post-mutation","post-mutation",-1076606705),new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","target-ready","com.fulcrologic.fulcro.routing.dynamic-routing/target-ready",-111862826,null),new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"lean-canvas-builder","lean-canvas-builder",1005712797)], null)], null)], null));
}));
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$lean_canvas_builder$render_LeanCanvasBuilderPage(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__41886 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__41886__$1 = cljs.core.__destructure_map(map__41886);
var props = map__41886__$1;
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41886__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
var project_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41886__$1,new cljs.core.Keyword(null,"project-name","project-name",1486861539));
var session = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41886__$1,new cljs.core.Keyword("lean-canvas","session","lean-canvas/session",823256224));
var notes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41886__$1,new cljs.core.Keyword("lean-canvas","notes","lean-canvas/notes",-886950442));
var loading_QMARK_ = com.fulcrologic.fulcro.data_fetch.loading_QMARK_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"lean-canvas-builder","lean-canvas-builder",1005712797)], null)));
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
var notes_by_block = cljs.core.group_by(new cljs.core.Keyword("item","section","item/section",-301090499),cljs.core.vals(notes_map));
var blocks = new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"problems","problems",2097327077),new cljs.core.Keyword(null,"solution","solution",-1727231491),new cljs.core.Keyword(null,"uvp","uvp",-1489127703),new cljs.core.Keyword(null,"unfair-advantage","unfair-advantage",1693371236),new cljs.core.Keyword(null,"customer-segments","customer-segments",-393478998),new cljs.core.Keyword(null,"key-metrics","key-metrics",859160814),new cljs.core.Keyword(null,"channels","channels",1132759174),new cljs.core.Keyword(null,"cost-structure","cost-structure",-1168471561),new cljs.core.Keyword(null,"revenue-streams","revenue-streams",-1450897798)], null);
var completed_count = cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__41853_SHARP_){
return cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$2(notes_by_block,p1__41853_SHARP_));
}),blocks));
var is_complete_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(completed_count,cljs.core.count(blocks));
if(loading_QMARK_){
return com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.pages.lean-canvas-builder:139", "className": "loading"}),"Loading Lean Canvas builder..."]);
} else {
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h1",({"data-fulcro-source": "ouroboros.frontend.ui.pages.lean-canvas-builder:144"}),"\uD83D\uDCCA Lean Canvas Builder"]);
var G__41917 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.lean-canvas-builder:143"], null),G__41917], 0));
} else {
return G__41917;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("p",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ["Business model for: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(project_name)].join('');
var G__41922 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.lean-canvas-builder:145"], null),G__41922], 0));
} else {
return G__41922;
}
})()], null),new cljs.core.Keyword(null,".builder-subtitle",".builder-subtitle",-578112461))], null),new cljs.core.Keyword(null,".builder-header",".builder-header",275446169));
var G__41923 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.lean-canvas-builder:141"], null),G__41923], 0));
} else {
return G__41923;
}
})(),(function (){var G__41926 = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"on-export","on-export",1803619391),(function (){
var json_data = ouroboros.frontend.ui.canvas_components.export_canvas_to_json(cljs.core.vals(notes_map));
return ouroboros.frontend.ui.canvas_components.download_json(["lean-canvas-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(project_id),".json"].join(''),json_data);
}),new cljs.core.Keyword(null,"on-share","on-share",732084173),(function (){
return alert("Share link copied to clipboard!");
}),new cljs.core.Keyword(null,"on-present","on-present",966369426),(function (){
return alert("Present mode activated!");
}),new cljs.core.Keyword(null,"on-clear","on-clear",2009781891),(function (){
if(cljs.core.truth_(confirm("Clear all notes? This cannot be undone."))){
return com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__41930 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lean-canvas","notes","lean-canvas/notes",-886950442),cljs.core.PersistentArrayMap.EMPTY], null);
return (com.fulcrologic.fulcro.mutations.set_props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.mutations.set_props.cljs$core$IFn$_invoke$arity$1(G__41930) : com.fulcrologic.fulcro.mutations.set_props.call(null, G__41930));
})()], null));
} else {
return null;
}
}),new cljs.core.Keyword(null,"can-undo?","can-undo?",1175089574),false,new cljs.core.Keyword(null,"can-redo?","can-redo?",1502250971),false], null);
return (ouroboros.frontend.ui.canvas_components.toolbar.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.toolbar.cljs$core$IFn$_invoke$arity$1(G__41926) : ouroboros.frontend.ui.canvas_components.toolbar.call(null, G__41926));
})(),ouroboros.frontend.ui.pages.lean_canvas_builder.canvas_progress_bar(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"completed","completed",-486056503),completed_count,new cljs.core.Keyword(null,"total","total",1916810418),cljs.core.count(blocks)], null)),((is_complete_QMARK_)?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.pages.lean-canvas-builder:167", "className": "completion-icon"}),"\uD83C\uDF89"]);
var G__41933 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.lean-canvas-builder:166"], null),G__41933], 0));
} else {
return G__41933;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h2",({"data-fulcro-source": "ouroboros.frontend.ui.pages.lean-canvas-builder:168"}),"Lean Canvas Complete!"]),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["p",({"data-fulcro-source": "ouroboros.frontend.ui.pages.lean-canvas-builder:169"}),"You now have a complete business model. Time to validate your assumptions!"]),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["project",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"project-id","project-id",206449307),project_id], null)], null));
}),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"secondary","secondary",-669381460)], null),"Back to Project");
var G__41938 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.lean-canvas-builder:170"], null),G__41938], 0));
} else {
return G__41938;
}
})(),ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return alert("Export to PDF coming soon!");
}),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"primary","primary",817773892)], null),"Export PDF \uD83D\uDCC4"),ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["project",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"project-id","project-id",206449307),project_id], null),"mvp"], null));
}),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"primary","primary",817773892)], null),"Plan MVP \u2192")], null),new cljs.core.Keyword(null,".completion-actions",".completion-actions",-154906479))], null),new cljs.core.Keyword(null,".completion-state",".completion-state",59901358)):com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.canvas_components.lean_canvas(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"sections","sections",-886710106),ouroboros.frontend.ui.pages.lean_canvas_builder.lean_canvas_blocks,new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.vals(notes_map),new cljs.core.Keyword(null,"on-item-add","on-item-add",216530268),(function (block_key){
var block_config = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__41864_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(p1__41864_SHARP_),block_key);
}),ouroboros.frontend.ui.pages.lean_canvas_builder.lean_canvas_blocks));
var content = prompt(["Add note to ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(block_config)),":"].join(''));
if(cljs.core.seq(content)){
return com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__41962 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"session-id","session-id",-1147060351),new cljs.core.Keyword("session","id","session/id",604977054).cljs$core$IFn$_invoke$arity$1(session_data),new cljs.core.Keyword(null,"block-key","block-key",929447377),block_key,new cljs.core.Keyword(null,"content","content",15833224),content,new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(block_config)], null);
return (ouroboros.frontend.ui.pages.lean_canvas_builder.add_canvas_note.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.pages.lean_canvas_builder.add_canvas_note.cljs$core$IFn$_invoke$arity$1(G__41962) : ouroboros.frontend.ui.pages.lean_canvas_builder.add_canvas_note.call(null, G__41962));
})()], null));
} else {
return null;
}
})], null));
var G__41964 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.lean-canvas-builder:185"], null),G__41964], 0));
} else {
return G__41964;
}
})()], null),new cljs.core.Keyword(null,".canvas-container",".canvas-container",1990259081)))], null),new cljs.core.Keyword(null,".builder-page",".builder-page",2097984029));
}
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.lean_canvas_builder !== 'undefined') && (typeof ouroboros.frontend.ui.pages.lean_canvas_builder.LeanCanvasBuilderPage !== 'undefined')){
} else {
/**
 * Lean Canvas builder with visual business model interface
 * @constructor
 */
ouroboros.frontend.ui.pages.lean_canvas_builder.LeanCanvasBuilderPage = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42009,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.lean_canvas_builder.LeanCanvasBuilderPage,new cljs.core.Keyword("ouroboros.frontend.ui.pages.lean-canvas-builder","LeanCanvasBuilderPage","ouroboros.frontend.ui.pages.lean-canvas-builder/LeanCanvasBuilderPage",1182347395),options__36450__auto___42009);

//# sourceMappingURL=ouroboros.frontend.ui.pages.lean_canvas_builder.js.map
