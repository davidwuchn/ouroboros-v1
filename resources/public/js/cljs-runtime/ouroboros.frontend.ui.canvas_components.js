goog.provide('ouroboros.frontend.ui.canvas_components');
/**
 * Update a canvas item's position or content
 */
ouroboros.frontend.ui.canvas_components.update_canvas_item = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.canvas-components","update-canvas-item","ouroboros.frontend.ui.canvas-components/update-canvas-item",-1535177952,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.canvas-components","update-canvas-item","ouroboros.frontend.ui.canvas-components/update-canvas-item",-1535177952,null),(function (fulcro_mutation_env_symbol){
var map__40526 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__40526__$1 = cljs.core.__destructure_map(map__40526);
var item_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40526__$1,new cljs.core.Keyword(null,"item-id","item-id",-1804511607));
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40526__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$canvas_components$action(p__40527){
var map__40528 = p__40527;
var map__40528__$1 = cljs.core.__destructure_map(map__40528);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40528__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__40529_40909 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__40530_40910 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__40530_40910);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("canvas","items","canvas/items",216526562),item_id], null),cljs.core.merge,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([updates], 0));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__40529_40909);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__40531 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__40532 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__40532);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__40531);
}})], null);
}));
/**
 * Add a new item to the canvas
 */
ouroboros.frontend.ui.canvas_components.add_canvas_item = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.canvas-components","add-canvas-item","ouroboros.frontend.ui.canvas-components/add-canvas-item",-152337809,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.canvas-components","add-canvas-item","ouroboros.frontend.ui.canvas-components/add-canvas-item",-152337809,null),(function (fulcro_mutation_env_symbol){
var map__40533 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__40533__$1 = cljs.core.__destructure_map(map__40533);
var section_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40533__$1,new cljs.core.Keyword(null,"section-key","section-key",-932493555));
var item = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40533__$1,new cljs.core.Keyword(null,"item","item",249373802));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$canvas_components$action(p__40534){
var map__40535 = p__40534;
var map__40535__$1 = cljs.core.__destructure_map(map__40535);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40535__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__40536_40912 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__40537_40913 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__40537_40913);

try{var new_id_40914 = [cljs.core.name(section_key),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.random_uuid())].join('');
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("canvas","items","canvas/items",216526562),new_id_40914], null),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(item,new cljs.core.Keyword("item","id","item/id",-1385287903),new_id_40914,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("item","section","item/section",-301090499),section_key], 0)));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__40536_40912);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__40542 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__40543 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__40543);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__40542);
}})], null);
}));
/**
 * Remove an item from the canvas
 */
ouroboros.frontend.ui.canvas_components.remove_canvas_item = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("ouroboros.frontend.ui.canvas-components","remove-canvas-item","ouroboros.frontend.ui.canvas-components/remove-canvas-item",-1968482223,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("ouroboros.frontend.ui.canvas-components","remove-canvas-item","ouroboros.frontend.ui.canvas-components/remove-canvas-item",-1968482223,null),(function (fulcro_mutation_env_symbol){
var map__40548 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__40548__$1 = cljs.core.__destructure_map(map__40548);
var item_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40548__$1,new cljs.core.Keyword(null,"item-id","item-id",-1804511607));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function ouroboros$frontend$ui$canvas_components$action(p__40549){
var map__40550 = p__40549;
var map__40550__$1 = cljs.core.__destructure_map(map__40550);
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40550__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__40551_40919 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__40552_40920 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__40552_40920);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.update,new cljs.core.Keyword("canvas","items","canvas/items",216526562),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([item_id], 0));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__40551_40919);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__40559 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__40560 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__40560);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__40559);
}})], null);
}));

var options__36450__auto___40923 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$canvas_components$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("item","id","item/id",-1385287903),new cljs.core.Keyword("item","content","item/content",12582251),new cljs.core.Keyword("item","color","item/color",1017015604),new cljs.core.Keyword("item","section","item/section",-301090499),new cljs.core.Keyword("item","position","item/position",-2025529535)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$canvas_components$ident_STAR_(_,props){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("item","id","item/id",-1385287903),new cljs.core.Keyword("item","id","item/id",-1385287903).cljs$core$IFn$_invoke$arity$1(props)], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$canvas_components$render_StickyNote(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__40572 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__40572__$1 = cljs.core.__destructure_map(map__40572);
var props = map__40572__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40572__$1,new cljs.core.Keyword("item","id","item/id",-1385287903));
var content = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40572__$1,new cljs.core.Keyword("item","content","item/content",12582251));
var color = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40572__$1,new cljs.core.Keyword("item","color","item/color",1017015604));
var section = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40572__$1,new cljs.core.Keyword("item","section","item/section",-301090499));
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40572__$1,new cljs.core.Keyword("item","position","item/position",-2025529535));
var is_editing_QMARK_ = com.fulcrologic.fulcro.components.get_state(this$,new cljs.core.Keyword(null,"editing?","editing?",1646440800),false);
var edit_content = (function (){var or__5002__auto__ = com.fulcrologic.fulcro.components.get_state.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.Keyword(null,"edit-content","edit-content",832233002));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return content;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:56"], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"className","className",-1983287057),["sticky-note sticky-note-",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5002__auto__ = color;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "yellow";
}
})())].join(''),new cljs.core.Keyword(null,"data-item-id","data-item-id",-1006829641),id,new cljs.core.Keyword(null,"data-section","data-section",-274412765),section,new cljs.core.Keyword(null,"style","style",-496642736),(cljs.core.truth_(position)?new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"position","position",-2011731912),"absolute",new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(position)),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(position)),"px"].join('')], null):null)], null)], 0)),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"className": "sticky-note-handle drag-handle", "title": "Drag to move", "data-fulcro-source": "ouroboros.frontend.ui.canvas-components:65"}),"\u22EE\u22EE"]),(cljs.core.truth_(is_editing_QMARK_)?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("textarea",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:71"], null),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"className","className",-1983287057),"sticky-note-input",new cljs.core.Keyword(null,"value","value",305978217),edit_content,new cljs.core.Keyword(null,"autoFocus","autoFocus",-552622425),true,new cljs.core.Keyword(null,"onChange","onChange",-312891301),(function (p1__40563_SHARP_){
return com.fulcrologic.fulcro.components.set_state_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"edit-content","edit-content",832233002),p1__40563_SHARP_.target.value], null));
}),new cljs.core.Keyword(null,"onBlur","onBlur",229342509),(function (){
com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__40586 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"item-id","item-id",-1804511607),id,new cljs.core.Keyword(null,"updates","updates",2013983452),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("item","content","item/content",12582251),edit_content], null)], null);
return (ouroboros.frontend.ui.canvas_components.update_canvas_item.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.update_canvas_item.cljs$core$IFn$_invoke$arity$1(G__40586) : ouroboros.frontend.ui.canvas_components.update_canvas_item.call(null, G__40586));
})()], null));

