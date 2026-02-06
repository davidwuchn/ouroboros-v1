goog.provide('ouroboros.frontend.ui.pages.project_detail');
ouroboros.frontend.ui.pages.project_detail.builder_types = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"empathy-map","empathy-map",1764497187),new cljs.core.Keyword(null,"name","name",1843675177),"Empathy Map",new cljs.core.Keyword(null,"description","description",-1428560544),"Understand your customer's perspective",new cljs.core.Keyword(null,"icon","icon",1679606541),"\uD83E\uDDE0",new cljs.core.Keyword(null,"route","route",329891309),"empathy",new cljs.core.Keyword(null,"sections","sections",-886710106),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Persona","Think & Feel","Hear","See","Say & Do","Pains","Gains"], null)], null),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"value-proposition","value-proposition",2132960810),new cljs.core.Keyword(null,"name","name",1843675177),"Value Proposition",new cljs.core.Keyword(null,"description","description",-1428560544),"Map your product to customer needs",new cljs.core.Keyword(null,"icon","icon",1679606541),"\uD83D\uDC8E",new cljs.core.Keyword(null,"route","route",329891309),"valueprop",new cljs.core.Keyword(null,"sections","sections",-886710106),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Customer Jobs","Pains","Gains","Products","Pain Relievers","Gain Creators"], null)], null),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"mvp-planning","mvp-planning",-167150721),new cljs.core.Keyword(null,"name","name",1843675177),"MVP Planning",new cljs.core.Keyword(null,"description","description",-1428560544),"Define your minimum viable product",new cljs.core.Keyword(null,"icon","icon",1679606541),"\uD83D\uDE80",new cljs.core.Keyword(null,"route","route",329891309),"mvp",new cljs.core.Keyword(null,"sections","sections",-886710106),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Goal","Success Metrics","Features","User Flow","Assumptions","Riskiest"], null)], null),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"lean-canvas","lean-canvas",453352353),new cljs.core.Keyword(null,"name","name",1843675177),"Lean Canvas",new cljs.core.Keyword(null,"description","description",-1428560544),"Complete business model canvas",new cljs.core.Keyword(null,"icon","icon",1679606541),"\uD83D\uDCCA",new cljs.core.Keyword(null,"route","route",329891309),"canvas",new cljs.core.Keyword(null,"sections","sections",-886710106),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Problems","Solution","UVP","Unfair Advantage","Customer Segments","Key Metrics","Channels","Cost Structure","Revenue Streams"], null)], null)], null);

var options__36450__auto___41968 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$project_detail$render_BuilderCard(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__41615 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__41615__$1 = cljs.core.__destructure_map(map__41615);
var builder = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41615__$1,new cljs.core.Keyword(null,"builder","builder",-2055262005));
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41615__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
var map__41623 = builder;
var map__41623__$1 = cljs.core.__destructure_map(map__41623);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41623__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41623__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41623__$1,new cljs.core.Keyword(null,"description","description",-1428560544));
var icon = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41623__$1,new cljs.core.Keyword(null,"icon","icon",1679606541));
var sections = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41623__$1,new cljs.core.Keyword(null,"sections","sections",-886710106));
var route = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41623__$1,new cljs.core.Keyword(null,"route","route",329891309));
return ouroboros.frontend.ui.components.card.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"title","title",636505583),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(icon)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''),new cljs.core.Keyword(null,"className","className",-1983287057),["builder-card builder-",cljs.core.str.cljs$core$IFn$_invoke$arity$1((name.cljs$core$IFn$_invoke$arity$1 ? name.cljs$core$IFn$_invoke$arity$1(key) : name.call(null, key)))].join('')], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = description;
var G__41651 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:47"], null),G__41651], 0));
} else {
return G__41651;
}
})()], null),new cljs.core.Keyword(null,".builder-description",".builder-description",1436711291)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(sections))," sections:"].join('');
var G__41670 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:49"], null),G__41670], 0));
} else {
return G__41670;
}
})()], null),new cljs.core.Keyword(null,".sections-label",".sections-label",1180064784));
var G__41689 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:48"], null),G__41689], 0));
} else {
return G__41689;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("ul",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__41593_SHARP_){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("li",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:51"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),p1__41593_SHARP_], null)], 0)),p1__41593_SHARP_], null),null);
}),cljs.core.take.cljs$core$IFn$_invoke$arity$2((4),sections));
var G__41696 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:50"], null),G__41696], 0));
} else {
return G__41696;
}
})(),(((cljs.core.count(sections) > (4)))?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("li",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ["+",cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.count(sections) - (4)))," more..."].join('');
var G__41707 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:53"], null),G__41707], 0));
} else {
return G__41707;
}
})()], null),null):null)], null),new cljs.core.Keyword(null,".sections-list",".sections-list",-714265123))], null),new cljs.core.Keyword(null,".builder-sections",".builder-sections",1863583101)),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["project",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"project-id","project-id",206449307),project_id], null),route], null));
}),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"primary","primary",817773892)], null),"Start Building");
var G__41711 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:54"], null),G__41711], 0));
} else {
return G__41711;
}
})()], null),new cljs.core.Keyword(null,".builder-actions",".builder-actions",-2113080275))], 0));
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.project_detail !== 'undefined') && (typeof ouroboros.frontend.ui.pages.project_detail.BuilderCard !== 'undefined')){
} else {
/**
 * Card for selecting a builder type
 * @constructor
 */
ouroboros.frontend.ui.pages.project_detail.BuilderCard = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___41968,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.project_detail.BuilderCard,new cljs.core.Keyword("ouroboros.frontend.ui.pages.project-detail","BuilderCard","ouroboros.frontend.ui.pages.project-detail/BuilderCard",-456112765),options__36450__auto___41968);
ouroboros.frontend.ui.pages.project_detail.ui_builder_card = com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.project_detail.BuilderCard,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keyfn","keyfn",780060332),(function (p1__41731_SHARP_){
return new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"builder","builder",-2055262005).cljs$core$IFn$_invoke$arity$1(p1__41731_SHARP_));
})], null));