return com.fulcrologic.fulcro.components.set_state_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editing?","editing?",1646440800),false], null));
}),new cljs.core.Keyword(null,"onKeyDown","onKeyDown",648902330),(function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Enter",e.key)){
if(cljs.core.truth_(e.shiftKey)){
e.preventDefault();

com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__40595 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"item-id","item-id",-1804511607),id,new cljs.core.Keyword(null,"updates","updates",2013983452),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("item","content","item/content",12582251),edit_content], null)], null);
return (ouroboros.frontend.ui.canvas_components.update_canvas_item.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.update_canvas_item.cljs$core$IFn$_invoke$arity$1(G__40595) : ouroboros.frontend.ui.canvas_components.update_canvas_item.call(null, G__40595));
})()], null));

return com.fulcrologic.fulcro.components.set_state_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editing?","editing?",1646440800),false], null));
} else {
return null;
}
} else {
return null;
}
})], null)], 0))], null),null):com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:89"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"className","className",-1983287057),"sticky-note-content",new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (){
return com.fulcrologic.fulcro.components.set_state_BANG_(this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editing?","editing?",1646440800),true], null),new cljs.core.Keyword(null,"edit-content","edit-content",832233002),content);
})], null)], 0)),(function (){var or__5002__auto__ = content;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "Click to edit...";
}
})()], null),null)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("button",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:96"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"className","className",-1983287057),"sticky-note-delete",new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (){
return com.fulcrologic.fulcro.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__40603 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"item-id","item-id",-1804511607),id], null);
return (ouroboros.frontend.ui.canvas_components.remove_canvas_item.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.remove_canvas_item.cljs$core$IFn$_invoke$arity$1(G__40603) : ouroboros.frontend.ui.canvas_components.remove_canvas_item.call(null, G__40603));
})()], null));
}),new cljs.core.Keyword(null,"title","title",636505583),"Delete"], null)], 0)),"\u00D7"], null),null);
var G__40604 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:95"], null),G__40604], 0));
} else {
return G__40604;
}
})()], null),new cljs.core.Keyword(null,".sticky-note-actions",".sticky-note-actions",1226954421))], null),null);
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.canvas_components !== 'undefined') && (typeof ouroboros.frontend.ui.canvas_components.StickyNote !== 'undefined')){
} else {
/**
 * Visual sticky note component with drag handle and edit capability
 * @constructor
 */
ouroboros.frontend.ui.canvas_components.StickyNote = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___40923,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.canvas_components.StickyNote,new cljs.core.Keyword("ouroboros.frontend.ui.canvas-components","StickyNote","ouroboros.frontend.ui.canvas-components/StickyNote",354767192),options__36450__auto___40923);
ouroboros.frontend.ui.canvas_components.ui_sticky_note = com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.canvas_components.StickyNote,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keyfn","keyfn",780060332),new cljs.core.Keyword("item","id","item/id",-1385287903)], null));

var options__36450__auto___40941 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$canvas_components$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("section","key","section/key",674400130),new cljs.core.Keyword("section","title","section/title",-1170157300),new cljs.core.Keyword("section","description","section/description",1367696501),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("section","items","section/items",-1343035275),com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.canvas_components.StickyNote)], null),new cljs.core.Keyword("section","editable?","section/editable?",399711016)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$canvas_components$ident_STAR_(this$,p__40641){
var map__40642 = p__40641;
var map__40642__$1 = cljs.core.__destructure_map(map__40642);
var props = map__40642__$1;
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40642__$1,new cljs.core.Keyword("section","key","section/key",674400130));
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40642__$1,new cljs.core.Keyword("section","title","section/title",-1170157300));
var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40642__$1,new cljs.core.Keyword("section","description","section/description",1367696501));
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40642__$1,new cljs.core.Keyword("section","items","section/items",-1343035275));
var editable_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40642__$1,new cljs.core.Keyword("section","editable?","section/editable?",399711016));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("section","key","section/key",674400130),new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(props)], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$canvas_components$render_CanvasSection(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__40652 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__40652__$1 = cljs.core.__destructure_map(map__40652);
var props = map__40652__$1;
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40652__$1,new cljs.core.Keyword("section","key","section/key",674400130));
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40652__$1,new cljs.core.Keyword("section","title","section/title",-1170157300));
var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40652__$1,new cljs.core.Keyword("section","description","section/description",1367696501));
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40652__$1,new cljs.core.Keyword("section","items","section/items",-1343035275));
var editable_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40652__$1,new cljs.core.Keyword("section","editable?","section/editable?",399711016));
var on_add_item = (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400)) : com.fulcrologic.fulcro.components.computed.call(null, this$,new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400)));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:116"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"className","className",-1983287057),["canvas-section canvas-section-",cljs.core.name(key)].join(''),new cljs.core.Keyword(null,"data-section","data-section",-274412765),key], null)], 0)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("h3",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = title;
var G__40665 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:121"], null),G__40665], 0));
} else {
return G__40665;
}
})()], null),new cljs.core.Keyword(null,".canvas-section-title",".canvas-section-title",661185110));
var G__40675 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:120"], null),G__40675], 0));
} else {
return G__40675;
}
})(),(cljs.core.truth_(description)?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("p",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = description;
var G__40676 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:123"], null),G__40676], 0));
} else {
return G__40676;
}
})()], null),new cljs.core.Keyword(null,".canvas-section-description",".canvas-section-description",-1417240410)):null)], null),new cljs.core.Keyword(null,".canvas-section-header",".canvas-section-header",514057579)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:125"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"className","className",-1983287057),"canvas-section-content",new cljs.core.Keyword(null,"data-drop-zone","data-drop-zone",536838484),key], null)], 0)),((cljs.core.seq(items))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.canvas_components.ui_sticky_note,items):com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.canvas-components:130", "className": "canvas-section-empty"}),"Drop items here or click + to add"]))], null),null),(cljs.core.truth_(editable_QMARK_)?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("button",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:134"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"className","className",-1983287057),"btn btn-sm btn-add",new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (){
if(cljs.core.truth_(on_add_item)){
return (on_add_item.cljs$core$IFn$_invoke$arity$1 ? on_add_item.cljs$core$IFn$_invoke$arity$1(key) : on_add_item.call(null, key));
} else {
return null;
}
})], null)], 0)),"+ Add Note"], null),null);
var G__40681 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:133"], null),G__40681], 0));
} else {
return G__40681;
}
})()], null),new cljs.core.Keyword(null,".canvas-section-actions",".canvas-section-actions",1223160202)):null)], null),null);
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.canvas_components !== 'undefined') && (typeof ouroboros.frontend.ui.canvas_components.CanvasSection !== 'undefined')){
} else {
/**
 * A section of the canvas with header and drop zone
 * @constructor
 */
ouroboros.frontend.ui.canvas_components.CanvasSection = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___40941,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.canvas_components.CanvasSection,new cljs.core.Keyword("ouroboros.frontend.ui.canvas-components","CanvasSection","ouroboros.frontend.ui.canvas-components/CanvasSection",676004897),options__36450__auto___40941);
ouroboros.frontend.ui.canvas_components.ui_canvas_section = com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.canvas_components.CanvasSection,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keyfn","keyfn",780060332),new cljs.core.Keyword("section","key","section/key",674400130)], null));
/**
 * Define the 6 empathy map sections
 */
ouroboros.frontend.ui.canvas_components.empathy_map_sections = (function ouroboros$frontend$ui$canvas_components$empathy_map_sections(){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"persona","persona",-908887662),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDC64 Persona",new cljs.core.Keyword(null,"description","description",-1428560544),"Who is your customer?",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"persona",new cljs.core.Keyword(null,"color","color",1011675173),"blue"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"think-feel","think-feel",-1744190610),new cljs.core.Keyword(null,"title","title",636505583),"\uD83E\uDDE0 Think & Feel",new cljs.core.Keyword(null,"description","description",-1428560544),"Internal world: hopes, fears, dreams",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"think-feel",new cljs.core.Keyword(null,"color","color",1011675173),"pink"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"hear","hear",992369902),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDC42 Hear",new cljs.core.Keyword(null,"description","description",-1428560544),"External influences",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"hear",new cljs.core.Keyword(null,"color","color",1011675173),"green"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"see","see",148135546),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDC41\uFE0F See",new cljs.core.Keyword(null,"description","description",-1428560544),"Environment and market",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"see",new cljs.core.Keyword(null,"color","color",1011675173),"yellow"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"say-do","say-do",-1819531531),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDCAC Say & Do",new cljs.core.Keyword(null,"description","description",-1428560544),"Public behavior",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"say-do",new cljs.core.Keyword(null,"color","color",1011675173),"orange"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"pains-gains","pains-gains",-420992494),new cljs.core.Keyword(null,"title","title",636505583),"\u26A1 Pains & Gains",new cljs.core.Keyword(null,"description","description",-1428560544),"Frustrations and desires",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"pains-gains",new cljs.core.Keyword(null,"color","color",1011675173),"purple"], null)], null);
});

var options__36450__auto___40984 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$canvas_components$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("canvas","sections","canvas/sections",497241358),com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.canvas_components.CanvasSection)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("canvas","items","canvas/items",216526562),com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.canvas_components.StickyNote)], null)], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$canvas_components$render_EmpathyMapCanvas(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__40713 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__40713__$1 = cljs.core.__destructure_map(map__40713);
var props = map__40713__$1;
var sections = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40713__$1,new cljs.core.Keyword("canvas","sections","canvas/sections",497241358));
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40713__$1,new cljs.core.Keyword("canvas","items","canvas/items",216526562));
var on_item_add_40987 = (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.Keyword(null,"on-item-add","on-item-add",216530268)) : com.fulcrologic.fulcro.components.computed.call(null, this$,new cljs.core.Keyword(null,"on-item-add","on-item-add",216530268)));
com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var persona_section = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40688_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40688_SHARP_),new cljs.core.Keyword(null,"persona","persona",-908887662));
}),sections));
if(cljs.core.truth_(persona_section)){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40721 = (function (){var G__40722 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(persona_section,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40691_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40691_SHARP_),new cljs.core.Keyword(null,"persona","persona",-908887662));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true], 0));
var G__40723 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add_40987], null);
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__40722,G__40723) : com.fulcrologic.fulcro.components.computed.call(null, G__40722,G__40723));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40721) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40721));
})();
var G__40734 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:173"], null),G__40734], 0));
} else {
return G__40734;
}
})()], null),new cljs.core.Keyword(null,".empathy-section-persona",".empathy-section-persona",13358142));
} else {
return null;
}
})();
var G__40740 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:169"], null),G__40740], 0));
} else {
return G__40740;
}
})(),(function (){var think_feel = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40692_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40692_SHARP_),new cljs.core.Keyword(null,"think-feel","think-feel",-1744190610));
}),sections));
if(cljs.core.truth_(think_feel)){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40749 = (function (){var G__40755 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(think_feel,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40693_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40693_SHARP_),new cljs.core.Keyword(null,"think-feel","think-feel",-1744190610));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true], 0));
var G__40756 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add_40987], null);
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__40755,G__40756) : com.fulcrologic.fulcro.components.computed.call(null, G__40755,G__40756));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40749) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40749));
})();
var G__40760 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:182"], null),G__40760], 0));
} else {
return G__40760;
}
})()], null),new cljs.core.Keyword(null,".empathy-section-think-feel",".empathy-section-think-feel",-622109370));
} else {
return null;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var hear = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40695_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40695_SHARP_),new cljs.core.Keyword(null,"hear","hear",992369902));
}),sections));
var see = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40696_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40696_SHARP_),new cljs.core.Keyword(null,"see","see",148135546));
}),sections));
var say_do = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40697_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40697_SHARP_),new cljs.core.Keyword(null,"say-do","say-do",-1819531531));
}),sections));
if(cljs.core.truth_(hear)){
com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40767 = (function (){var G__40768 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(hear,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40698_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40698_SHARP_),new cljs.core.Keyword(null,"hear","hear",992369902));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true], 0));
var G__40769 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add_40987], null);
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__40768,G__40769) : com.fulcrologic.fulcro.components.computed.call(null, G__40768,G__40769));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40767) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40767));
})();
var G__40770 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:194"], null),G__40770], 0));
} else {
return G__40770;
}
})()], null),new cljs.core.Keyword(null,".empathy-section-hear",".empathy-section-hear",-1454076998));
} else {
}