var options__36450__auto___41994 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$project_detail$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("session","id","session/id",604977054),new cljs.core.Keyword("session","type","session/type",-875663566),new cljs.core.Keyword("session","state","session/state",-64515581),new cljs.core.Keyword("session","updated-at","session/updated-at",-1763703694)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$project_detail$ident_STAR_(_,props){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("session","id","session/id",604977054),new cljs.core.Keyword("session","id","session/id",604977054).cljs$core$IFn$_invoke$arity$1(props)], null);
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$project_detail$render_SessionItem(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__41760 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__41760__$1 = cljs.core.__destructure_map(map__41760);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41760__$1,new cljs.core.Keyword("session","id","session/id",604977054));
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41760__$1,new cljs.core.Keyword("session","type","session/type",-875663566));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41760__$1,new cljs.core.Keyword("session","state","session/state",-64515581));
var updated_at = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41760__$1,new cljs.core.Keyword("session","updated-at","session/updated-at",-1763703694));
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = cljs.core.name(type);
var G__41772 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:73"], null),G__41772], 0));
} else {
return G__41772;
}
})()], null),new cljs.core.Keyword(null,".session-type",".session-type",-1851466157));
var G__41775 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:72"], null),G__41775], 0));
} else {
return G__41775;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = cljs.core.name(state);
var G__41782 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:74"], null),G__41782], 0));
} else {
return G__41782;
}
})()], null),new cljs.core.Keyword(null,".session-state",".session-state",-1149943984))], null),new cljs.core.Keyword(null,".session-info",".session-info",-842850972));
var G__41786 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:71"], null),G__41786], 0));
} else {
return G__41786;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = updated_at;
var G__41804 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:76"], null),G__41804], 0));
} else {
return G__41804;
}
})()], null),new cljs.core.Keyword(null,".session-updated",".session-updated",-1030660125));
var G__41805 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:75"], null),G__41805], 0));
} else {
return G__41805;
}
})()], null),new cljs.core.Keyword(null,".session-meta",".session-meta",1817002793))], null),new cljs.core.Keyword(null,".session-item",".session-item",-1756675858));
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.project_detail !== 'undefined') && (typeof ouroboros.frontend.ui.pages.project_detail.SessionItem !== 'undefined')){
} else {
/**
 * Individual session item
 * @constructor
 */
ouroboros.frontend.ui.pages.project_detail.SessionItem = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___41994,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.project_detail.SessionItem,new cljs.core.Keyword("ouroboros.frontend.ui.pages.project-detail","SessionItem","ouroboros.frontend.ui.pages.project-detail/SessionItem",2117204096),options__36450__auto___41994);
ouroboros.frontend.ui.pages.project_detail.ui_session_item = com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.project_detail.SessionItem,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keyfn","keyfn",780060332),new cljs.core.Keyword("session","id","session/id",604977054)], null));