if(cljs.core.truth_(see)){
com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40772 = (function (){var G__40774 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(see,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40701_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40701_SHARP_),new cljs.core.Keyword(null,"see","see",148135546));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true], 0));
var G__40775 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add_40987], null);
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__40774,G__40775) : com.fulcrologic.fulcro.components.computed.call(null, G__40774,G__40775));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40772) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40772));
})();
var G__40776 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:200"], null),G__40776], 0));
} else {
return G__40776;
}
})()], null),new cljs.core.Keyword(null,".empathy-section-see",".empathy-section-see",-1725214895));
} else {
}

if(cljs.core.truth_(say_do)){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40783 = (function (){var G__40785 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(say_do,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40707_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40707_SHARP_),new cljs.core.Keyword(null,"say-do","say-do",-1819531531));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true], 0));
var G__40786 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add_40987], null);
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__40785,G__40786) : com.fulcrologic.fulcro.components.computed.call(null, G__40785,G__40786));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40783) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40783));
})();
var G__40787 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:206"], null),G__40787], 0));
} else {
return G__40787;
}
})()], null),new cljs.core.Keyword(null,".empathy-section-say-do",".empathy-section-say-do",1975200622));
} else {
return null;
}
})();
var G__40794 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:189"], null),G__40794], 0));
} else {
return G__40794;
}
})()], null),new cljs.core.Keyword(null,".empathy-center-column",".empathy-center-column",607033032)),(function (){var pains_gains = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40709_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40709_SHARP_),new cljs.core.Keyword(null,"pains-gains","pains-gains",-420992494));
}),sections));
if(cljs.core.truth_(pains_gains)){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40798 = (function (){var G__40799 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(pains_gains,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40710_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40710_SHARP_),new cljs.core.Keyword(null,"pains-gains","pains-gains",-420992494));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true], 0));
var G__40800 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add_40987], null);
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__40799,G__40800) : com.fulcrologic.fulcro.components.computed.call(null, G__40799,G__40800));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40798) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40798));
})();
var G__40801 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:215"], null),G__40801], 0));
} else {
return G__40801;
}
})()], null),new cljs.core.Keyword(null,".empathy-section-pains-gains",".empathy-section-pains-gains",1356203560));
} else {
return null;
}
})()], null),new cljs.core.Keyword(null,".empathy-map-grid",".empathy-map-grid",-1187949917));
var G__40802 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:167"], null),G__40802], 0));
} else {
return G__40802;
}
})()], null),new cljs.core.Keyword(null,".empathy-map-canvas",".empathy-map-canvas",1940863572));

return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["span",({"data-fulcro-source": "ouroboros.frontend.ui.canvas-components:224", "className": "legend-color legend-blue"})]);
var G__40803 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:223"], null),G__40803], 0));
} else {
return G__40803;
}
})(),"Person"], null),new cljs.core.Keyword(null,".legend-item",".legend-item",1464132142));
var G__40804 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:222"], null),G__40804], 0));
} else {
return G__40804;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["span",({"data-fulcro-source": "ouroboros.frontend.ui.canvas-components:226", "className": "legend-color legend-pink"})]);
var G__40805 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:225"], null),G__40805], 0));
} else {
return G__40805;
}
})(),"Internal"], null),new cljs.core.Keyword(null,".legend-item",".legend-item",1464132142)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["span",({"data-fulcro-source": "ouroboros.frontend.ui.canvas-components:228", "className": "legend-color legend-green"})]);
var G__40806 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:227"], null),G__40806], 0));
} else {
return G__40806;
}
})(),"External"], null),new cljs.core.Keyword(null,".legend-item",".legend-item",1464132142)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["span",({"data-fulcro-source": "ouroboros.frontend.ui.canvas-components:230", "className": "legend-color legend-yellow"})]);
var G__40807 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:229"], null),G__40807], 0));
} else {
return G__40807;
}
})(),"Environment"], null),new cljs.core.Keyword(null,".legend-item",".legend-item",1464132142)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["span",({"data-fulcro-source": "ouroboros.frontend.ui.canvas-components:232", "className": "legend-color legend-orange"})]);
var G__40808 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:231"], null),G__40808], 0));
} else {
return G__40808;
}
})(),"Behavior"], null),new cljs.core.Keyword(null,".legend-item",".legend-item",1464132142)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["span",({"data-fulcro-source": "ouroboros.frontend.ui.canvas-components:234", "className": "legend-color legend-purple"})]);
var G__40809 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:233"], null),G__40809], 0));
} else {
return G__40809;
}
})(),"Motivation"], null),new cljs.core.Keyword(null,".legend-item",".legend-item",1464132142))], null),new cljs.core.Keyword(null,".empathy-map-legend",".empathy-map-legend",-594047029));
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.canvas_components !== 'undefined') && (typeof ouroboros.frontend.ui.canvas_components.EmpathyMapCanvas !== 'undefined')){
} else {
/**
 * Visual empathy map with 2x3 grid layout
 * @constructor
 */
ouroboros.frontend.ui.canvas_components.EmpathyMapCanvas = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___40984,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.canvas_components.EmpathyMapCanvas,new cljs.core.Keyword("ouroboros.frontend.ui.canvas-components","EmpathyMapCanvas","ouroboros.frontend.ui.canvas-components/EmpathyMapCanvas",934954985),options__36450__auto___40984);
/**
 * Define the 9 Lean Canvas sections
 */
ouroboros.frontend.ui.canvas_components.lean_canvas_sections = (function ouroboros$frontend$ui$canvas_components$lean_canvas_sections(){
return new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"problems","problems",2097327077),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDE2B Problems",new cljs.core.Keyword(null,"description","description",-1428560544),"Top 3 customer problems",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"problems",new cljs.core.Keyword(null,"color","color",1011675173),"red"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"solution","solution",-1727231491),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDCA1 Solution",new cljs.core.Keyword(null,"description","description",-1428560544),"How you solve them",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"solution",new cljs.core.Keyword(null,"color","color",1011675173),"green"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"uvp","uvp",-1489127703),new cljs.core.Keyword(null,"title","title",636505583),"\u2728 UVP",new cljs.core.Keyword(null,"description","description",-1428560544),"Unique Value Proposition",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"uvp",new cljs.core.Keyword(null,"color","color",1011675173),"purple"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"unfair-advantage","unfair-advantage",1693371236),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDEE1\uFE0F Unfair Advantage",new cljs.core.Keyword(null,"description","description",-1428560544),"Cannot be copied",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"unfair-advantage",new cljs.core.Keyword(null,"color","color",1011675173),"gold"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"customer-segments","customer-segments",-393478998),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDC65 Customer Segments",new cljs.core.Keyword(null,"description","description",-1428560544),"Target customers",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"customer-segments",new cljs.core.Keyword(null,"color","color",1011675173),"blue"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"key-metrics","key-metrics",859160814),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDCCA Key Metrics",new cljs.core.Keyword(null,"description","description",-1428560544),"What you measure",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"key-metrics",new cljs.core.Keyword(null,"color","color",1011675173),"teal"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"channels","channels",1132759174),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDCE2 Channels",new cljs.core.Keyword(null,"description","description",-1428560544),"How you reach customers",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"channels",new cljs.core.Keyword(null,"color","color",1011675173),"orange"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"cost-structure","cost-structure",-1168471561),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDCB0 Cost Structure",new cljs.core.Keyword(null,"description","description",-1428560544),"Fixed & variable costs",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"cost-structure",new cljs.core.Keyword(null,"color","color",1011675173),"pink"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"revenue-streams","revenue-streams",-1450897798),new cljs.core.Keyword(null,"title","title",636505583),"\uD83D\uDCB5 Revenue Streams",new cljs.core.Keyword(null,"description","description",-1428560544),"How you make money",new cljs.core.Keyword(null,"grid-area","grid-area",-1829717451),"revenue-streams",new cljs.core.Keyword(null,"color","color",1011675173),"green"], null)], null);
});