var options__36450__auto___42007 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"query","query",-1288509510),(function ouroboros$frontend$ui$pages$project_detail$query_STAR_(this$){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("project","id","project/id",-791740645),new cljs.core.Keyword("project","name","project/name",2022968152),new cljs.core.Keyword("project","description","project/description",-649490311),new cljs.core.Keyword("project","status","project/status",-1761879874),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("project","sessions","project/sessions",-924782017),com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$1(ouroboros.frontend.ui.pages.project_detail.SessionItem)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"project-detail","project-detail",-346323605)], null)], null);
}),new cljs.core.Keyword(null,"ident","ident",-742346),(function ouroboros$frontend$ui$pages$project_detail$ident_STAR_(this$,p__41868){
var map__41869 = p__41868;
var map__41869__$1 = cljs.core.__destructure_map(map__41869);
var props = map__41869__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41869__$1,new cljs.core.Keyword("project","id","project/id",-791740645));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41869__$1,new cljs.core.Keyword("project","name","project/name",2022968152));
var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41869__$1,new cljs.core.Keyword("project","description","project/description",-649490311));
var status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41869__$1,new cljs.core.Keyword("project","status","project/status",-1761879874));
var sessions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41869__$1,new cljs.core.Keyword("project","sessions","project/sessions",-924782017));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"project-detail","project-detail",-346323605)], null);
}),new cljs.core.Keyword(null,"route-segment","route-segment",1812935886),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["project",new cljs.core.Keyword(null,"project-id","project-id",206449307)], null),new cljs.core.Keyword(null,"will-enter","will-enter",-692415624),(function (app,p__41891){
var map__41893 = p__41891;
var map__41893__$1 = cljs.core.__destructure_map(map__41893);
var project_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41893__$1,new cljs.core.Keyword(null,"project-id","project-id",206449307));
return com.fulcrologic.fulcro.routing.dynamic_routing.route_deferred(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"project-detail","project-detail",-346323605)], null),(function (){
return com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"project-detail","project-detail",-346323605)], null),ouroboros.frontend.ui.pages.project_detail.ProjectDetailPage,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"marker","marker",865118313),new cljs.core.Keyword(null,"project-detail","project-detail",-346323605),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"project-id","project-id",206449307),project_id], null),new cljs.core.Keyword(null,"post-mutation","post-mutation",-1076606705),new cljs.core.Symbol("com.fulcrologic.fulcro.routing.dynamic-routing","target-ready","com.fulcrologic.fulcro.routing.dynamic-routing/target-ready",-111862826,null),new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"project-detail","project-detail",-346323605)], null)], null)], null));
}));
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function ouroboros$frontend$ui$pages$project_detail$render_ProjectDetailPage(this$){
return com.fulcrologic.fulcro.components.wrapped_render(this$,(function (){
var map__41898 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__41898__$1 = cljs.core.__destructure_map(map__41898);
var props = map__41898__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41898__$1,new cljs.core.Keyword("project","id","project/id",-791740645));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41898__$1,new cljs.core.Keyword("project","name","project/name",2022968152));
var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41898__$1,new cljs.core.Keyword("project","description","project/description",-649490311));
var status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41898__$1,new cljs.core.Keyword("project","status","project/status",-1761879874));
var sessions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41898__$1,new cljs.core.Keyword("project","sessions","project/sessions",-924782017));
var loading_QMARK_ = com.fulcrologic.fulcro.data_fetch.loading_QMARK_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.data_fetch.marker_table,new cljs.core.Keyword(null,"project-detail","project-detail",-346323605)], null)));
if(loading_QMARK_){
return com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["div",({"data-fulcro-source": "ouroboros.frontend.ui.pages.project-detail:104", "className": "loading"}),"Loading project..."]);
} else {
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("h1",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = name;
var G__41903 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:108"], null),G__41903], 0));
} else {
return G__41903;
}
})()], null),null);
var G__41908 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:107"], null),G__41908], 0));
} else {
return G__41908;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = (name.cljs$core$IFn$_invoke$arity$1 ? name.cljs$core$IFn$_invoke$arity$1(status) : name.call(null, status));
var G__41912 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:109"], null),G__41912], 0));
} else {
return G__41912;
}
})()], null),new cljs.core.Keyword(null,".project-status-badge",".project-status-badge",1210342275)),(cljs.core.truth_(description)?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("p",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = description;
var G__41915 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:111"], null),G__41915], 0));
} else {
return G__41915;
}
})()], null),new cljs.core.Keyword(null,".project-description",".project-description",66056513)):null)], null),new cljs.core.Keyword(null,".project-header",".project-header",-1181888733));
var G__41919 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:105"], null),G__41919], 0));
} else {
return G__41919;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h2",({"data-fulcro-source": "ouroboros.frontend.ui.pages.project-detail:114"}),"Choose a Builder"]),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__41837_SHARP_){
var G__41932 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"builder","builder",-2055262005),p1__41837_SHARP_,new cljs.core.Keyword(null,"project-id","project-id",206449307),id], null);
return (ouroboros.frontend.ui.pages.project_detail.ui_builder_card.cljs$core$IFn$_invoke$arity$1 ? ouroboros.frontend.ui.pages.project_detail.ui_builder_card.cljs$core$IFn$_invoke$arity$1(G__41932) : ouroboros.frontend.ui.pages.project_detail.ui_builder_card.call(null, G__41932));
}),ouroboros.frontend.ui.pages.project_detail.builder_types);
var G__41934 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:115"], null),G__41934], 0));
} else {
return G__41934;
}
})()], null),new cljs.core.Keyword(null,".builders-grid",".builders-grid",-1178676249)),((cljs.core.seq(sessions))?com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = com.fulcrologic.fulcro.dom.macro_create_element_STAR_(["h2",({"data-fulcro-source": "ouroboros.frontend.ui.pages.project-detail:121"}),"Active Sessions"]);
var G__41942 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:120"], null),G__41942], 0));
} else {
return G__41942;
}
})(),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = cljs.core.map.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.ui.pages.project_detail.ui_session_item,sessions);
var G__41949 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:122"], null),G__41949], 0));
} else {
return G__41949;
}
})()], null),new cljs.core.Keyword(null,".sessions-list",".sessions-list",-302549167))], null),new cljs.core.Keyword(null,".sessions-section",".sessions-section",1395662075)):null),com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var a__38231__auto__ = ouroboros.frontend.ui.components.button(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return com.fulcrologic.fulcro.routing.dynamic_routing.change_route_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["projects"], null));
}),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"secondary","secondary",-669381460)], null),"\u2190 Back to Projects");
var G__41953 = a__38231__auto__;
if(cljs.core.map_QMARK_(a__38231__auto__)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-fulcro-source","data-fulcro-source",-1585991622),"ouroboros.frontend.ui.pages.project-detail:126"], null),G__41953], 0));
} else {
return G__41953;
}
})()], null),new cljs.core.Keyword(null,".project-actions",".project-actions",1630112475))], null),new cljs.core.Keyword(null,".project-detail-page",".project-detail-page",450056632));
}
}));
})], null);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.ui !== 'undefined') && (typeof ouroboros.frontend.ui.pages !== 'undefined') && (typeof ouroboros.frontend.ui.pages.project_detail !== 'undefined') && (typeof ouroboros.frontend.ui.pages.project_detail.ProjectDetailPage !== 'undefined')){
} else {
/**
 * Project detail page with builder selection
 * @constructor
 */
ouroboros.frontend.ui.pages.project_detail.ProjectDetailPage = com.fulcrologic.fulcro.components.react_constructor(cljs.core.get.cljs$core$IFn$_invoke$arity$2(options__36450__auto___42007,new cljs.core.Keyword(null,"initLocalState","initLocalState",-46503876)));
}

com.fulcrologic.fulcro.components.configure_component_BANG_(ouroboros.frontend.ui.pages.project_detail.ProjectDetailPage,new cljs.core.Keyword("ouroboros.frontend.ui.pages.project-detail","ProjectDetailPage","ouroboros.frontend.ui.pages.project-detail/ProjectDetailPage",-2126880872),options__36450__auto___42007);

//# sourceMappingURL=ouroboros.frontend.ui.pages.project_detail.js.map