var options__36450__auto___41042 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$canvas_components$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("canvas","sections","canvas/sections",497241358),com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.canvas_components.CanvasSection)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("canvas","items","canvas/items",216526562),com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.canvas_components.StickyNote)], null)], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$canvas_components$render_LeanCanvas(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__40828 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__40828__$1 = cljs.core.__destructure_map(map__40828);
var props = map__40828__$1;
var sections = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40828__$1,new cljs.core.Keyword("canvas","sections","canvas/sections",497241358));
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40828__$1,new cljs.core.Keyword("canvas","items","canvas/items",216526562));
var on_item_add = (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.Keyword(null,"on-item-add","on-item-add",216530268)) : com.fulcrologic.fulcro.components.computed.call(null, this$,new cljs.core.Keyword(null,"on-item-add","on-item-add",216530268)));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var problems = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40810_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40810_SHARP_),new cljs.core.Keyword(null,"problems","problems",2097327077));
}),sections));
if(cljs.core.truth_(problems)){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40829 = (function (){var G__40830 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(problems,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40811_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40811_SHARP_),new cljs.core.Keyword(null,"problems","problems",2097327077));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true], 0));
var G__40831 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add], null);
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__40830,G__40831) : com.fulcrologic.fulcro.components.computed.call(null, G__40830,G__40831));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40829) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40829));
})();
var G__40832 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:273"], null),G__40832], 0));
} else {
return G__40832;
}
})()], null),new cljs.core.Keyword(null,".canvas-box.canvas-problems",".canvas-box.canvas-problems",-2030340124));
} else {
return null;
}
})();
var G__40833 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:269"], null),G__40833], 0));
} else {
return G__40833;
}
})(),(function (){var solution = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40812_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40812_SHARP_),new cljs.core.Keyword(null,"solution","solution",-1727231491));
}),sections));
if(cljs.core.truth_(solution)){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40834 = (function (){var G__40835 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(solution,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40813_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40813_SHARP_),new cljs.core.Keyword(null,"solution","solution",-1727231491));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true], 0));
var G__40836 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add], null);
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__40835,G__40836) : com.fulcrologic.fulcro.components.computed.call(null, G__40835,G__40836));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40834) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40834));
})();
var G__40837 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:281"], null),G__40837], 0));
} else {
return G__40837;
}
})()], null),new cljs.core.Keyword(null,".canvas-box.canvas-solution",".canvas-box.canvas-solution",-1713854559));
} else {
return null;
}
})(),(function (){var uvp = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40814_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40814_SHARP_),new cljs.core.Keyword(null,"uvp","uvp",-1489127703));
}),sections));
if(cljs.core.truth_(uvp)){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40838 = (function (){var G__40839 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(uvp,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40815_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40815_SHARP_),new cljs.core.Keyword(null,"uvp","uvp",-1489127703));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true], 0));
var G__40840 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add], null);
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__40839,G__40840) : com.fulcrologic.fulcro.components.computed.call(null, G__40839,G__40840));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40838) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40838));
})();
var G__40841 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:289"], null),G__40841], 0));
} else {
return G__40841;
}
})()], null),new cljs.core.Keyword(null,".canvas-box.canvas-uvp",".canvas-box.canvas-uvp",-757808767));
} else {
return null;
}
})(),(function (){var unfair = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40816_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40816_SHARP_),new cljs.core.Keyword(null,"unfair-advantage","unfair-advantage",1693371236));
}),sections));
if(cljs.core.truth_(unfair)){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40842 = (function (){var G__40843 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(unfair,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40817_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40817_SHARP_),new cljs.core.Keyword(null,"unfair-advantage","unfair-advantage",1693371236));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true], 0));
var G__40844 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add], null);
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__40843,G__40844) : com.fulcrologic.fulcro.components.computed.call(null, G__40843,G__40844));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40842) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40842));
})();
var G__40845 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:297"], null),G__40845], 0));
} else {
return G__40845;
}
})()], null),new cljs.core.Keyword(null,".canvas-box.canvas-unfair-advantage",".canvas-box.canvas-unfair-advantage",-1585914488));
} else {
return null;
}
})(),(function (){var segments = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40818_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40818_SHARP_),new cljs.core.Keyword(null,"customer-segments","customer-segments",-393478998));
}),sections));
if(cljs.core.truth_(segments)){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40846 = (function (){var G__40847 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(segments,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40819_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40819_SHARP_),new cljs.core.Keyword(null,"customer-segments","customer-segments",-393478998));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true], 0));
var G__40848 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add], null);
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__40847,G__40848) : com.fulcrologic.fulcro.components.computed.call(null, G__40847,G__40848));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40846) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40846));
})();
var G__40849 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:306"], null),G__40849], 0));
} else {
return G__40849;
}
})()], null),new cljs.core.Keyword(null,".canvas-box.canvas-customer-segments",".canvas-box.canvas-customer-segments",-347593693));
} else {
return null;
}
})(),(function (){var metrics = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40820_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40820_SHARP_),new cljs.core.Keyword(null,"key-metrics","key-metrics",859160814));
}),sections));
if(cljs.core.truth_(metrics)){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40850 = (function (){var G__40851 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(metrics,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40821_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40821_SHARP_),new cljs.core.Keyword(null,"key-metrics","key-metrics",859160814));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true], 0));
var G__40852 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add], null);
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__40851,G__40852) : com.fulcrologic.fulcro.components.computed.call(null, G__40851,G__40852));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40850) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40850));
})();
var G__40853 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:314"], null),G__40853], 0));
} else {
return G__40853;
}
})()], null),new cljs.core.Keyword(null,".canvas-box.canvas-key-metrics",".canvas-box.canvas-key-metrics",-1316603086));
} else {
return null;
}
})(),(function (){var channels = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40822_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40822_SHARP_),new cljs.core.Keyword(null,"channels","channels",1132759174));
}),sections));
if(cljs.core.truth_(channels)){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40854 = (function (){var G__40855 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(channels,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40823_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40823_SHARP_),new cljs.core.Keyword(null,"channels","channels",1132759174));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true], 0));
var G__40856 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add], null);
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__40855,G__40856) : com.fulcrologic.fulcro.components.computed.call(null, G__40855,G__40856));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40854) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40854));
})();
var G__40857 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:322"], null),G__40857], 0));
} else {
return G__40857;
}
})()], null),new cljs.core.Keyword(null,".canvas-box.canvas-channels",".canvas-box.canvas-channels",-1136928592));
} else {
return null;
}
})(),(function (){var costs = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40824_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40824_SHARP_),new cljs.core.Keyword(null,"cost-structure","cost-structure",-1168471561));
}),sections));
if(cljs.core.truth_(costs)){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40858 = (function (){var G__40859 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(costs,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40825_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40825_SHARP_),new cljs.core.Keyword(null,"cost-structure","cost-structure",-1168471561));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true], 0));
var G__40860 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add], null);
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$2(G__40859,G__40860) : com.fulcrologic.fulcro.components.computed.call(null, G__40859,G__40860));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40858) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40858));
})();
var G__40861 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:331"], null),G__40861], 0));
} else {
return G__40861;
}
})()], null),new cljs.core.Keyword(null,".canvas-box.canvas-cost-structure",".canvas-box.canvas-cost-structure",2049227914));
} else {
return null;
}
})(),(function (){var revenue = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40826_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("section","key","section/key",674400130).cljs$core$IFn$_invoke$arity$1(p1__40826_SHARP_),new cljs.core.Keyword(null,"revenue-streams","revenue-streams",-1450897798));
}),sections));
if(cljs.core.truth_(revenue)){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (function (){var G__40862 = (function (){var G__40863 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(revenue,new cljs.core.Keyword("section","items","section/items",-1343035275),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40827_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("item","section","item/section",-301090499).cljs$core$IFn$_invoke$arity$1(p1__40827_SHARP_),new cljs.core.Keyword(null,"revenue-streams","revenue-streams",-1450897798));
}),items),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("section","editable?","section/editable?",399711016),true,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-add-item","on-add-item",-1647898400),on_item_add], null)], 0));
return (com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.computed.cljs$core$IFn$_invoke$arity$1(G__40863) : com.fulcrologic.fulcro.components.computed.call(null, G__40863));
})();
return (ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.canvas_components.ui_canvas_section.cljs$core$IFn$_invoke$arity$1(G__40862) : ouroboros.frontend.ui.canvas_components.ui_canvas_section.call(null, G__40862));
})();
var G__40864 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:339"], null),G__40864], 0));
} else {
return G__40864;
}
})()], null),new cljs.core.Keyword(null,".canvas-box.canvas-revenue-streams",".canvas-box.canvas-revenue-streams",801215125));
} else {
return null;
}
})()], null),new cljs.core.Keyword(null,".lean-canvas-grid",".lean-canvas-grid",-2115288813));
var G__40865 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:268"], null),G__40865], 0));
} else {
return G__40865;
}
})()], null),new cljs.core.Keyword(null,".lean-canvas-container",".lean-canvas-container",701188109));
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.canvas_components !== 'undefined') && (typeof ouroboros.frontend.ui.canvas_components.LeanCanvas !== 'undefined')){
} else {
/**
 * Visual Lean Canvas with business model layout
 * @constructor
 */
ouroboros.frontend.ui.canvas_components.LeanCanvas = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___41042,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.canvas_components.LeanCanvas,new cljs.core.Keyword("ouroboros.frontend.ui.canvas-components","LeanCanvas","ouroboros.frontend.ui.canvas-components/LeanCanvas",-1862975715),options__36450__auto___41042);
/**
 * SVG line connecting two elements
 */
ouroboros.frontend.ui.canvas_components.connection_line = (function ouroboros$frontend$ui$canvas_components$connection_line(p__40866){
var map__40867 = p__40866;
var map__40867__$1 = cljs.core.__destructure_map(map__40867);
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40867__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var to = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40867__$1,new cljs.core.Keyword(null,"to","to",192099007));
var color = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40867__$1,new cljs.core.Keyword(null,"color","color",1011675173));
var style = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40867__$1,new cljs.core.Keyword(null,"style","style",-496642736));
var color__$1 = (function (){var or__5002__auto__ = color;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "#999";
}
})();
var style__$1 = (function (){var or__5002__auto__ = style;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "solid";
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["svg",({"className": "connection-line", "style": ({"position": "absolute", "top": (0), "left": (0), "width": "100%", "height": "100%", "pointerEvents": "none", "zIndex": (1)}), "data-fulcro-source": "ouroboros.frontend.ui.canvas-components:354"}),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("line",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:361"], null),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"x1","x1",-1863922247),new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(from),new cljs.core.Keyword(null,"y1","y1",589123466),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(from),new cljs.core.Keyword(null,"x2","x2",-1362513475),new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(to),new cljs.core.Keyword(null,"y2","y2",-718691301),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(to),new cljs.core.Keyword(null,"stroke","stroke",1741823555),color__$1,new cljs.core.Keyword(null,"strokeWidth","strokeWidth",-2130848332),(2),new cljs.core.Keyword(null,"strokeDasharray","strokeDasharray",1664678421),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(style__$1,"dashed"))?"5,5":null)], null)], 0))], null),null))]);
});

var options__36450__auto___41108 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$canvas_components$render_UserCursor(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__40869 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__40869__$1 = cljs.core.__destructure_map(map__40869);
var user_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40869__$1,new cljs.core.Keyword(null,"user-id","user-id",-206822291));
var user_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40869__$1,new cljs.core.Keyword(null,"user-name","user-name",1302913545));
var color = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40869__$1,new cljs.core.Keyword(null,"color","color",1011675173));
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40869__$1,new cljs.core.Keyword(null,"position","position",-2011731912));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:375"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"className","className",-1983287057),"user-cursor",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"position","position",-2011731912),"absolute",new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(position)),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(position)),"px"].join(''),new cljs.core.Keyword(null,"zIndex","zIndex",-1588341609),(1000)], null)], null)], 0)),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["svg",({"width": (24), "height": (24), "viewBox": "0 0 24 24", "data-fulcro-source": "ouroboros.frontend.ui.canvas-components:381"}),com.fulcrologic.fulcro.components.force_children(com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("path",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:383"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"d","d",1972142424),"M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.87a.5.5 0 00.35-.85L6.35 2.85a.5.5 0 00-.85.36z",new cljs.core.Keyword(null,"fill","fill",883462889),color], null)], 0))], null),null))]),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:386"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"className","className",-1983287057),"cursor-label",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),color], null)], null)], 0)),user_name], null),null)], null),null);
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.canvas_components !== 'undefined') && (typeof ouroboros.frontend.ui.canvas_components.UserCursor !== 'undefined')){
} else {
/**
 * Display another user's cursor position
 * @constructor
 */
ouroboros.frontend.ui.canvas_components.UserCursor = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___41108,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.canvas_components.UserCursor,new cljs.core.Keyword("ouroboros.frontend.ui.canvas-components","UserCursor","ouroboros.frontend.ui.canvas-components/UserCursor",-357538603),options__36450__auto___41108);
/**
 * Toolbar for canvas actions
 */
ouroboros.frontend.ui.canvas_components.canvas_toolbar = (function ouroboros$frontend$ui$canvas_components$canvas_toolbar(p__40872){
var map__40874 = p__40872;
var map__40874__$1 = cljs.core.__destructure_map(map__40874);
var on_export = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40874__$1,new cljs.core.Keyword(null,"on-export","on-export",1803619391));
var on_share = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40874__$1,new cljs.core.Keyword(null,"on-share","on-share",732084173));
var on_present = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40874__$1,new cljs.core.Keyword(null,"on-present","on-present",966369426));
var on_clear = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40874__$1,new cljs.core.Keyword(null,"on-clear","on-clear",2009781891));
var can_undo_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40874__$1,new cljs.core.Keyword(null,"can-undo?","can-undo?",1175089574));
var can_redo_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40874__$1,new cljs.core.Keyword(null,"can-redo?","can-redo?",1502250971));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("button",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:400"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"className","className",-1983287057),"btn btn-sm",new cljs.core.Keyword(null,"onClick","onClick",-1991238530),on_export,new cljs.core.Keyword(null,"title","title",636505583),"Export"], null)], 0)),"\uD83D\uDCE5 Export"], null),null);
var G__40876 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:399"], null),G__40876], 0));
} else {
return G__40876;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("button",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:405"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"className","className",-1983287057),"btn btn-sm",new cljs.core.Keyword(null,"onClick","onClick",-1991238530),on_share,new cljs.core.Keyword(null,"title","title",636505583),"Share"], null)], 0)),"\uD83D\uDD17 Share"], null),null),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("button",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:410"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"className","className",-1983287057),"btn btn-sm",new cljs.core.Keyword(null,"onClick","onClick",-1991238530),on_present,new cljs.core.Keyword(null,"title","title",636505583),"Present"], null)], 0)),"\u25B6 Present"], null),null)], null),new cljs.core.Keyword(null,".canvas-toolbar-group",".canvas-toolbar-group",-726067802));
var G__40879 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:398"], null),G__40879], 0));
} else {
return G__40879;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("button",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:416"], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"className","className",-1983287057),"btn btn-sm",new cljs.core.Keyword(null,"onClick","onClick",-1991238530),on_clear,new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core.not(can_undo_QMARK_),new cljs.core.Keyword(null,"title","title",636505583),"Undo"], null)], 0)),"\u21A9 Undo"], null),null);
var G__40884 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:415"], null),G__40884], 0));
} else {
return G__40884;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("button",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:422"], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"className","className",-1983287057),"btn btn-sm",new cljs.core.Keyword(null,"onClick","onClick",-1991238530),on_clear,new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core.not(can_redo_QMARK_),new cljs.core.Keyword(null,"title","title",636505583),"Redo"], null)], 0)),"\u21AA Redo"], null),null)], null),new cljs.core.Keyword(null,".canvas-toolbar-group",".canvas-toolbar-group",-726067802)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("button",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:429"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"className","className",-1983287057),"btn btn-sm btn-danger",new cljs.core.Keyword(null,"onClick","onClick",-1991238530),on_clear,new cljs.core.Keyword(null,"title","title",636505583),"Clear canvas"], null)], 0)),"\uD83D\uDDD1 Clear"], null),null);
var G__40887 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.canvas-components:428"], null),G__40887], 0));
} else {
return G__40887;
}
})()], null),new cljs.core.Keyword(null,".canvas-toolbar-group",".canvas-toolbar-group",-726067802))], null),new cljs.core.Keyword(null,".canvas-toolbar",".canvas-toolbar",1279493723));
});
/**
 * Export canvas items to JSON
 */
ouroboros.frontend.ui.canvas_components.export_canvas_to_json = (function ouroboros$frontend$ui$canvas_components$export_canvas_to_json(items){
return JSON.stringify(cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"version","version",425292698),"1.0",new cljs.core.Keyword(null,"exported-at","exported-at",1661975683),(new Date()),new cljs.core.Keyword(null,"items","items",1031954938),items], null)),null,(2));
});
/**
 * Trigger download of JSON file
 */
ouroboros.frontend.ui.canvas_components.download_json = (function ouroboros$frontend$ui$canvas_components$download_json(filename,data){
var blob = (new Blob(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [data], null),({"type": "application/json"})));
var url = URL.createObjectURL(blob);
var a = document.createElement("a");
(a.href = url);

(a.download = filename);

a.click();

return URL.revokeObjectURL(url);
});
/**
 * Create a new sticky note item
 */
ouroboros.frontend.ui.canvas_components.create_sticky_note = (function ouroboros$frontend$ui$canvas_components$create_sticky_note(var_args){
var args__5732__auto__ = [];
var len__5726__auto___41140 = arguments.length;
var i__5727__auto___41141 = (0);
while(true){
if((i__5727__auto___41141 < len__5726__auto___41140)){
args__5732__auto__.push((arguments[i__5727__auto___41141]));

var G__41142 = (i__5727__auto___41141 + (1));
i__5727__auto___41141 = G__41142;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return ouroboros.frontend.ui.canvas_components.create_sticky_note.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(ouroboros.frontend.ui.canvas_components.create_sticky_note.cljs$core$IFn$_invoke$arity$variadic = (function (section_key,content,p__40897){
var map__40898 = p__40897;
var map__40898__$1 = cljs.core.__destructure_map(map__40898);
var color = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40898__$1,new cljs.core.Keyword(null,"color","color",1011675173));
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40898__$1,new cljs.core.Keyword(null,"position","position",-2011731912));
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword("item","id","item/id",-1385287903),[cljs.core.name(section_key),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.random_uuid())].join(''),new cljs.core.Keyword("item","content","item/content",12582251),content,new cljs.core.Keyword("item","color","item/color",1017015604),(function (){var or__5002__auto__ = color;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "yellow";
}
})(),new cljs.core.Keyword("item","section","item/section",-301090499),section_key,new cljs.core.Keyword("item","position","item/position",-2025529535),(function (){var or__5002__auto__ = position;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(0)], null);
}
})()], null);
}));

(ouroboros.frontend.ui.canvas_components.create_sticky_note.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(ouroboros.frontend.ui.canvas_components.create_sticky_note.cljs$lang$applyTo = (function (seq40893){
var G__40894 = cljs.core.first(seq40893);
var seq40893__$1 = cljs.core.next(seq40893);
var G__40895 = cljs.core.first(seq40893__$1);
var seq40893__$2 = cljs.core.next(seq40893__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__40894,G__40895,seq40893__$2);
}));

/**
 * Initialize empathy map with default sections
 */
ouroboros.frontend.ui.canvas_components.initialize_empathy_map = (function ouroboros$frontend$ui$canvas_components$initialize_empathy_map(){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("canvas","sections","canvas/sections",497241358),ouroboros.frontend.ui.canvas_components.empathy_map_sections(),new cljs.core.Keyword("canvas","items","canvas/items",216526562),cljs.core.PersistentVector.EMPTY], null);
});
/**
 * Initialize lean canvas with default sections
 */
ouroboros.frontend.ui.canvas_components.initialize_lean_canvas = (function ouroboros$frontend$ui$canvas_components$initialize_lean_canvas(){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("canvas","sections","canvas/sections",497241358),ouroboros.frontend.ui.canvas_components.lean_canvas_sections(),new cljs.core.Keyword("canvas","items","canvas/items",216526562),cljs.core.PersistentVector.EMPTY], null);
});
ouroboros.frontend.ui.canvas_components.empathy_map = ouroboros.frontend.ui.canvas_components.EmpathyMapCanvas;
ouroboros.frontend.ui.canvas_components.lean_canvas = ouroboros.frontend.ui.canvas_components.LeanCanvas;
ouroboros.frontend.ui.canvas_components.sticky_note = ouroboros.frontend.ui.canvas_components.ui_sticky_note;
ouroboros.frontend.ui.canvas_components.canvas_section = ouroboros.frontend.ui.canvas_components.ui_canvas_section;
ouroboros.frontend.ui.canvas_components.toolbar = ouroboros.frontend.ui.canvas_components.canvas_toolbar;

//# sourceMappingURL=ouroboros.frontend.ui.canvas_components.js.map
