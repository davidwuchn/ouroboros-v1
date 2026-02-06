goog.provide('com.fulcrologic.fulcro.ui_state_machines');


com.fulcrologic.fulcro.ui_state_machines.mutation_delegate = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","mutation-delegate","com.fulcrologic.fulcro.ui-state-machines/mutation-delegate",-2068639436,null));
com.fulcrologic.fulcro.ui_state_machines.set_js_timeout_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$set_js_timeout_BANG_(f,tm){
return com.fulcrologic.fulcro.algorithms.scheduling.defer(f,tm);
});
com.fulcrologic.fulcro.ui_state_machines.clear_js_timeout_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$clear_js_timeout_BANG_(timer){
return clearTimeout(timer);
});
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","atom","com.fulcrologic.fulcro.ui-state-machines/atom",1971230309),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),new cljs.core.Symbol("com.fulcrologic.fulcro.algorithms.do-not-use","atom?","com.fulcrologic.fulcro.algorithms.do-not-use/atom?",1966872138,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.list(new cljs.core.Symbol("cljs.core","atom","cljs.core/atom",1943839529,null),null),"null",cljs.core.list(new cljs.core.Symbol("cljs.core","atom","cljs.core/atom",1943839529,null),cljs.core.PersistentArrayMap.EMPTY),"null",cljs.core.list(new cljs.core.Symbol("cljs.core","atom","cljs.core/atom",1943839529,null),cljs.core.PersistentHashSet.EMPTY),"null"], null), null)))),cljs.spec.alpha.with_gen(com.fulcrologic.fulcro.algorithms.do_not_use.atom_QMARK_,(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.createAsIfByAssoc([cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null),cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY),cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.EMPTY)]));
})));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),cljs.core.map_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","refresh-vector","com.fulcrologic.fulcro.ui-state-machines/refresh-vector",1069152424),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("edn-query-language.core","ident?","edn-query-language.core/ident?",-1410852474,null),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null)),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"other","other",995793544),new cljs.core.Keyword(null,"tab","tab",-559583621)], null)], null)))),cljs.spec.alpha.with_gen(cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Symbol("eql","ident?","eql/ident?",-2061479468,null),edn_query_language.core.ident_QMARK_,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.vector_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("edn-query-language.core","ident?","edn-query-language.core/ident?",-1410852474,null),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56188){
return cljs.core.vector_QMARK_(G__56188);
})], null),null),(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"other","other",995793544),new cljs.core.Keyword(null,"tab","tab",-559583621)], null)], null));
})));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","fulcro-app","com.fulcrologic.fulcro.ui-state-machines/fulcro-app",-163883279),new cljs.core.Symbol("com.fulcrologic.fulcro.raw.application","fulcro-app?","com.fulcrologic.fulcro.raw.application/fulcro-app?",-1100918776,null),com.fulcrologic.fulcro.raw.application.fulcro_app_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","source-actor-ident","com.fulcrologic.fulcro.ui-state-machines/source-actor-ident",1906012799),new cljs.core.Symbol("edn-query-language.core","ident?","edn-query-language.core/ident?",-1410852474,null),edn_query_language.core.ident_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.keyword_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.Symbol(null,"keyword?","keyword?",1917797069,null)),cljs.spec.alpha.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),cljs.core.keyword_QMARK_], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__13398__auto__,v__13399__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__13399__auto__,(0));
}),new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56194){
return cljs.core.map_QMARK_(G__56194);
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.Symbol("edn-query-language.core","ident?","edn-query-language.core/ident?",-1410852474,null)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.Symbol("eql","ident?","eql/ident?",-2061479468,null)),cljs.spec.alpha.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.Symbol("edn-query-language.core","ident?","edn-query-language.core/ident?",-1410852474,null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),edn_query_language.core.ident_QMARK_], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__13398__auto__,v__13399__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__13399__auto__,(0));
}),new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.Symbol("edn-query-language.core","ident?","edn-query-language.core/ident?",-1410852474,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56197){
return cljs.core.map_QMARK_(G__56197);
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ident->actor","com.fulcrologic.fulcro.ui-state-machines/ident->actor",491940340),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Symbol("edn-query-language.core","ident?","edn-query-language.core/ident?",-1410852474,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Symbol("eql","ident?","eql/ident?",-2061479468,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310)),cljs.spec.alpha.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("edn-query-language.core","ident?","edn-query-language.core/ident?",-1410852474,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [edn_query_language.core.ident_QMARK_,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310)], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__13398__auto__,v__13399__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__13399__auto__,(0));
}),new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Symbol("edn-query-language.core","ident?","edn-query-language.core/ident?",-1410852474,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56206){
return cljs.core.map_QMARK_(G__56206);
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.keyword_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),new cljs.core.Symbol("cljs.core","symbol?","cljs.core/symbol?",1422196122,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),new cljs.core.Symbol(null,"the-state-machine","the-state-machine",923612868,null)),"null"], null), null)))),cljs.spec.alpha.with_gen(cljs.core.symbol_QMARK_,(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Symbol(null,"the-state-machine","the-state-machine",923612868,null),null], null), null));
})));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null),cljs.core.any_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","local-storage","com.fulcrologic.fulcro.ui-state-machines/local-storage",969391206),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Symbol(null,"keyword?","keyword?",1917797069,null),new cljs.core.Symbol(null,"any?","any?",-318999933,null)),cljs.spec.alpha.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword_QMARK_,cljs.core.any_QMARK_], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__13398__auto__,v__13399__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__13399__auto__,(0));
}),new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56215){
return cljs.core.map_QMARK_(G__56215);
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout","com.fulcrologic.fulcro.ui-state-machines/timeout",2023435248),new cljs.core.Symbol("cljs.core","pos-int?","cljs.core/pos-int?",-2115888030,null),cljs.core.pos_int_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"timer-1","timer-1",549442173),"null",(42),"null"], null), null)))),cljs.spec.alpha.with_gen(cljs.core.any_QMARK_,(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"timer-1","timer-1",549442173),null,(42),null], null), null));
})));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","cancel-fn","com.fulcrologic.fulcro.ui-state-machines/cancel-fn",1576439332),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Symbol("cljs.core","fn?","cljs.core/fn?",71876239,null),new cljs.core.Keyword(null,"s","s",1705939918),new cljs.core.Symbol("cljs.core","set?","cljs.core/set?",-1176684971,null)),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"other!","other!",696342595),"null",new cljs.core.Keyword(null,"event!","event!",-361570295),"null"], null), null),"null"], null), null)))),cljs.spec.alpha.with_gen(cljs.spec.alpha.or_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"s","s",1705939918)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","fn?","cljs.core/fn?",71876239,null),new cljs.core.Symbol("cljs.core","set?","cljs.core/set?",-1176684971,null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.fn_QMARK_,cljs.core.set_QMARK_], null),null),(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.createAsIfByAssoc([new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"other!","other!",696342595),null,new cljs.core.Keyword(null,"event!","event!",-361570295),null], null), null)]));
})));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","cancel-on","com.fulcrologic.fulcro.ui-state-machines/cancel-on",1719737833),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.Symbol(null,"fn-or-set*","fn-or-set*",-424275748,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"i","i",253690212,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),cljs.core.list(new cljs.core.Symbol("cljs.core","->","cljs.core/->",1488366311,null),new cljs.core.Symbol(null,"i","i",253690212,null),new cljs.core.Symbol("cljs.core","meta","cljs.core/meta",-748218346,null),new cljs.core.Keyword(null,"cancel-on","cancel-on",-479584301))], null),cljs.core.list(new cljs.core.Symbol("cljs.core","or","cljs.core/or",1201033885,null),cljs.core.list(new cljs.core.Symbol("cljs.core","fn?","cljs.core/fn?",71876239,null),new cljs.core.Symbol(null,"f","f",43394975,null)),cljs.core.list(new cljs.core.Symbol("cljs.core","set?","cljs.core/set?",-1176684971,null),new cljs.core.Symbol(null,"f","f",43394975,null))))),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.list(new cljs.core.Symbol("cljs.core","with-meta","cljs.core/with-meta",749126446,null),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cancel-on","cancel-on",-479584301),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"e","e",-1273166571,null)], null),true)], null)),"null"], null), null)))),cljs.spec.alpha.with_gen((function com$fulcrologic$fulcro$ui_state_machines$fn_or_set_STAR_(i){
var f = new cljs.core.Keyword(null,"cancel-on","cancel-on",-479584301).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(i));
return ((cljs.core.fn_QMARK_(f)) || (cljs.core.set_QMARK_(f)));
}),(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.createAsIfByAssoc([cljs.core.with_meta(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cancel-on","cancel-on",-479584301),(function (e){
return true;
})], null))]));
})));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","js-timer","com.fulcrologic.fulcro.ui-state-machines/js-timer",1529432544),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__56233#","p1__56233#",1471176683,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","->","cljs.core/->",1488366311,null),new cljs.core.Symbol(null,"p1__56233#","p1__56233#",1471176683,null),new cljs.core.Symbol("cljs.core","meta","cljs.core/meta",-748218346,null),new cljs.core.Keyword(null,"timer","timer",-1266967739),new cljs.core.Symbol("cljs.core","boolean","cljs.core/boolean",-1222483266,null))),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.list(new cljs.core.Symbol("cljs.core","with-meta","cljs.core/with-meta",749126446,null),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"timer","timer",-1266967739),cljs.core.PersistentArrayMap.EMPTY], null)),"null"], null), null)))),cljs.spec.alpha.with_gen((function (p1__56233_SHARP_){
return cljs.core.boolean$(new cljs.core.Keyword(null,"timer","timer",-1266967739).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(p1__56233_SHARP_)));
}),(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.createAsIfByAssoc([cljs.core.with_meta(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"timer","timer",-1266967739),cljs.core.PersistentArrayMap.EMPTY], null))]));
})));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout-descriptor","com.fulcrologic.fulcro.ui-state-machines/timeout-descriptor",761762782),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","js-timer","com.fulcrologic.fulcro.ui-state-machines/js-timer",1529432544),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout","com.fulcrologic.fulcro.ui-state-machines/timeout",2023435248),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","cancel-on","com.fulcrologic.fulcro.ui-state-machines/cancel-on",1719737833)], null),new cljs.core.Keyword(null,"opt","opt",-794706369),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[null,null,null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__56242){
return cljs.core.map_QMARK_(G__56242);
}),(function (G__56242){
return cljs.core.contains_QMARK_(G__56242,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","js-timer","com.fulcrologic.fulcro.ui-state-machines/js-timer",1529432544));
}),(function (G__56242){
return cljs.core.contains_QMARK_(G__56242,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout","com.fulcrologic.fulcro.ui-state-machines/timeout",2023435248));
}),(function (G__56242){
return cljs.core.contains_QMARK_(G__56242,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868));
}),(function (G__56242){
return cljs.core.contains_QMARK_(G__56242,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271));
}),(function (G__56242){
return cljs.core.contains_QMARK_(G__56242,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","cancel-on","com.fulcrologic.fulcro.ui-state-machines/cancel-on",1719737833));
})], null),(function (G__56242){
return ((cljs.core.map_QMARK_(G__56242)) && (((cljs.core.contains_QMARK_(G__56242,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","js-timer","com.fulcrologic.fulcro.ui-state-machines/js-timer",1529432544))) && (((cljs.core.contains_QMARK_(G__56242,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout","com.fulcrologic.fulcro.ui-state-machines/timeout",2023435248))) && (((cljs.core.contains_QMARK_(G__56242,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868))) && (((cljs.core.contains_QMARK_(G__56242,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271))) && (cljs.core.contains_QMARK_(G__56242,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","cancel-on","com.fulcrologic.fulcro.ui-state-machines/cancel-on",1719737833))))))))))));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","js-timer","com.fulcrologic.fulcro.ui-state-machines/js-timer",1529432544),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout","com.fulcrologic.fulcro.ui-state-machines/timeout",2023435248),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","cancel-on","com.fulcrologic.fulcro.ui-state-machines/cancel-on",1719737833)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","js-timer","com.fulcrologic.fulcro.ui-state-machines/js-timer",1529432544),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout","com.fulcrologic.fulcro.ui-state-machines/timeout",2023435248),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","cancel-on","com.fulcrologic.fulcro.ui-state-machines/cancel-on",1719737833)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","js-timer","com.fulcrologic.fulcro.ui-state-machines/js-timer",1529432544),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout","com.fulcrologic.fulcro.ui-state-machines/timeout",2023435248),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","cancel-on","com.fulcrologic.fulcro.ui-state-machines/cancel-on",1719737833)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","js-timer","com.fulcrologic.fulcro.ui-state-machines/js-timer",1529432544))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout","com.fulcrologic.fulcro.ui-state-machines/timeout",2023435248))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","cancel-on","com.fulcrologic.fulcro.ui-state-machines/cancel-on",1719737833)))], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031)], null)])));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-timeouts","com.fulcrologic.fulcro.ui-state-machines/queued-timeouts",1249273499),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout-descriptor","com.fulcrologic.fulcro.ui-state-machines/timeout-descriptor",761762782)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout-descriptor","com.fulcrologic.fulcro.ui-state-machines/timeout-descriptor",761762782),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout-descriptor","com.fulcrologic.fulcro.ui-state-machines/timeout-descriptor",761762782),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout-descriptor","com.fulcrologic.fulcro.ui-state-machines/timeout-descriptor",761762782)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56281){
return cljs.core.coll_QMARK_(G__56281);
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-timers","com.fulcrologic.fulcro.ui-state-machines/active-timers",2018369193),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout-descriptor","com.fulcrologic.fulcro.ui-state-machines/timeout-descriptor",761762782)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout-descriptor","com.fulcrologic.fulcro.ui-state-machines/timeout-descriptor",761762782)),cljs.spec.alpha.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout-descriptor","com.fulcrologic.fulcro.ui-state-machines/timeout-descriptor",761762782)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout-descriptor","com.fulcrologic.fulcro.ui-state-machines/timeout-descriptor",761762782)], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__13398__auto__,v__13399__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__13399__auto__,(0));
}),new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout-descriptor","com.fulcrologic.fulcro.ui-state-machines/timeout-descriptor",761762782)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56283){
return cljs.core.map_QMARK_(G__56283);
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm","com.fulcrologic.fulcro.ui-state-machines/asm",1736921645),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ident->actor","com.fulcrologic.fulcro.ui-state-machines/ident->actor",491940340),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-timers","com.fulcrologic.fulcro.ui-state-machines/active-timers",2018369193),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","local-storage","com.fulcrologic.fulcro.ui-state-machines/local-storage",969391206)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[null,null,null,new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__56285){
return cljs.core.map_QMARK_(G__56285);
}),(function (G__56285){
return cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394));
}),(function (G__56285){
return cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583));
}),(function (G__56285){
return cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193));
}),(function (G__56285){
return cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928));
}),(function (G__56285){
return cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446));
}),(function (G__56285){
return cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ident->actor","com.fulcrologic.fulcro.ui-state-machines/ident->actor",491940340));
}),(function (G__56285){
return cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-timers","com.fulcrologic.fulcro.ui-state-machines/active-timers",2018369193));
}),(function (G__56285){
return cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","local-storage","com.fulcrologic.fulcro.ui-state-machines/local-storage",969391206));
})], null),(function (G__56285){
return ((cljs.core.map_QMARK_(G__56285)) && (((cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394))) && (((cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583))) && (((cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193))) && (((cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928))) && (((cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446))) && (((cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ident->actor","com.fulcrologic.fulcro.ui-state-machines/ident->actor",491940340))) && (((cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-timers","com.fulcrologic.fulcro.ui-state-machines/active-timers",2018369193))) && (cljs.core.contains_QMARK_(G__56285,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","local-storage","com.fulcrologic.fulcro.ui-state-machines/local-storage",969391206))))))))))))))))));
}),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ident->actor","com.fulcrologic.fulcro.ui-state-machines/ident->actor",491940340),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-timers","com.fulcrologic.fulcro.ui-state-machines/active-timers",2018369193),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","local-storage","com.fulcrologic.fulcro.ui-state-machines/local-storage",969391206)], null),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ident->actor","com.fulcrologic.fulcro.ui-state-machines/ident->actor",491940340),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-timers","com.fulcrologic.fulcro.ui-state-machines/active-timers",2018369193),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","local-storage","com.fulcrologic.fulcro.ui-state-machines/local-storage",969391206)], null),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ident->actor","com.fulcrologic.fulcro.ui-state-machines/ident->actor",491940340),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-timers","com.fulcrologic.fulcro.ui-state-machines/active-timers",2018369193),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","local-storage","com.fulcrologic.fulcro.ui-state-machines/local-storage",969391206)], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ident->actor","com.fulcrologic.fulcro.ui-state-machines/ident->actor",491940340))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-timers","com.fulcrologic.fulcro.ui-state-machines/active-timers",2018369193))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","local-storage","com.fulcrologic.fulcro.ui-state-machines/local-storage",969391206)))], null),null])));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-id","com.fulcrologic.fulcro.ui-state-machines/state-id",-1747313730),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.keyword_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),cljs.core.map_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.keyword_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","app","com.fulcrologic.fulcro.ui-state-machines/app",-1843831489),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),cljs.core.map_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","trigger-descriptor","com.fulcrologic.fulcro.ui-state-machines/trigger-descriptor",-1500671927),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868)], null),new cljs.core.Keyword(null,"opt","opt",-794706369),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[null,null,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__56451){
return cljs.core.map_QMARK_(G__56451);
}),(function (G__56451){
return cljs.core.contains_QMARK_(G__56451,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394));
}),(function (G__56451){
return cljs.core.contains_QMARK_(G__56451,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868));
})], null),(function (G__56451){
return ((cljs.core.map_QMARK_(G__56451)) && (((cljs.core.contains_QMARK_(G__56451,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394))) && (cljs.core.contains_QMARK_(G__56451,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868))))));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868)))], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031)], null)])));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-triggers","com.fulcrologic.fulcro.ui-state-machines/queued-triggers",1577632329),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","trigger-descriptor","com.fulcrologic.fulcro.ui-state-machines/trigger-descriptor",-1500671927)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","trigger-descriptor","com.fulcrologic.fulcro.ui-state-machines/trigger-descriptor",-1500671927),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","trigger-descriptor","com.fulcrologic.fulcro.ui-state-machines/trigger-descriptor",-1500671927),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","trigger-descriptor","com.fulcrologic.fulcro.ui-state-machines/trigger-descriptor",-1500671927)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56467){
return cljs.core.coll_QMARK_(G__56467);
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-transactions","com.fulcrologic.fulcro.ui-state-machines/queued-transactions",-998495741),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Symbol(null,"map?","map?",-1780568534,null),cljs.core.map_QMARK_,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56468){
return cljs.core.coll_QMARK_(G__56468);
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","env","com.fulcrologic.fulcro.ui-state-machines/env",396092855),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394)], null),new cljs.core.Keyword(null,"opt","opt",-794706369),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","source-actor-ident","com.fulcrologic.fulcro.ui-state-machines/source-actor-ident",1906012799),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-triggers","com.fulcrologic.fulcro.ui-state-machines/queued-triggers",1577632329),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","app","com.fulcrologic.fulcro.ui-state-machines/app",-1843831489),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-mutations","com.fulcrologic.fulcro.ui-state-machines/queued-mutations",-652604760),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-loads","com.fulcrologic.fulcro.ui-state-machines/queued-loads",1234134533),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-timeouts","com.fulcrologic.fulcro.ui-state-machines/queued-timeouts",1249273499),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-transactions","com.fulcrologic.fulcro.ui-state-machines/queued-transactions",-998495741)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[null,null,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__56470){
return cljs.core.map_QMARK_(G__56470);
}),(function (G__56470){
return cljs.core.contains_QMARK_(G__56470,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138));
}),(function (G__56470){
return cljs.core.contains_QMARK_(G__56470,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394));
})], null),(function (G__56470){
return ((cljs.core.map_QMARK_(G__56470)) && (((cljs.core.contains_QMARK_(G__56470,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138))) && (cljs.core.contains_QMARK_(G__56470,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394))))));
}),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","source-actor-ident","com.fulcrologic.fulcro.ui-state-machines/source-actor-ident",1906012799),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-triggers","com.fulcrologic.fulcro.ui-state-machines/queued-triggers",1577632329),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","app","com.fulcrologic.fulcro.ui-state-machines/app",-1843831489),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-mutations","com.fulcrologic.fulcro.ui-state-machines/queued-mutations",-652604760),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-loads","com.fulcrologic.fulcro.ui-state-machines/queued-loads",1234134533),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-timeouts","com.fulcrologic.fulcro.ui-state-machines/queued-timeouts",1249273499),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-transactions","com.fulcrologic.fulcro.ui-state-machines/queued-transactions",-998495741)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394)], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","source-actor-ident","com.fulcrologic.fulcro.ui-state-machines/source-actor-ident",1906012799),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-triggers","com.fulcrologic.fulcro.ui-state-machines/queued-triggers",1577632329),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","app","com.fulcrologic.fulcro.ui-state-machines/app",-1843831489),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-mutations","com.fulcrologic.fulcro.ui-state-machines/queued-mutations",-652604760),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-loads","com.fulcrologic.fulcro.ui-state-machines/queued-loads",1234134533),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-timeouts","com.fulcrologic.fulcro.ui-state-machines/queued-timeouts",1249273499),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-transactions","com.fulcrologic.fulcro.ui-state-machines/queued-transactions",-998495741)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394)))], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","source-actor-ident","com.fulcrologic.fulcro.ui-state-machines/source-actor-ident",1906012799),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-triggers","com.fulcrologic.fulcro.ui-state-machines/queued-triggers",1577632329),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","app","com.fulcrologic.fulcro.ui-state-machines/app",-1843831489),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-mutations","com.fulcrologic.fulcro.ui-state-machines/queued-mutations",-652604760),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-loads","com.fulcrologic.fulcro.ui-state-machines/queued-loads",1234134533),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-timeouts","com.fulcrologic.fulcro.ui-state-machines/queued-timeouts",1249273499),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-transactions","com.fulcrologic.fulcro.ui-state-machines/queued-transactions",-998495741)], null)])));
com.fulcrologic.fulcro.ui_state_machines.fake_handler = (function com$fulcrologic$fulcro$ui_state_machines$fake_handler(env){
return env;
});
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-names","com.fulcrologic.fulcro.ui-state-machines/actor-names",-672395334),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Symbol("cljs.core","set?","cljs.core/set?",-1176684971,null)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.set_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","set?","cljs.core/set?",-1176684971,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Symbol("cljs.core","set?","cljs.core/set?",-1176684971,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56490){
return cljs.core.set_QMARK_(G__56490);
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-predicate","com.fulcrologic.fulcro.ui-state-machines/event-predicate",620527987),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),new cljs.core.Symbol("cljs.core","fn?","cljs.core/fn?",71876239,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null)], null),true),"null",cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null)], null),false),"null"], null), null)))),cljs.spec.alpha.with_gen(cljs.core.fn_QMARK_,(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.createAsIfByAssoc([(function (_){
return true;
}),(function (_){
return false;
})]));
})));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),new cljs.core.Symbol("cljs.core","fn?","cljs.core/fn?",71876239,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","fake-handler","com.fulcrologic.fulcro.ui-state-machines/fake-handler",2029910922,null),"null"], null), null)))),cljs.spec.alpha.with_gen(cljs.core.fn_QMARK_,(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.createAsIfByAssoc([com.fulcrologic.fulcro.ui_state_machines.fake_handler]));
})));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-id","com.fulcrologic.fulcro.ui-state-machines/state-id",-1747313730),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-id","com.fulcrologic.fulcro.ui-state-machines/state-id",-1747313730));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-processing","com.fulcrologic.fulcro.ui-state-machines/event-processing",1901553910),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"opt","opt",-794706369),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-predicate","com.fulcrologic.fulcro.ui-state-machines/event-predicate",620527987),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[null,null,null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__56495){
return cljs.core.map_QMARK_(G__56495);
})], null),(function (G__56495){
return cljs.core.map_QMARK_(G__56495);
}),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-predicate","com.fulcrologic.fulcro.ui-state-machines/event-predicate",620527987),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947)], null),cljs.core.PersistentVector.EMPTY,null,cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-predicate","com.fulcrologic.fulcro.ui-state-machines/event-predicate",620527987),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null)))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-predicate","com.fulcrologic.fulcro.ui-state-machines/event-predicate",620527987),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947)], null)])));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-processing","com.fulcrologic.fulcro.ui-state-machines/event-processing",1901553910)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-processing","com.fulcrologic.fulcro.ui-state-machines/event-processing",1901553910)),cljs.spec.alpha.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-processing","com.fulcrologic.fulcro.ui-state-machines/event-processing",1901553910)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-processing","com.fulcrologic.fulcro.ui-state-machines/event-processing",1901553910)], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__13398__auto__,v__13399__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__13399__auto__,(0));
}),new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-processing","com.fulcrologic.fulcro.ui-state-machines/event-processing",1901553910)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56500){
return cljs.core.map_QMARK_(G__56500);
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state","com.fulcrologic.fulcro.ui-state-machines/state",-148827517),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"handler","handler",-195596612),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182)], null)),new cljs.core.Keyword(null,"events","events",1792552201),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363)], null))),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","fake-handler","com.fulcrologic.fulcro.ui-state-machines/fake-handler",2029910922,null)], null),"null"], null), null)))),cljs.spec.alpha.with_gen(cljs.spec.alpha.or_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"handler","handler",-195596612),new cljs.core.Keyword(null,"events","events",1792552201)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182)], null)),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363)], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[null,null,null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__56506){
return cljs.core.map_QMARK_(G__56506);
}),(function (G__56506){
return cljs.core.contains_QMARK_(G__56506,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182));
})], null),(function (G__56506){
return ((cljs.core.map_QMARK_(G__56506)) && (cljs.core.contains_QMARK_(G__56506,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182))));
}),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182)], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182)))], null),null])),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[null,null,null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__56537){
return cljs.core.map_QMARK_(G__56537);
}),(function (G__56537){
return cljs.core.contains_QMARK_(G__56537,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363));
})], null),(function (G__56537){
return ((cljs.core.map_QMARK_(G__56537)) && (cljs.core.contains_QMARK_(G__56537,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363))));
}),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363)], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363)))], null),null]))], null),null),(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.createAsIfByAssoc([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.ui_state_machines.fake_handler], null)]));
})));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-id","com.fulcrologic.fulcro.ui-state-machines/state-id",-1747313730),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state","com.fulcrologic.fulcro.ui-state-machines/state",-148827517)),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"initial","initial",1854648214),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","fake-handler","com.fulcrologic.fulcro.ui-state-machines/fake-handler",2029910922,null)], null)], null),"null"], null), null)))),cljs.spec.alpha.with_gen(cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-id","com.fulcrologic.fulcro.ui-state-machines/state-id",-1747313730),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state","com.fulcrologic.fulcro.ui-state-machines/state",-148827517)),cljs.spec.alpha.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-id","com.fulcrologic.fulcro.ui-state-machines/state-id",-1747313730),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state","com.fulcrologic.fulcro.ui-state-machines/state",-148827517)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-id","com.fulcrologic.fulcro.ui-state-machines/state-id",-1747313730),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state","com.fulcrologic.fulcro.ui-state-machines/state",-148827517)], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__13398__auto__,v__13399__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__13399__auto__,(0));
}),new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-id","com.fulcrologic.fulcro.ui-state-machines/state-id",-1747313730),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state","com.fulcrologic.fulcro.ui-state-machines/state",-148827517)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56586){
return cljs.core.map_QMARK_(G__56586);
})], null),null),(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.createAsIfByAssoc([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"initial","initial",1854648214),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),com.fulcrologic.fulcro.ui_state_machines.fake_handler], null)], null)]));
})));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","alias","com.fulcrologic.fulcro.ui-state-machines/alias",466933196),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.keyword_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","aliases","com.fulcrologic.fulcro.ui-state-machines/aliases",-320387324),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","every","cljs.spec.alpha/every",123912744,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Keyword(null,"min-count","min-count",1594709013),(1))),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Symbol(null,"keyword?","keyword?",1917797069,null),cljs.core.list(new cljs.core.Symbol("s","every","s/every",-419764428,null),new cljs.core.Symbol(null,"keyword?","keyword?",1917797069,null),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Symbol(null,"vector?","vector?",-61367869,null),new cljs.core.Keyword(null,"min-count","min-count",1594709013),(1))),cljs.spec.alpha.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","every","cljs.spec.alpha/every",123912744,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Keyword(null,"min-count","min-count",1594709013),(1))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword_QMARK_,cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Symbol(null,"keyword?","keyword?",1917797069,null),cljs.core.keyword_QMARK_,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.vector_QMARK_,new cljs.core.Keyword(null,"min-count","min-count",1594709013),(1),new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","every","cljs.spec.alpha/every",123912744,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Keyword(null,"min-count","min-count",1594709013),(1)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56605){
return ((cljs.core.vector_QMARK_(G__56605)) && (((((function (){var or__5002__auto__ = (1);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})() <= cljs.core.bounded_count((1)
,G__56605))) && ((cljs.core.bounded_count((1)
,G__56605) <= (function (){var or__5002__auto__ = null;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (9007199254740991);
}
})())))));
})], null),null)], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__13398__auto__,v__13399__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__13399__auto__,(0));
}),new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","every","cljs.spec.alpha/every",123912744,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Keyword(null,"min-count","min-count",1594709013),(1))),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56603){
return cljs.core.map_QMARK_(G__56603);
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","plugin","com.fulcrologic.fulcro.ui-state-machines/plugin",270487339),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_aliases","_aliases",896000603,null)], null),null),"null"], null), null)))),cljs.spec.alpha.with_gen(cljs.core.any_QMARK_,(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.createAsIfByAssoc([(function (_aliases){
return null;
})]));
})));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","plugins","com.fulcrologic.fulcro.ui-state-machines/plugins",-304622321),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","plugin","com.fulcrologic.fulcro.ui-state-machines/plugin",270487339)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Symbol(null,"keyword?","keyword?",1917797069,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","plugin","com.fulcrologic.fulcro.ui-state-machines/plugin",270487339)),cljs.spec.alpha.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","plugin","com.fulcrologic.fulcro.ui-state-machines/plugin",270487339)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword_QMARK_,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","plugin","com.fulcrologic.fulcro.ui-state-machines/plugin",270487339)], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__13398__auto__,v__13399__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__13399__auto__,(0));
}),new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","plugin","com.fulcrologic.fulcro.ui-state-machines/plugin",270487339)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56620){
return cljs.core.map_QMARK_(G__56620);
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-names","com.fulcrologic.fulcro.ui-state-machines/event-names",-271643382),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Symbol("cljs.core","set?","cljs.core/set?",-1176684971,null)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Symbol(null,"keyword?","keyword?",1917797069,null),cljs.core.keyword_QMARK_,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.set_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","set?","cljs.core/set?",-1176684971,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Symbol("cljs.core","set?","cljs.core/set?",-1176684971,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__56626){
return cljs.core.set_QMARK_(G__56626);
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.keyword_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-definition","com.fulcrologic.fulcro.ui-state-machines/state-machine-definition",2134883152),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308)], null),new cljs.core.Keyword(null,"opt","opt",-794706369),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-names","com.fulcrologic.fulcro.ui-state-machines/actor-names",-672395334),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","aliases","com.fulcrologic.fulcro.ui-state-machines/aliases",-320387324),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","plugins","com.fulcrologic.fulcro.ui-state-machines/plugins",-304622321),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-names","com.fulcrologic.fulcro.ui-state-machines/event-names",-271643382)], null)),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-names","com.fulcrologic.fulcro.ui-state-machines/actor-names",-672395334),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"a","a",-2123407586),"null"], null), null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"initial","initial",1854648214),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"env","env",-175281708,null)], null),new cljs.core.Symbol(null,"env","env",-175281708,null))], null)], null)], null),"null"], null), null)))),cljs.spec.alpha.with_gen(cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[null,null,null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__56642){
return cljs.core.map_QMARK_(G__56642);
}),(function (G__56642){
return cljs.core.contains_QMARK_(G__56642,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308));
})], null),(function (G__56642){
return ((cljs.core.map_QMARK_(G__56642)) && (cljs.core.contains_QMARK_(G__56642,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308))));
}),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-names","com.fulcrologic.fulcro.ui-state-machines/actor-names",-672395334),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","aliases","com.fulcrologic.fulcro.ui-state-machines/aliases",-320387324),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","plugins","com.fulcrologic.fulcro.ui-state-machines/plugins",-304622321),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-names","com.fulcrologic.fulcro.ui-state-machines/event-names",-271643382)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-names","com.fulcrologic.fulcro.ui-state-machines/actor-names",-672395334),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","aliases","com.fulcrologic.fulcro.ui-state-machines/aliases",-320387324),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","plugins","com.fulcrologic.fulcro.ui-state-machines/plugins",-304622321),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-names","com.fulcrologic.fulcro.ui-state-machines/event-names",-271643382)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308)))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-names","com.fulcrologic.fulcro.ui-state-machines/actor-names",-672395334),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","aliases","com.fulcrologic.fulcro.ui-state-machines/aliases",-320387324),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","plugins","com.fulcrologic.fulcro.ui-state-machines/plugins",-304622321),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-names","com.fulcrologic.fulcro.ui-state-machines/event-names",-271643382)], null)])),(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.createAsIfByAssoc([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-names","com.fulcrologic.fulcro.ui-state-machines/actor-names",-672395334),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"a","a",-2123407586),null], null), null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"initial","initial",1854648214),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182),(function (env){
return env;
})], null)], null)], null)]));
})));
com.fulcrologic.fulcro.ui_state_machines.registry = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
com.fulcrologic.fulcro.ui_state_machines.register_state_machine_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$register_state_machine_BANG_(id,definition){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(com.fulcrologic.fulcro.ui_state_machines.registry,cljs.core.assoc,id,definition);
});
com.fulcrologic.fulcro.ui_state_machines.get_state_machine = (function com$fulcrologic$fulcro$ui_state_machines$get_state_machine(id){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(com.fulcrologic.fulcro.ui_state_machines.registry),id);
});
com.fulcrologic.fulcro.ui_state_machines.lookup_state_machine = (function com$fulcrologic$fulcro$ui_state_machines$lookup_state_machine(env){
var G__56713 = (function (){var G__56714 = env;
var G__56715 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583)], null);
return (com.fulcrologic.fulcro.ui_state_machines.asm_value.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.ui_state_machines.asm_value.cljs$core$IFn$_invoke$arity$2(G__56714,G__56715) : com.fulcrologic.fulcro.ui_state_machines.asm_value.call(null, G__56714,G__56715));
})();
if((G__56713 == null)){
return null;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(com.fulcrologic.fulcro.ui_state_machines.registry),G__56713);
}
});
com.fulcrologic.fulcro.ui_state_machines.lookup_state_machine_field = (function com$fulcrologic$fulcro$ui_state_machines$lookup_state_machine_field(env,ks){
if(cljs.core.vector_QMARK_(ks)){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.ui_state_machines.lookup_state_machine(env),ks);
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.ui_state_machines.lookup_state_machine(env),ks);
}
});
/**
 * Mutation: Trigger an event on an active state machine
 */
com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","trigger-state-machine-event","com.fulcrologic.fulcro.ui-state-machines/trigger-state-machine-event",717825464,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","trigger-state-machine-event","com.fulcrologic.fulcro.ui-state-machines/trigger-state-machine-event",717825464,null),(function (fulcro_mutation_env_symbol){
var map__56731 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__56731__$1 = cljs.core.__destructure_map(map__56731);
var params = map__56731__$1;
var event_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56731__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868));
var event_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56731__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031));
var asm_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56731__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function com$fulcrologic$fulcro$ui_state_machines$action(p__56733){
var map__56736 = p__56733;
var map__56736__$1 = cljs.core.__destructure_map(map__56736);
var env = map__56736__$1;
var app = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56736__$1,new cljs.core.Keyword(null,"app","app",-560961707));
var _STAR_after_render_STAR__orig_val__56738_57962 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__56739_57963 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__56739_57963);

try{var map__56741_57964 = event_data;
var map__56741_57965__$1 = cljs.core.__destructure_map(map__56741_57964);
var transact_options_57966 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56741_57965__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","transact-options","com.fulcrologic.fulcro.ui-state-machines/transact-options",-1902859465));
if((event_id == null)){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",134,9,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Invalid (nil) event ID. See https://book.fulcrologic.com/#err-uism-invalid-eventid"], null);
}),null)),null,(335),null,null,null);
} else {
}

(com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event_BANG_.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event_BANG_.cljs$core$IFn$_invoke$arity$2(env,params) : com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event_BANG_.call(null, env,params));

com.fulcrologic.fulcro.raw.application.schedule_render_BANG_.cljs$core$IFn$_invoke$arity$2(app,(function (){var or__5002__auto__ = transact_options_57966;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})());

}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__56738_57962);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__56750 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__56751 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__56751);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__56750);
}})], null);
}));
/**
 * Trigger an event on an active state machine. Safe to use in mutation bodies. The special key ::uism/transact-options can
 *   be used in `extra-data` to indicate a map of options to send to fulcro's `transact!` and rendering sublayer (for example
 *   to control rendering refresh).
 */
com.fulcrologic.fulcro.ui_state_machines.trigger_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$trigger_BANG_(var_args){
var G__56763 = arguments.length;
switch (G__56763) {
case 3:
return com.fulcrologic.fulcro.ui_state_machines.trigger_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return com.fulcrologic.fulcro.ui_state_machines.trigger_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.ui_state_machines.trigger_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (this$,active_state_machine_id,event_id){
return com.fulcrologic.fulcro.ui_state_machines.trigger_BANG_.cljs$core$IFn$_invoke$arity$4(this$,active_state_machine_id,event_id,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.ui_state_machines.trigger_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (this$,active_state_machine_id,event_id,extra_data){
var map__56772 = extra_data;
var map__56772__$1 = cljs.core.__destructure_map(map__56772);
var transact_options = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56772__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","transact-options","com.fulcrologic.fulcro.ui-state-machines/transact-options",-1902859465));
return com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$3(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__56774 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),active_state_machine_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),event_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),extra_data], null);
return (com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.cljs$core$IFn$_invoke$arity$1(G__56774) : com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.call(null, G__56774));
})()], null),(function (){var or__5002__auto__ = transact_options;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})());
}));

(com.fulcrologic.fulcro.ui_state_machines.trigger_BANG_.cljs$lang$maxFixedArity = 4);

var debounced_BANG__57969 = goog.functions.debounce((function (f){
return (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null, ));
}),(200));
/**
 * Just like `trigger!`, but does optimistic actions synchronously so that events that change data rendered in
 *   form fields will be updated synchronously.
 */
com.fulcrologic.fulcro.ui_state_machines.trigger_BANG__BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$trigger_BANG__BANG_(var_args){
var G__56786 = arguments.length;
switch (G__56786) {
case 3:
return com.fulcrologic.fulcro.ui_state_machines.trigger_BANG__BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return com.fulcrologic.fulcro.ui_state_machines.trigger_BANG__BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.ui_state_machines.trigger_BANG__BANG_.cljs$core$IFn$_invoke$arity$3 = (function (this$,active_state_machine_id,event_id){
return com.fulcrologic.fulcro.ui_state_machines.trigger_BANG__BANG_.cljs$core$IFn$_invoke$arity$4(this$,active_state_machine_id,event_id,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.ui_state_machines.trigger_BANG__BANG_.cljs$core$IFn$_invoke$arity$4 = (function (this$,active_state_machine_id,event_id,extra_data){
var map__56790 = extra_data;
var map__56790__$1 = cljs.core.__destructure_map(map__56790);
var transact_options = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56790__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","transact-options","com.fulcrologic.fulcro.ui-state-machines/transact-options",-1902859465));
var app = com.fulcrologic.fulcro.raw.components.any__GT_app(this$);
com.fulcrologic.fulcro.raw.components.transact_BANG__BANG_.cljs$core$IFn$_invoke$arity$3(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__56791 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),active_state_machine_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),event_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),extra_data], null);
return (com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.cljs$core$IFn$_invoke$arity$1(G__56791) : com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.call(null, G__56791));
})()], null),(function (){var or__5002__auto__ = transact_options;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})());

var G__56795 = (function (){
return com.fulcrologic.fulcro.raw.application.schedule_render_BANG_.cljs$core$IFn$_invoke$arity$1(app);
});
return (debounced_BANG__57969.cljs$core$IFn$_invoke$arity$1 ? debounced_BANG__57969.cljs$core$IFn$_invoke$arity$1(G__56795) : debounced_BANG__57969.call(null, G__56795));
}));

(com.fulcrologic.fulcro.ui_state_machines.trigger_BANG__BANG_.cljs$lang$maxFixedArity = 4);

/**
 * Returns the ident of the active state machine with the given ID
 */
com.fulcrologic.fulcro.ui_state_machines.asm_ident = (function com$fulcrologic$fulcro$ui_state_machines$asm_ident(asm_id){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),asm_id], null);
});
/**
 * Returns the active state machine ID from the state machine env.
 */
com.fulcrologic.fulcro.ui_state_machines.asm_id = (function com$fulcrologic$fulcro$ui_state_machines$asm_id(env){
return new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394).cljs$core$IFn$_invoke$arity$1(env);
});
/**
 * Create the runtime state for the given state machine in it's initial state.
 * 
 *   - `::asm-id` is the globally unique key of for a state machine definition.
 *   - `::asm-id` is a user-generated unique ID for the instance of the asm. This allows more than one
 *  instance of the same state machine definition to be active at the same time on the UI.
 *   - `::actor->ident` is a map from actor name to an ident.
 * 
 *   Returns an active state machine that can be stored in Fulcro state for a specific
 *   state machine definition.
 */
com.fulcrologic.fulcro.ui_state_machines.new_asm = (function com$fulcrologic$fulcro$ui_state_machines$new_asm(p__56804){
var map__56807 = p__56804;
var map__56807__$1 = cljs.core.__destructure_map(map__56807);
var state_machine_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56807__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583));
var asm_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56807__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394));
var actor__GT_ident = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56807__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928));
var actor__GT_component_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56807__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446));
var i__GT_a = clojure.set.map_invert(actor__GT_ident);
return new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),asm_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583),state_machine_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193),new cljs.core.Keyword(null,"initial","initial",1854648214),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ident->actor","com.fulcrologic.fulcro.ui-state-machines/ident->actor",491940340),i__GT_a,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928),actor__GT_ident,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446),(function (){var or__5002__auto__ = actor__GT_component_name;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})(),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-timers","com.fulcrologic.fulcro.ui-state-machines/active-timers",2018369193),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","local-storage","com.fulcrologic.fulcro.ui-state-machines/local-storage",969391206),cljs.core.PersistentArrayMap.EMPTY], null);
});
com.fulcrologic.fulcro.ui_state_machines.asm_active_QMARK_ = (function com$fulcrologic$fulcro$ui_state_machines$asm_active_QMARK_(app_ish,id){
var state_map = com.fulcrologic.fulcro.raw.application.current_state(app_ish);
return cljs.core.boolean$(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),id], null)));
});
/**
 * Returns the path to an asm elements in an asm `env`.
 */
com.fulcrologic.fulcro.ui_state_machines.asm_path = (function com$fulcrologic$fulcro$ui_state_machines$asm_path(p__56821,ks){
var map__56822 = p__56821;
var map__56822__$1 = cljs.core.__destructure_map(map__56822);
var env = map__56822__$1;
var asm_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56822__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394));
var path = ((cljs.core.vector_QMARK_(ks))?cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),asm_id], null),ks):new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),asm_id,ks], null));
return path;
});
/**
 * Get the value of an ASM based on keyword OR key-path `ks`.
 */
com.fulcrologic.fulcro.ui_state_machines.asm_value = (function com$fulcrologic$fulcro$ui_state_machines$asm_value(env,ks){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,com.fulcrologic.fulcro.ui_state_machines.asm_path(env,ks));
});
com.fulcrologic.fulcro.ui_state_machines.valid_state_QMARK_ = (function com$fulcrologic$fulcro$ui_state_machines$valid_state_QMARK_(env,state_id){
var states = clojure.set.union.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","exit","com.fulcrologic.fulcro.ui-state-machines/exit",600820288),null,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","started","com.fulcrologic.fulcro.ui-state-machines/started",-1306384334),null], null), null),cljs.core.set(cljs.core.keys(com.fulcrologic.fulcro.ui_state_machines.lookup_state_machine_field(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308)))));
return cljs.core.contains_QMARK_(states,state_id);
});
/**
 * Move to the given state. Returns a new env.
 */
com.fulcrologic.fulcro.ui_state_machines.activate = (function com$fulcrologic$fulcro$ui_state_machines$activate(env,state_id){
if(com.fulcrologic.fulcro.ui_state_machines.valid_state_QMARK_(env,state_id)){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",233,7,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Activating state ",state_id,"on",com.fulcrologic.fulcro.ui_state_machines.asm_id(env)], null);
}),null)),null,(338),null,null,null);

return cljs.core.assoc_in(env,com.fulcrologic.fulcro.ui_state_machines.asm_path(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193)),state_id);
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",236,7,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Activate called for invalid state: ",state_id,"on",com.fulcrologic.fulcro.ui_state_machines.asm_id(env),"See https://book.fulcrologic.com/#err-uism-activate-invalid-state"], null);
}),null)),null,(339),null,null,null);

return env;
}
});
/**
 * Store a k/v pair with the active state machine (will only exist as long as it is active)
 */
com.fulcrologic.fulcro.ui_state_machines.store = (function com$fulcrologic$fulcro$ui_state_machines$store(env,k,v){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$5(env,com.fulcrologic.fulcro.ui_state_machines.asm_path(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","local-storage","com.fulcrologic.fulcro.ui-state-machines/local-storage",969391206)),cljs.core.assoc,k,v);
});
/**
 * Retrieve the value for a k from the active state machine. See `store`.
 */
com.fulcrologic.fulcro.ui_state_machines.retrieve = (function com$fulcrologic$fulcro$ui_state_machines$retrieve(var_args){
var G__56854 = arguments.length;
switch (G__56854) {
case 2:
return com.fulcrologic.fulcro.ui_state_machines.retrieve.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.ui_state_machines.retrieve.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.ui_state_machines.retrieve.cljs$core$IFn$_invoke$arity$2 = (function (env,k){
return com.fulcrologic.fulcro.ui_state_machines.retrieve.cljs$core$IFn$_invoke$arity$3(env,k,null);
}));

(com.fulcrologic.fulcro.ui_state_machines.retrieve.cljs$core$IFn$_invoke$arity$3 = (function (env,k,dflt){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(env,com.fulcrologic.fulcro.ui_state_machines.asm_path(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","local-storage","com.fulcrologic.fulcro.ui-state-machines/local-storage",969391206),k], null)),dflt);
}));

(com.fulcrologic.fulcro.ui_state_machines.retrieve.cljs$lang$maxFixedArity = 3);

com.fulcrologic.fulcro.ui_state_machines.actor__GT_ident = (function com$fulcrologic$fulcro$ui_state_machines$actor__GT_ident(env,actor_name){
var temp__5825__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,com.fulcrologic.fulcro.ui_state_machines.asm_path(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928)));
if(cljs.core.truth_(temp__5825__auto__)){
var lookup = temp__5825__auto__;
return (lookup.cljs$core$IFn$_invoke$arity$1 ? lookup.cljs$core$IFn$_invoke$arity$1(actor_name) : lookup.call(null, actor_name));
} else {
return null;
}
});
/**
 * Looks up the given alias in the alias map and returns the real Fulcro state path or nil if no such path exists.
 */
com.fulcrologic.fulcro.ui_state_machines.resolve_alias = (function com$fulcrologic$fulcro$ui_state_machines$resolve_alias(env,alias){
var temp__5825__auto__ = com.fulcrologic.fulcro.ui_state_machines.lookup_state_machine_field(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","aliases","com.fulcrologic.fulcro.ui-state-machines/aliases",-320387324),alias], null));
if(cljs.core.truth_(temp__5825__auto__)){
var resolution_path = temp__5825__auto__;
var vec__56882 = resolution_path;
var seq__56883 = cljs.core.seq(vec__56882);
var first__56884 = cljs.core.first(seq__56883);
var seq__56883__$1 = cljs.core.next(seq__56883);
var actor = first__56884;
var subpath = seq__56883__$1;
var base_path = com.fulcrologic.fulcro.ui_state_machines.actor__GT_ident(env,actor);
var real_path = cljs.core.into.cljs$core$IFn$_invoke$arity$2(base_path,subpath);
return real_path;
} else {
return null;
}
});
/**
 * Get the real Fulcro state-path for the entity of the given actor.
 */
com.fulcrologic.fulcro.ui_state_machines.actor_path = (function com$fulcrologic$fulcro$ui_state_machines$actor_path(var_args){
var G__56892 = arguments.length;
switch (G__56892) {
case 2:
return com.fulcrologic.fulcro.ui_state_machines.actor_path.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.ui_state_machines.actor_path.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.ui_state_machines.actor_path.cljs$core$IFn$_invoke$arity$2 = (function (env,actor_name){
return com.fulcrologic.fulcro.ui_state_machines.actor_path.cljs$core$IFn$_invoke$arity$3(env,actor_name,null);
}));

(com.fulcrologic.fulcro.ui_state_machines.actor_path.cljs$core$IFn$_invoke$arity$3 = (function (env,actor_name,k){
var temp__5823__auto__ = com.fulcrologic.fulcro.ui_state_machines.actor__GT_ident(env,actor_name);
if(cljs.core.truth_(temp__5823__auto__)){
var ident = temp__5823__auto__;
var G__56901 = ident;
if(cljs.core.truth_(k)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__56901,k);
} else {
return G__56901;
}
} else {
return null;
}
}));

(com.fulcrologic.fulcro.ui_state_machines.actor_path.cljs$lang$maxFixedArity = 3);

/**
 * Set a value in the actor's Fulcro entity. Only the actor is resolved. The k is not processed as an alias. 
 */
com.fulcrologic.fulcro.ui_state_machines.set_actor_value = (function com$fulcrologic$fulcro$ui_state_machines$set_actor_value(env,actor_name,k,v){
var temp__5823__auto__ = com.fulcrologic.fulcro.ui_state_machines.actor_path.cljs$core$IFn$_invoke$arity$3(env,actor_name,k);
if(cljs.core.truth_(temp__5823__auto__)){
var path = temp__5823__auto__;
return cljs.core.update.cljs$core$IFn$_invoke$arity$5(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138),cljs.core.assoc_in,path,v);
} else {
return env;
}
});
/**
 * Get the value of a particular key in the given actor's entity. If follow-idents? is true (which is the default),
 *   then it will recursively follow idents until it finds a non-ident value.
 */
com.fulcrologic.fulcro.ui_state_machines.actor_value = (function com$fulcrologic$fulcro$ui_state_machines$actor_value(var_args){
var G__56924 = arguments.length;
switch (G__56924) {
case 4:
return com.fulcrologic.fulcro.ui_state_machines.actor_value.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 3:
return com.fulcrologic.fulcro.ui_state_machines.actor_value.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.ui_state_machines.actor_value.cljs$core$IFn$_invoke$arity$4 = (function (p__56929,actor_name,k,follow_idents_QMARK_){
var map__56930 = p__56929;
var map__56930__$1 = cljs.core.__destructure_map(map__56930);
var env = map__56930__$1;
var state_map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56930__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138));
var temp__5825__auto__ = com.fulcrologic.fulcro.ui_state_machines.actor_path.cljs$core$IFn$_invoke$arity$3(env,actor_name,k);
if(cljs.core.truth_(temp__5825__auto__)){
var path = temp__5825__auto__;
var v = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map,path);
var depth = (100);
while(true){
if(cljs.core.truth_((function (){var and__5000__auto__ = follow_idents_QMARK_;
if(cljs.core.truth_(and__5000__auto__)){
return ((edn_query_language.core.ident_QMARK_(v)) && (cljs.core.pos_int_QMARK_(depth)));
} else {
return and__5000__auto__;
}
})())){
var G__57983 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map,v);
var G__57985 = (depth - (1));
v = G__57983;
depth = G__57985;
continue;
} else {
return v;
}
break;
}
} else {
return null;
}
}));

(com.fulcrologic.fulcro.ui_state_machines.actor_value.cljs$core$IFn$_invoke$arity$3 = (function (env,actor_name,k){
return com.fulcrologic.fulcro.ui_state_machines.actor_value.cljs$core$IFn$_invoke$arity$4(env,actor_name,k,true);
}));

(com.fulcrologic.fulcro.ui_state_machines.actor_value.cljs$lang$maxFixedArity = 4);

/**
 * Get a Fulcro state value by state machine data alias.
 */
com.fulcrologic.fulcro.ui_state_machines.alias_value = (function com$fulcrologic$fulcro$ui_state_machines$alias_value(p__56947,alias){
var map__56948 = p__56947;
var map__56948__$1 = cljs.core.__destructure_map(map__56948);
var env = map__56948__$1;
var state_map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56948__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138));
var temp__5823__auto__ = com.fulcrologic.fulcro.ui_state_machines.resolve_alias(env,alias);
if(cljs.core.truth_(temp__5823__auto__)){
var real_path = temp__5823__auto__;
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map,real_path);
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",311,7,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Unable to find alias in state machine:",alias,"See https://book.fulcrologic.com/#err-uism-unknown-alias"], null);
}),null)),null,(342),null,null,null);

return null;
}
});
/**
 * Deprecated. Use assoc-aliased.
 */
com.fulcrologic.fulcro.ui_state_machines.set_aliased_value = (function com$fulcrologic$fulcro$ui_state_machines$set_aliased_value(var_args){
var G__56977 = arguments.length;
switch (G__56977) {
case 3:
return com.fulcrologic.fulcro.ui_state_machines.set_aliased_value.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
var args_arr__5751__auto__ = [];
var len__5726__auto___57989 = arguments.length;
var i__5727__auto___57990 = (0);
while(true){
if((i__5727__auto___57990 < len__5726__auto___57989)){
args_arr__5751__auto__.push((arguments[i__5727__auto___57990]));

var G__57991 = (i__5727__auto___57990 + (1));
i__5727__auto___57990 = G__57991;
continue;
} else {
}
break;
}

var argseq__5752__auto__ = ((((5) < args_arr__5751__auto__.length))?(new cljs.core.IndexedSeq(args_arr__5751__auto__.slice((5)),(0),null)):null);
return com.fulcrologic.fulcro.ui_state_machines.set_aliased_value.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__5752__auto__);

}
});

(com.fulcrologic.fulcro.ui_state_machines.set_aliased_value.cljs$core$IFn$_invoke$arity$variadic = (function (env,alias,new_value,alias_2,value_2,kv_pairs){
var kvs = cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [alias,new_value], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [alias_2,value_2], null)], null),cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kv_pairs));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (e,p__56990){
var vec__56991 = p__56990;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__56991,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__56991,(1),null);
return com.fulcrologic.fulcro.ui_state_machines.set_aliased_value.cljs$core$IFn$_invoke$arity$3(e,k,v);
}),env,kvs);
}));

/** @this {Function} */
(com.fulcrologic.fulcro.ui_state_machines.set_aliased_value.cljs$lang$applyTo = (function (seq56967){
var G__56969 = cljs.core.first(seq56967);
var seq56967__$1 = cljs.core.next(seq56967);
var G__56970 = cljs.core.first(seq56967__$1);
var seq56967__$2 = cljs.core.next(seq56967__$1);
var G__56971 = cljs.core.first(seq56967__$2);
var seq56967__$3 = cljs.core.next(seq56967__$2);
var G__56972 = cljs.core.first(seq56967__$3);
var seq56967__$4 = cljs.core.next(seq56967__$3);
var G__56974 = cljs.core.first(seq56967__$4);
var seq56967__$5 = cljs.core.next(seq56967__$4);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__56969,G__56970,G__56971,G__56972,G__56974,seq56967__$5);
}));

(com.fulcrologic.fulcro.ui_state_machines.set_aliased_value.cljs$core$IFn$_invoke$arity$3 = (function (env,alias,new_value){
var temp__5823__auto__ = com.fulcrologic.fulcro.ui_state_machines.resolve_alias(env,alias);
if(cljs.core.truth_(temp__5823__auto__)){
var real_path = temp__5823__auto__;
return cljs.core.update.cljs$core$IFn$_invoke$arity$5(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138),cljs.core.assoc_in,real_path,new_value);
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",329,8,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Attempt to set a value on an invalid alias:",alias], null);
}),null)),null,(344),null,null,null);

return env;
}
}));

(com.fulcrologic.fulcro.ui_state_machines.set_aliased_value.cljs$lang$maxFixedArity = (5));

/**
 * Extracts aliased data from Fulcro state to construct arguments. If explicit-args is supplied,
 * then that is merged with aliased data, passed to the named plugin.  The return of the plugin is
 * the result of this function
 */
com.fulcrologic.fulcro.ui_state_machines.aliased_data = (function com$fulcrologic$fulcro$ui_state_machines$aliased_data(env){
var alias_keys = (function (){var G__57014 = com.fulcrologic.fulcro.ui_state_machines.lookup_state_machine_field(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","aliases","com.fulcrologic.fulcro.ui-state-machines/aliases",-320387324));
if((G__57014 == null)){
return null;
} else {
return cljs.core.keys(G__57014);
}
})();
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (result,k){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(result,k,com.fulcrologic.fulcro.ui_state_machines.alias_value(env,k));
}),cljs.core.PersistentArrayMap.EMPTY,alias_keys);
});
/**
 * Run a state-machine plugin. Extracts aliased data from Fulcro state to construct arguments. If explicit-args is supplied,
 * then that is merged with aliased data, passed to the named plugin.  The return of the plugin is
 * the result of this function. Plugins cannot side-effect, and are meant for providing external computation algorithms
 * that the state machine logic might need. For example, an actor representing a form might need to provide validation
 * logic.
 * 
 * If explicit-args are passed, then they will take *precedence* over the auto-extracted aliased data that is passed to
 * the plugin.
 */
com.fulcrologic.fulcro.ui_state_machines.run = (function com$fulcrologic$fulcro$ui_state_machines$run(var_args){
var G__57024 = arguments.length;
switch (G__57024) {
case 2:
return com.fulcrologic.fulcro.ui_state_machines.run.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.ui_state_machines.run.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.ui_state_machines.run.cljs$core$IFn$_invoke$arity$2 = (function (env,plugin_name){
return com.fulcrologic.fulcro.ui_state_machines.run.cljs$core$IFn$_invoke$arity$3(env,plugin_name,null);
}));

(com.fulcrologic.fulcro.ui_state_machines.run.cljs$core$IFn$_invoke$arity$3 = (function (env,plugin_name,explicit_args){
var temp__5825__auto__ = com.fulcrologic.fulcro.ui_state_machines.lookup_state_machine_field(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","plugins","com.fulcrologic.fulcro.ui-state-machines/plugins",-304622321),plugin_name], null));
if(cljs.core.truth_(temp__5825__auto__)){
var plugin = temp__5825__auto__;
var params = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.fulcro.ui_state_machines.aliased_data(env),explicit_args], 0));
return (plugin.cljs$core$IFn$_invoke$arity$1 ? plugin.cljs$core$IFn$_invoke$arity$1(params) : plugin.call(null, params));
} else {
return null;
}
}));

(com.fulcrologic.fulcro.ui_state_machines.run.cljs$lang$maxFixedArity = 3);

/**
 * Indicate that the state machine is done.
 */
com.fulcrologic.fulcro.ui_state_machines.exit = (function com$fulcrologic$fulcro$ui_state_machines$exit(env){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",366,3,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Exiting state machine",com.fulcrologic.fulcro.ui_state_machines.asm_id(env)], null);
}),null)),null,(345),null,null,null);

return com.fulcrologic.fulcro.ui_state_machines.activate(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","exit","com.fulcrologic.fulcro.ui-state-machines/exit",600820288));
});
com.fulcrologic.fulcro.ui_state_machines.apply_event_value = (function com$fulcrologic$fulcro$ui_state_machines$apply_event_value(env,p__57048){
var map__57050 = p__57048;
var map__57050__$1 = cljs.core.__destructure_map(map__57050);
var event_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57050__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868));
var event_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57050__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031));
var alias = new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","alias","com.fulcrologic.fulcro.ui-state-machines/alias",466933196).cljs$core$IFn$_invoke$arity$1(event_data);
var value = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(event_data);
var G__57051 = env;
if(cljs.core.truth_((function (){var and__5000__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","value-changed","com.fulcrologic.fulcro.ui-state-machines/value-changed",-292687479),event_id);
if(and__5000__auto__){
return alias;
} else {
return and__5000__auto__;
}
})())){
return com.fulcrologic.fulcro.ui_state_machines.set_aliased_value.cljs$core$IFn$_invoke$arity$3(G__57051,alias,value);
} else {
return G__57051;
}
});
/**
 * Create an env for use with other functions. Used internally, but may be used as a helper .
 */
com.fulcrologic.fulcro.ui_state_machines.state_machine_env = (function com$fulcrologic$fulcro$ui_state_machines$state_machine_env(var_args){
var G__57071 = arguments.length;
switch (G__57071) {
case 2:
return com.fulcrologic.fulcro.ui_state_machines.state_machine_env.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 5:
return com.fulcrologic.fulcro.ui_state_machines.state_machine_env.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return com.fulcrologic.fulcro.ui_state_machines.state_machine_env.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.ui_state_machines.state_machine_env.cljs$core$IFn$_invoke$arity$2 = (function (state_map,asm_id){
return com.fulcrologic.fulcro.ui_state_machines.state_machine_env.cljs$core$IFn$_invoke$arity$5(state_map,null,asm_id,null,null);
}));

(com.fulcrologic.fulcro.ui_state_machines.state_machine_env.cljs$core$IFn$_invoke$arity$5 = (function (state_map,ref,asm_id,event_id,event_data){
return com.fulcrologic.fulcro.ui_state_machines.state_machine_env.cljs$core$IFn$_invoke$arity$6(state_map,ref,asm_id,event_id,event_data,null);
}));

(com.fulcrologic.fulcro.ui_state_machines.state_machine_env.cljs$core$IFn$_invoke$arity$6 = (function (state_map,ref,asm_id,event_id,event_data,app){
var G__57082 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138),state_map,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),asm_id], null);
var G__57082__$1 = (cljs.core.truth_(event_id)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57082,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),event_id):G__57082);
var G__57082__$2 = (cljs.core.truth_(app)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57082__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","app","com.fulcrologic.fulcro.ui-state-machines/app",-1843831489),app):G__57082__$1);
var G__57082__$3 = ((cljs.core.seq(event_data))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57082__$2,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),event_data):G__57082__$2);
if(cljs.core.truth_(ref)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57082__$3,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","source-actor-ident","com.fulcrologic.fulcro.ui-state-machines/source-actor-ident",1906012799),ref);
} else {
return G__57082__$3;
}
}));

(com.fulcrologic.fulcro.ui_state_machines.state_machine_env.cljs$lang$maxFixedArity = 6);

/**
 * Associate a given component UI Fulcro class with an ident.  This is used with `begin!` in your actor map if the
 *   actor in question is going to be used with loads or mutations that return a value of that type. The actor's class
 *   can be retrieved for use in a handler using `(uism/actor-class env)`.
 * 
 *   ```
 *   (begin! ... {:person (uism/with-actor-class [:person/by-id 1] Person)})
 *   ```
 *   
 */
com.fulcrologic.fulcro.ui_state_machines.with_actor_class = (function com$fulcrologic$fulcro$ui_state_machines$with_actor_class(ident,class$){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(ident,cljs.core.assoc,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","class","com.fulcrologic.fulcro.ui-state-machines/class",438107210),class$);
});
/**
 * Convert one of the possible inputs for an actor into an actor component registry key.
 * 
 *   v can be an ident with actor metadata (see `with-actor-class`), a Fulcro runtime instance whose `get-ident` returns
 *   a valid ident, or a Fulcro component class with a singleton ident.
 * 
 *   Returns the Fulcro component registry key (a keyword) that will be able to find the real Fulcro
 *   component for `v`.
 */
com.fulcrologic.fulcro.ui_state_machines.any__GT_actor_component_registry_key = (function com$fulcrologic$fulcro$ui_state_machines$any__GT_actor_component_registry_key(v){
var temp__5825__auto__ = ((((edn_query_language.core.ident_QMARK_(v)) && (com.fulcrologic.fulcro.raw.components.component_class_QMARK_((function (){var G__57102 = v;
var G__57102__$1 = (((G__57102 == null))?null:cljs.core.meta(G__57102));
if((G__57102__$1 == null)){
return null;
} else {
return new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","class","com.fulcrologic.fulcro.ui-state-machines/class",438107210).cljs$core$IFn$_invoke$arity$1(G__57102__$1);
}
})()))))?(function (){var G__57103 = v;
var G__57103__$1 = (((G__57103 == null))?null:cljs.core.meta(G__57103));
if((G__57103__$1 == null)){
return null;
} else {
return new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","class","com.fulcrologic.fulcro.ui-state-machines/class",438107210).cljs$core$IFn$_invoke$arity$1(G__57103__$1);
}
})():(cljs.core.truth_((function (){var and__5000__auto__ = com.fulcrologic.fulcro.raw.components.component_instance_QMARK_(v);
if(and__5000__auto__){
return cljs.core.second(com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$1(v));
} else {
return and__5000__auto__;
}
})())?com.fulcrologic.fulcro.raw.components.component_type(v):(cljs.core.truth_((function (){var and__5000__auto__ = com.fulcrologic.fulcro.raw.components.component_class_QMARK_(v);
if(and__5000__auto__){
return cljs.core.second(com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(v,cljs.core.PersistentArrayMap.EMPTY));
} else {
return and__5000__auto__;
}
})())?v:null
)));
if(cljs.core.truth_(temp__5825__auto__)){
var cls = temp__5825__auto__;
var str_name = com.fulcrologic.fulcro.raw.components.component_name(cls);
var vec__57108 = clojure.string.split.cljs$core$IFn$_invoke$arity$2(str_name,/\//);
var ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57108,(0),null);
var nm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57108,(1),null);
var k = cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(ns,nm);
return k;
} else {
return null;
}
});
/**
 * Returns the Fulcro component class that for the given actor, if set.
 */
com.fulcrologic.fulcro.ui_state_machines.actor_class = (function com$fulcrologic$fulcro$ui_state_machines$actor_class(env,actor_name){
var actor__GT_component_name = com.fulcrologic.fulcro.ui_state_machines.asm_value(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446));
var cls = (function (){var G__57120 = actor_name;
var G__57120__$1 = (((G__57120 == null))?null:(actor__GT_component_name.cljs$core$IFn$_invoke$arity$1 ? actor__GT_component_name.cljs$core$IFn$_invoke$arity$1(G__57120) : actor__GT_component_name.call(null, G__57120)));
if((G__57120__$1 == null)){
return null;
} else {
return com.fulcrologic.fulcro.raw.components.registry_key__GT_class(G__57120__$1);
}
})();
return cls;
});
/**
 * Safely changes the ident of an actor.
 * 
 *   Makes sure ident is consistently reset and updates the actor class (if one is specified
 *   using `with-actor-class`).
 */
com.fulcrologic.fulcro.ui_state_machines.reset_actor_ident = (function com$fulcrologic$fulcro$ui_state_machines$reset_actor_ident(env,actor,ident){
var new_actor = com.fulcrologic.fulcro.ui_state_machines.any__GT_actor_component_registry_key(ident);
var actor__GT_ident = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(com.fulcrologic.fulcro.ui_state_machines.asm_value(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928)),actor,ident);
var ident__GT_actor = clojure.set.map_invert(actor__GT_ident);
var actor__GT_ident_path = com.fulcrologic.fulcro.ui_state_machines.asm_path(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928));
var actor__GT_component_path = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.ui_state_machines.asm_path(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446)),actor);
var ident__GT_actor_path = com.fulcrologic.fulcro.ui_state_machines.asm_path(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ident->actor","com.fulcrologic.fulcro.ui-state-machines/ident->actor",491940340));
var G__57161 = cljs.core.assoc_in(cljs.core.assoc_in(env,actor__GT_ident_path,actor__GT_ident),ident__GT_actor_path,ident__GT_actor);
if(cljs.core.truth_(new_actor)){
return cljs.core.assoc_in(G__57161,actor__GT_component_path,new_actor);
} else {
return G__57161;
}
});
/**
 * Similar to clojure.core/assoc but works on UISM env and aliases.
 */
com.fulcrologic.fulcro.ui_state_machines.assoc_aliased = (function com$fulcrologic$fulcro$ui_state_machines$assoc_aliased(var_args){
var G__57200 = arguments.length;
switch (G__57200) {
case 3:
return com.fulcrologic.fulcro.ui_state_machines.assoc_aliased.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
var args_arr__5751__auto__ = [];
var len__5726__auto___58007 = arguments.length;
var i__5727__auto___58008 = (0);
while(true){
if((i__5727__auto___58008 < len__5726__auto___58007)){
args_arr__5751__auto__.push((arguments[i__5727__auto___58008]));

var G__58009 = (i__5727__auto___58008 + (1));
i__5727__auto___58008 = G__58009;
continue;
} else {
}
break;
}

var argseq__5752__auto__ = ((((5) < args_arr__5751__auto__.length))?(new cljs.core.IndexedSeq(args_arr__5751__auto__.slice((5)),(0),null)):null);
return com.fulcrologic.fulcro.ui_state_machines.assoc_aliased.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__5752__auto__);

}
});

(com.fulcrologic.fulcro.ui_state_machines.assoc_aliased.cljs$core$IFn$_invoke$arity$variadic = (function (env,alias,new_value,alias_2,value_2,kv_pairs){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(com.fulcrologic.fulcro.ui_state_machines.set_aliased_value,env,alias,new_value,alias_2,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([value_2,kv_pairs], 0));
}));

/** @this {Function} */
(com.fulcrologic.fulcro.ui_state_machines.assoc_aliased.cljs$lang$applyTo = (function (seq57194){
var G__57195 = cljs.core.first(seq57194);
var seq57194__$1 = cljs.core.next(seq57194);
var G__57196 = cljs.core.first(seq57194__$1);
var seq57194__$2 = cljs.core.next(seq57194__$1);
var G__57197 = cljs.core.first(seq57194__$2);
var seq57194__$3 = cljs.core.next(seq57194__$2);
var G__57198 = cljs.core.first(seq57194__$3);
var seq57194__$4 = cljs.core.next(seq57194__$3);
var G__57199 = cljs.core.first(seq57194__$4);
var seq57194__$5 = cljs.core.next(seq57194__$4);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__57195,G__57196,G__57197,G__57198,G__57199,seq57194__$5);
}));

(com.fulcrologic.fulcro.ui_state_machines.assoc_aliased.cljs$core$IFn$_invoke$arity$3 = (function (env,alias,new_value){
return com.fulcrologic.fulcro.ui_state_machines.set_aliased_value.cljs$core$IFn$_invoke$arity$3(env,alias,new_value);
}));

(com.fulcrologic.fulcro.ui_state_machines.assoc_aliased.cljs$lang$maxFixedArity = (5));

/**
 * Similar to clojure.core/update but works on UISM env and aliases.
 */
com.fulcrologic.fulcro.ui_state_machines.update_aliased = (function com$fulcrologic$fulcro$ui_state_machines$update_aliased(var_args){
var G__57243 = arguments.length;
switch (G__57243) {
case 3:
return com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
var args_arr__5751__auto__ = [];
var len__5726__auto___58012 = arguments.length;
var i__5727__auto___58013 = (0);
while(true){
if((i__5727__auto___58013 < len__5726__auto___58012)){
args_arr__5751__auto__.push((arguments[i__5727__auto___58013]));

var G__58014 = (i__5727__auto___58013 + (1));
i__5727__auto___58013 = G__58014;
continue;
} else {
}
break;
}

var argseq__5752__auto__ = ((((6) < args_arr__5751__auto__.length))?(new cljs.core.IndexedSeq(args_arr__5751__auto__.slice((6)),(0),null)):null);
return com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),argseq__5752__auto__);

}
});

(com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$core$IFn$_invoke$arity$3 = (function (env,k,f){
return com.fulcrologic.fulcro.ui_state_machines.assoc_aliased.cljs$core$IFn$_invoke$arity$3(env,k,(function (){var G__57248 = com.fulcrologic.fulcro.ui_state_machines.alias_value(env,k);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__57248) : f.call(null, G__57248));
})());
}));

(com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$core$IFn$_invoke$arity$4 = (function (env,k,f,x){
return com.fulcrologic.fulcro.ui_state_machines.assoc_aliased.cljs$core$IFn$_invoke$arity$3(env,k,(function (){var G__57254 = com.fulcrologic.fulcro.ui_state_machines.alias_value(env,k);
var G__57255 = x;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__57254,G__57255) : f.call(null, G__57254,G__57255));
})());
}));

(com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$core$IFn$_invoke$arity$5 = (function (env,k,f,x,y){
return com.fulcrologic.fulcro.ui_state_machines.assoc_aliased.cljs$core$IFn$_invoke$arity$3(env,k,(function (){var G__57256 = com.fulcrologic.fulcro.ui_state_machines.alias_value(env,k);
var G__57257 = x;
var G__57258 = y;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__57256,G__57257,G__57258) : f.call(null, G__57256,G__57257,G__57258));
})());
}));

(com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$core$IFn$_invoke$arity$6 = (function (env,k,f,x,y,z){
return com.fulcrologic.fulcro.ui_state_machines.assoc_aliased.cljs$core$IFn$_invoke$arity$3(env,k,(function (){var G__57262 = com.fulcrologic.fulcro.ui_state_machines.alias_value(env,k);
var G__57263 = x;
var G__57264 = y;
var G__57265 = z;
return (f.cljs$core$IFn$_invoke$arity$4 ? f.cljs$core$IFn$_invoke$arity$4(G__57262,G__57263,G__57264,G__57265) : f.call(null, G__57262,G__57263,G__57264,G__57265));
})());
}));

(com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$core$IFn$_invoke$arity$variadic = (function (env,k,f,x,y,z,more){
return com.fulcrologic.fulcro.ui_state_machines.assoc_aliased.cljs$core$IFn$_invoke$arity$3(env,k,cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(f,com.fulcrologic.fulcro.ui_state_machines.alias_value(env,k),x,y,z,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([more], 0)));
}));

/** @this {Function} */
(com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$lang$applyTo = (function (seq57233){
var G__57234 = cljs.core.first(seq57233);
var seq57233__$1 = cljs.core.next(seq57233);
var G__57235 = cljs.core.first(seq57233__$1);
var seq57233__$2 = cljs.core.next(seq57233__$1);
var G__57236 = cljs.core.first(seq57233__$2);
var seq57233__$3 = cljs.core.next(seq57233__$2);
var G__57237 = cljs.core.first(seq57233__$3);
var seq57233__$4 = cljs.core.next(seq57233__$3);
var G__57238 = cljs.core.first(seq57233__$4);
var seq57233__$5 = cljs.core.next(seq57233__$4);
var G__57239 = cljs.core.first(seq57233__$5);
var seq57233__$6 = cljs.core.next(seq57233__$5);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__57234,G__57235,G__57236,G__57237,G__57238,G__57239,seq57233__$6);
}));

(com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$lang$maxFixedArity = (6));

/**
 * Similar to clojure.core/dissoc but works on UISM env and aliases.
 */
com.fulcrologic.fulcro.ui_state_machines.dissoc_aliased = (function com$fulcrologic$fulcro$ui_state_machines$dissoc_aliased(var_args){
var G__57283 = arguments.length;
switch (G__57283) {
case 1:
return com.fulcrologic.fulcro.ui_state_machines.dissoc_aliased.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.ui_state_machines.dissoc_aliased.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var args_arr__5751__auto__ = [];
var len__5726__auto___58017 = arguments.length;
var i__5727__auto___58018 = (0);
while(true){
if((i__5727__auto___58018 < len__5726__auto___58017)){
args_arr__5751__auto__.push((arguments[i__5727__auto___58018]));

var G__58019 = (i__5727__auto___58018 + (1));
i__5727__auto___58018 = G__58019;
continue;
} else {
}
break;
}

var argseq__5752__auto__ = ((((2) < args_arr__5751__auto__.length))?(new cljs.core.IndexedSeq(args_arr__5751__auto__.slice((2)),(0),null)):null);
return com.fulcrologic.fulcro.ui_state_machines.dissoc_aliased.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5752__auto__);

}
});

(com.fulcrologic.fulcro.ui_state_machines.dissoc_aliased.cljs$core$IFn$_invoke$arity$1 = (function (env){
return env;
}));

(com.fulcrologic.fulcro.ui_state_machines.dissoc_aliased.cljs$core$IFn$_invoke$arity$2 = (function (env,alias){
if((env == null)){
return null;
} else {
var path = com.fulcrologic.fulcro.ui_state_machines.resolve_alias(env,alias);
var sub_path = cljs.core.butlast(path);
var k = cljs.core.last(path);
var G__57289 = env;
var G__57290 = (function (p1__57270_SHARP_){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(p1__57270_SHARP_,sub_path,cljs.core.dissoc,k);
});
return (com.fulcrologic.fulcro.ui_state_machines.apply_action.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.ui_state_machines.apply_action.cljs$core$IFn$_invoke$arity$2(G__57289,G__57290) : com.fulcrologic.fulcro.ui_state_machines.apply_action.call(null, G__57289,G__57290));
}
}));

(com.fulcrologic.fulcro.ui_state_machines.dissoc_aliased.cljs$core$IFn$_invoke$arity$variadic = (function (env,k,ks){
while(true){
if((env == null)){
return null;
} else {
var ret = com.fulcrologic.fulcro.ui_state_machines.dissoc_aliased.cljs$core$IFn$_invoke$arity$2(env,k);
if(cljs.core.truth_(ks)){
var G__58022 = ret;
var G__58023 = cljs.core.first(ks);
var G__58024 = cljs.core.next(ks);
env = G__58022;
k = G__58023;
ks = G__58024;
continue;
} else {
return ret;
}
}
break;
}
}));

/** @this {Function} */
(com.fulcrologic.fulcro.ui_state_machines.dissoc_aliased.cljs$lang$applyTo = (function (seq57277){
var G__57278 = cljs.core.first(seq57277);
var seq57277__$1 = cljs.core.next(seq57277);
var G__57279 = cljs.core.first(seq57277__$1);
var seq57277__$2 = cljs.core.next(seq57277__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__57278,G__57279,seq57277__$2);
}));

(com.fulcrologic.fulcro.ui_state_machines.dissoc_aliased.cljs$lang$maxFixedArity = (2));

/**
 * Integrate an ident into any number of aliases in the state machine.
 *   Aliases must point to a list of idents.
 * 
 *   The named parameters can be specified any number of times. They are:
 * 
 *   - append:  A keyword (alias) to a list in your app state where this new object's ident should be appended. Will not append
 *   the ident if that ident is already in the list.
 *   - prepend: A keyword (alias) to a list in your app state where this new object's ident should be prepended. Will not append
 *   the ident if that ident is already in the list.
 */
com.fulcrologic.fulcro.ui_state_machines.integrate_ident = (function com$fulcrologic$fulcro$ui_state_machines$integrate_ident(var_args){
var args__5732__auto__ = [];
var len__5726__auto___58025 = arguments.length;
var i__5727__auto___58026 = (0);
while(true){
if((i__5727__auto___58026 < len__5726__auto___58025)){
args__5732__auto__.push((arguments[i__5727__auto___58026]));

var G__58027 = (i__5727__auto___58026 + (1));
i__5727__auto___58026 = G__58027;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return com.fulcrologic.fulcro.ui_state_machines.integrate_ident.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(com.fulcrologic.fulcro.ui_state_machines.integrate_ident.cljs$core$IFn$_invoke$arity$variadic = (function (env,ident,named_parameters){
var actions = cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),named_parameters);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (env__$1,p__57308){
var vec__57310 = p__57308;
var command = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57310,(0),null);
var alias_to_idents = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57310,(1),null);
var alias_value = com.fulcrologic.fulcro.ui_state_machines.alias_value(env__$1,alias_to_idents);
var already_has_ident_at_alias_QMARK_ = cljs.core.some((function (p1__57296_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__57296_SHARP_,ident);
}),alias_value);
var G__57315 = command;
var G__57315__$1 = (((G__57315 instanceof cljs.core.Keyword))?G__57315.fqn:null);
switch (G__57315__$1) {
case "prepend":
if(cljs.core.truth_(already_has_ident_at_alias_QMARK_)){
return env__$1;
} else {
return com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$core$IFn$_invoke$arity$3(env__$1,alias_to_idents,(function (p1__57298_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ident], null),p1__57298_SHARP_);
}));
}

break;
case "append":
if(cljs.core.truth_(already_has_ident_at_alias_QMARK_)){
return env__$1;
} else {
return com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$core$IFn$_invoke$arity$4(env__$1,alias_to_idents,cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),ident);
}

break;
default:
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Unknown operation for integrate-ident: ",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"command","command",-894540724),command,new cljs.core.Keyword(null,"arg","arg",-1747261837),alias_to_idents], null));

}
}),env,actions);
}));

(com.fulcrologic.fulcro.ui_state_machines.integrate_ident.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(com.fulcrologic.fulcro.ui_state_machines.integrate_ident.cljs$lang$applyTo = (function (seq57299){
var G__57300 = cljs.core.first(seq57299);
var seq57299__$1 = cljs.core.next(seq57299);
var G__57301 = cljs.core.first(seq57299__$1);
var seq57299__$2 = cljs.core.next(seq57299__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__57300,G__57301,seq57299__$2);
}));

/**
 * Removes an ident, if it exists, from an alias that points to a list of idents.
 */
com.fulcrologic.fulcro.ui_state_machines.remove_ident = (function com$fulcrologic$fulcro$ui_state_machines$remove_ident(env,ident,alias_to_idents){
var new_list = (function (old_list){
return cljs.core.vec(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__57320_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(ident,p1__57320_SHARP_);
}),old_list));
});
return com.fulcrologic.fulcro.ui_state_machines.update_aliased.cljs$core$IFn$_invoke$arity$3(env,alias_to_idents,new_list);
});
com.fulcrologic.fulcro.ui_state_machines.queue_mutations_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$queue_mutations_BANG_(app,env){
var queued_mutations = new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-mutations","com.fulcrologic.fulcro.ui-state-machines/queued-mutations",-652604760).cljs$core$IFn$_invoke$arity$1(env);
var seq__57339_58038 = cljs.core.seq(queued_mutations);
var chunk__57341_58039 = null;
var count__57342_58040 = (0);
var i__57343_58041 = (0);
while(true){
if((i__57343_58041 < count__57342_58040)){
var mutation_params_58042 = chunk__57341_58039.cljs$core$IIndexed$_nth$arity$2(null, i__57343_58041);
var abort_id_58044 = new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","abort-id","com.fulcrologic.fulcro.algorithms.tx-processing/abort-id",2068829184).cljs$core$IFn$_invoke$arity$1(mutation_params_58042);
com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$3(app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(com.fulcrologic.fulcro.ui_state_machines.mutation_delegate.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.ui_state_machines.mutation_delegate.cljs$core$IFn$_invoke$arity$1(mutation_params_58042) : com.fulcrologic.fulcro.ui_state_machines.mutation_delegate.call(null, mutation_params_58042))], null),(function (){var G__57353 = cljs.core.PersistentArrayMap.EMPTY;
if(cljs.core.truth_(abort_id_58044)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57353,new cljs.core.Keyword(null,"abort-id","abort-id",1559937819),abort_id_58044);
} else {
return G__57353;
}
})());


var G__58047 = seq__57339_58038;
var G__58048 = chunk__57341_58039;
var G__58049 = count__57342_58040;
var G__58050 = (i__57343_58041 + (1));
seq__57339_58038 = G__58047;
chunk__57341_58039 = G__58048;
count__57342_58040 = G__58049;
i__57343_58041 = G__58050;
continue;
} else {
var temp__5825__auto___58051 = cljs.core.seq(seq__57339_58038);
if(temp__5825__auto___58051){
var seq__57339_58052__$1 = temp__5825__auto___58051;
if(cljs.core.chunked_seq_QMARK_(seq__57339_58052__$1)){
var c__5525__auto___58053 = cljs.core.chunk_first(seq__57339_58052__$1);
var G__58054 = cljs.core.chunk_rest(seq__57339_58052__$1);
var G__58055 = c__5525__auto___58053;
var G__58056 = cljs.core.count(c__5525__auto___58053);
var G__58057 = (0);
seq__57339_58038 = G__58054;
chunk__57341_58039 = G__58055;
count__57342_58040 = G__58056;
i__57343_58041 = G__58057;
continue;
} else {
var mutation_params_58058 = cljs.core.first(seq__57339_58052__$1);
var abort_id_58059 = new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","abort-id","com.fulcrologic.fulcro.algorithms.tx-processing/abort-id",2068829184).cljs$core$IFn$_invoke$arity$1(mutation_params_58058);
com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$3(app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(com.fulcrologic.fulcro.ui_state_machines.mutation_delegate.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.ui_state_machines.mutation_delegate.cljs$core$IFn$_invoke$arity$1(mutation_params_58058) : com.fulcrologic.fulcro.ui_state_machines.mutation_delegate.call(null, mutation_params_58058))], null),(function (){var G__57359 = cljs.core.PersistentArrayMap.EMPTY;
if(cljs.core.truth_(abort_id_58059)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57359,new cljs.core.Keyword(null,"abort-id","abort-id",1559937819),abort_id_58059);
} else {
return G__57359;
}
})());


var G__58060 = cljs.core.next(seq__57339_58052__$1);
var G__58061 = null;
var G__58062 = (0);
var G__58063 = (0);
seq__57339_58038 = G__58060;
chunk__57341_58039 = G__58061;
count__57342_58040 = G__58062;
i__57343_58041 = G__58063;
continue;
}
} else {
}
}
break;
}

return null;
});
com.fulcrologic.fulcro.ui_state_machines.queue_transactions_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$queue_transactions_BANG_(app,env){
new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","fulcro-app","com.fulcrologic.fulcro.ui-state-machines/fulcro-app",-163883279),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","env","com.fulcrologic.fulcro.ui-state-machines/env",396092855),com.fulcrologic.guardrails.core._EQ__GT_,cljs.core.nil_QMARK_], null);

var map__57365 = env;
var map__57365__$1 = cljs.core.__destructure_map(map__57365);
var queued_transactions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57365__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-transactions","com.fulcrologic.fulcro.ui-state-machines/queued-transactions",-998495741));
var seq__57366_58064 = cljs.core.seq(queued_transactions);
var chunk__57367_58065 = null;
var count__57368_58066 = (0);
var i__57369_58067 = (0);
while(true){
if((i__57369_58067 < count__57368_58066)){
var map__57381_58068 = chunk__57367_58065.cljs$core$IIndexed$_nth$arity$2(null, i__57369_58067);
var map__57381_58069__$1 = cljs.core.__destructure_map(map__57381_58068);
var txn_58070 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57381_58069__$1,new cljs.core.Keyword(null,"txn","txn",-469204789));
var options_58071 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57381_58069__$1,new cljs.core.Keyword(null,"options","options",99638489));
com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$3(app,txn_58070,options_58071);


var G__58072 = seq__57366_58064;
var G__58073 = chunk__57367_58065;
var G__58074 = count__57368_58066;
var G__58075 = (i__57369_58067 + (1));
seq__57366_58064 = G__58072;
chunk__57367_58065 = G__58073;
count__57368_58066 = G__58074;
i__57369_58067 = G__58075;
continue;
} else {
var temp__5825__auto___58076 = cljs.core.seq(seq__57366_58064);
if(temp__5825__auto___58076){
var seq__57366_58077__$1 = temp__5825__auto___58076;
if(cljs.core.chunked_seq_QMARK_(seq__57366_58077__$1)){
var c__5525__auto___58079 = cljs.core.chunk_first(seq__57366_58077__$1);
var G__58080 = cljs.core.chunk_rest(seq__57366_58077__$1);
var G__58081 = c__5525__auto___58079;
var G__58082 = cljs.core.count(c__5525__auto___58079);
var G__58083 = (0);
seq__57366_58064 = G__58080;
chunk__57367_58065 = G__58081;
count__57368_58066 = G__58082;
i__57369_58067 = G__58083;
continue;
} else {
var map__57387_58084 = cljs.core.first(seq__57366_58077__$1);
var map__57387_58085__$1 = cljs.core.__destructure_map(map__57387_58084);
var txn_58086 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57387_58085__$1,new cljs.core.Keyword(null,"txn","txn",-469204789));
var options_58087 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57387_58085__$1,new cljs.core.Keyword(null,"options","options",99638489));
com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$3(app,txn_58086,options_58087);


var G__58088 = cljs.core.next(seq__57366_58077__$1);
var G__58089 = null;
var G__58090 = (0);
var G__58091 = (0);
seq__57366_58064 = G__58088;
chunk__57367_58065 = G__58089;
count__57368_58066 = G__58090;
i__57369_58067 = G__58091;
continue;
}
} else {
}
}
break;
}

return null;
});
/**
 * Internal implementation. Queue a load of an actor.
 */
com.fulcrologic.fulcro.ui_state_machines.queue_actor_load_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$queue_actor_load_BANG_(app,env,actor_name,component_class,load_options){
var actor_ident = com.fulcrologic.fulcro.ui_state_machines.actor__GT_ident(env,actor_name);
var cls = (function (){var or__5002__auto__ = component_class;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return com.fulcrologic.fulcro.ui_state_machines.actor_class(env,actor_name);
}
})();
if((cls == null)){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",567,7,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Cannot run load. Counld not derive Fulcro class (and none was configured) for ",actor_name,"See https://book.fulcrologic.com/#err-uism-load-cant-find-fulcro-class"], null);
}),null)),null,(350),null,null,null);
} else {
com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(app,actor_ident,cls,load_options);
}

return null;
});
/**
 * Internal implementation. Queue a load.
 */
com.fulcrologic.fulcro.ui_state_machines.queue_normal_load_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$queue_normal_load_BANG_(app,query_key,component_class,load_options){
if((query_key == null)){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",576,5,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Cannot run load. query-key cannot be nil. See https://book.fulcrologic.com/#err-uism-load-nil-query-key"], null);
}),null)),null,(351),null,null,null);
} else {
return com.fulcrologic.fulcro.data_fetch.load_BANG_.cljs$core$IFn$_invoke$arity$4(app,query_key,component_class,load_options);
}
});
com.fulcrologic.fulcro.ui_state_machines.handle_load_error_STAR_ = (function com$fulcrologic$fulcro$ui_state_machines$handle_load_error_STAR_(app,load_request){
var map__57410 = (function (){var G__57411 = load_request;
if((G__57411 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897).cljs$core$IFn$_invoke$arity$1(G__57411);
}
})();
var map__57410__$1 = cljs.core.__destructure_map(map__57410);
var asm_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57410__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394));
var error_event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57410__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-event","com.fulcrologic.fulcro.ui-state-machines/error-event",-1577789384));
var error_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57410__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-data","com.fulcrologic.fulcro.ui-state-machines/error-data",1731316624));
if(cljs.core.truth_((function (){var and__5000__auto__ = asm_id;
if(cljs.core.truth_(and__5000__auto__)){
return error_event;
} else {
return and__5000__auto__;
}
})())){
com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__57413 = (function (){var G__57416 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),asm_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),error_event], null);
if(cljs.core.truth_(error_data)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57416,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),error_data);
} else {
return G__57416;
}
})();
return (com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.cljs$core$IFn$_invoke$arity$1(G__57413) : com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.call(null, G__57413));
})()], null));
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",588,9,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["A fallback occurred, but no event was defined by the client. Sending generic ::uism/load-error event. See https://book.fulcrologic.com/#warn-uism-fallback-missing-event"], null);
}),null)),null,(354),null,null,null);

com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__57419 = (function (){var G__57420 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),asm_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load-error","com.fulcrologic.fulcro.ui-state-machines/load-error",1046994541)], null);
return G__57420;
})();
return (com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.cljs$core$IFn$_invoke$arity$1(G__57419) : com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.call(null, G__57419));
})()], null));
}

return null;
});
/**
 * 
 */
com.fulcrologic.fulcro.ui_state_machines.handle_load_error = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","handle-load-error","com.fulcrologic.fulcro.ui-state-machines/handle-load-error",145527222,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","handle-load-error","com.fulcrologic.fulcro.ui-state-machines/handle-load-error",145527222,null),(function (fulcro_mutation_env_symbol){
var params = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function com$fulcrologic$fulcro$ui_state_machines$action(p__57426){
var map__57427 = p__57426;
var map__57427__$1 = cljs.core.__destructure_map(map__57427);
var app = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57427__$1,new cljs.core.Keyword(null,"app","app",-560961707));
var _STAR_after_render_STAR__orig_val__57431_58099 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__57432_58100 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__57432_58100);

try{com.fulcrologic.fulcro.ui_state_machines.handle_load_error_STAR_(app,new cljs.core.Keyword(null,"load-params","load-params",38753949).cljs$core$IFn$_invoke$arity$1(params));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__57431_58099);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__57433 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__57434 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__57434);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__57433);
}})], null);
}));
com.fulcrologic.fulcro.ui_state_machines.queue_loads_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$queue_loads_BANG_(app,env){
var queued_loads = new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-loads","com.fulcrologic.fulcro.ui-state-machines/queued-loads",1234134533).cljs$core$IFn$_invoke$arity$1(env);
var seq__57440_58101 = cljs.core.seq(queued_loads);
var chunk__57442_58102 = null;
var count__57443_58103 = (0);
var i__57444_58104 = (0);
while(true){
if((i__57444_58104 < count__57443_58103)){
var map__57457_58105 = chunk__57442_58102.cljs$core$IIndexed$_nth$arity$2(null, i__57444_58104);
var map__57457_58106__$1 = cljs.core.__destructure_map(map__57457_58105);
var load_params_58107 = map__57457_58106__$1;
var component_class_58108 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57457_58106__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.components","component-class","com.fulcrologic.fulcro.components/component-class",-316082369));
var actor_name_58109 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57457_58106__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310));
var query_key_58110 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57457_58106__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","query-key","com.fulcrologic.fulcro.ui-state-machines/query-key",-1158698423));
var load_options_58111 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57457_58106__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load-options","com.fulcrologic.fulcro.ui-state-machines/load-options",-2118314091));
if(cljs.core.truth_(actor_name_58109)){
com.fulcrologic.fulcro.ui_state_machines.queue_actor_load_BANG_(app,env,actor_name_58109,component_class_58108,load_options_58111);
} else {
com.fulcrologic.fulcro.ui_state_machines.queue_normal_load_BANG_(app,query_key_58110,component_class_58108,load_options_58111);
}


var G__58112 = seq__57440_58101;
var G__58113 = chunk__57442_58102;
var G__58114 = count__57443_58103;
var G__58115 = (i__57444_58104 + (1));
seq__57440_58101 = G__58112;
chunk__57442_58102 = G__58113;
count__57443_58103 = G__58114;
i__57444_58104 = G__58115;
continue;
} else {
var temp__5825__auto___58116 = cljs.core.seq(seq__57440_58101);
if(temp__5825__auto___58116){
var seq__57440_58117__$1 = temp__5825__auto___58116;
if(cljs.core.chunked_seq_QMARK_(seq__57440_58117__$1)){
var c__5525__auto___58118 = cljs.core.chunk_first(seq__57440_58117__$1);
var G__58119 = cljs.core.chunk_rest(seq__57440_58117__$1);
var G__58120 = c__5525__auto___58118;
var G__58121 = cljs.core.count(c__5525__auto___58118);
var G__58122 = (0);
seq__57440_58101 = G__58119;
chunk__57442_58102 = G__58120;
count__57443_58103 = G__58121;
i__57444_58104 = G__58122;
continue;
} else {
var map__57461_58124 = cljs.core.first(seq__57440_58117__$1);
var map__57461_58125__$1 = cljs.core.__destructure_map(map__57461_58124);
var load_params_58126 = map__57461_58125__$1;
var component_class_58127 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57461_58125__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.components","component-class","com.fulcrologic.fulcro.components/component-class",-316082369));
var actor_name_58128 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57461_58125__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310));
var query_key_58129 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57461_58125__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","query-key","com.fulcrologic.fulcro.ui-state-machines/query-key",-1158698423));
var load_options_58130 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57461_58125__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load-options","com.fulcrologic.fulcro.ui-state-machines/load-options",-2118314091));
if(cljs.core.truth_(actor_name_58128)){
com.fulcrologic.fulcro.ui_state_machines.queue_actor_load_BANG_(app,env,actor_name_58128,component_class_58127,load_options_58130);
} else {
com.fulcrologic.fulcro.ui_state_machines.queue_normal_load_BANG_(app,query_key_58129,component_class_58127,load_options_58130);
}


var G__58131 = cljs.core.next(seq__57440_58117__$1);
var G__58132 = null;
var G__58133 = (0);
var G__58134 = (0);
seq__57440_58101 = G__58131;
chunk__57442_58102 = G__58132;
count__57443_58103 = G__58133;
i__57444_58104 = G__58134;
continue;
}
} else {
}
}
break;
}

return null;
});
/**
 * Put the evolved state-map from an env into a (Fulcro) state-atom
 */
com.fulcrologic.fulcro.ui_state_machines.update_fulcro_state_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$update_fulcro_state_BANG_(p__57465,state_atom){
var map__57466 = p__57465;
var map__57466__$1 = cljs.core.__destructure_map(map__57466);
var env = map__57466__$1;
var asm_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57466__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394));
var next_state = (cljs.core.truth_(env)?com.fulcrologic.fulcro.ui_state_machines.asm_value(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193)):null);
var temp__5825__auto___58135 = (function (){var G__57469 = new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138).cljs$core$IFn$_invoke$arity$1(env);
if((G__57469 == null)){
return null;
} else {
var G__57471 = G__57469;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","exit","com.fulcrologic.fulcro.ui-state-machines/exit",600820288),next_state)){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(G__57471,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),cljs.core.dissoc,asm_id);
} else {
return G__57471;
}
}
})();
if(cljs.core.truth_(temp__5825__auto___58135)){
var new_fulcro_state_58139 = temp__5825__auto___58135;
cljs.core.reset_BANG_(state_atom,new_fulcro_state_58139);
} else {
}

return null;
});
/**
 * Add a timeout named `timer-id` to the `env` that will send `event-id` with `event-data` event
 * after `timeout` (in milliseconds) unless an event (i.e. some-event-id) occurs where a call
 * to `(cancel-on-events some-event-id)` returns true.
 * 
 * Setting a timeout on an existing timer-id will cancel the current one and start the new one.
 * 
 * `cancel-on-events` is a predicate that will be passed an event ID on events. If it returns true
 *  on an event before the timeout fires, then the timeout will be auto-cancelled. If not specified, then
 *  it defaults to `(constantly false)`.
 */
com.fulcrologic.fulcro.ui_state_machines.set_timeout = (function com$fulcrologic$fulcro$ui_state_machines$set_timeout(var_args){
var G__57479 = arguments.length;
switch (G__57479) {
case 5:
return com.fulcrologic.fulcro.ui_state_machines.set_timeout.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return com.fulcrologic.fulcro.ui_state_machines.set_timeout.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.ui_state_machines.set_timeout.cljs$core$IFn$_invoke$arity$5 = (function (env,timer_id,event_id,event_data,timeout){
return com.fulcrologic.fulcro.ui_state_machines.set_timeout.cljs$core$IFn$_invoke$arity$6(env,timer_id,event_id,event_data,timeout,cljs.core.constantly(false));
}));

(com.fulcrologic.fulcro.ui_state_machines.set_timeout.cljs$core$IFn$_invoke$arity$6 = (function (env,timer_id,event_id,event_data,timeout,cancel_on_events){
var descriptor = (function (){var G__57487 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout","com.fulcrologic.fulcro.ui-state-machines/timeout",2023435248),timeout,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271),timer_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","js-timer","com.fulcrologic.fulcro.ui-state-machines/js-timer",1529432544),cljs.core.with_meta(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"timer","timer",-1266967739),true], null)),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),event_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","cancel-on","com.fulcrologic.fulcro.ui-state-machines/cancel-on",1719737833),cljs.core.with_meta(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cancel-on","cancel-on",-479584301),cancel_on_events], null))], null);
if(cljs.core.truth_(event_data)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57487,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),event_data);
} else {
return G__57487;
}
})();
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-timeouts","com.fulcrologic.fulcro.ui-state-machines/queued-timeouts",1249273499),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),descriptor);
}));

(com.fulcrologic.fulcro.ui_state_machines.set_timeout.cljs$lang$maxFixedArity = 6);

/**
 * Clear a scheduled timeout (if it has yet to fire).  Harmless to call if the timeout is gone. This call takes
 *   effect immediately (in terms of making sure the timeout does not fire).
 */
com.fulcrologic.fulcro.ui_state_machines.clear_timeout_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$clear_timeout_BANG_(env,timer_id){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",647,3,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Clearing timeout ",com.fulcrologic.fulcro.ui_state_machines.asm_id(env),":",timer_id], null);
}),null)),null,(355),null,null,null);

var map__57497 = com.fulcrologic.fulcro.ui_state_machines.asm_value(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-timers","com.fulcrologic.fulcro.ui-state-machines/active-timers",2018369193),timer_id], null));
var map__57497__$1 = cljs.core.__destructure_map(map__57497);
var js_timer = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57497__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","js-timer","com.fulcrologic.fulcro.ui-state-machines/js-timer",1529432544));
var real_js_timer = new cljs.core.Keyword(null,"timer","timer",-1266967739).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(js_timer));
if(cljs.core.truth_(real_js_timer)){
com.fulcrologic.fulcro.ui_state_machines.clear_js_timeout_BANG_(real_js_timer);
} else {
}

return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(env,com.fulcrologic.fulcro.ui_state_machines.asm_path(env,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-timers","com.fulcrologic.fulcro.ui-state-machines/active-timers",2018369193)], null)),cljs.core.dissoc,timer_id);
});
/**
 * Returns an event handler that can process events according to a state machine
 *   ::uism/events definition of the current event/state in `env`.
 *   If a definition cannot be found then it returns nil.
 */
com.fulcrologic.fulcro.ui_state_machines.generic_event_handler = (function com$fulcrologic$fulcro$ui_state_machines$generic_event_handler(original_env){
var smdef = com.fulcrologic.fulcro.ui_state_machines.lookup_state_machine(original_env);
var current_state_id = com.fulcrologic.fulcro.ui_state_machines.asm_value(original_env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193));
var current_event = new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868).cljs$core$IFn$_invoke$arity$1(original_env);
var map__57502 = (function (){var G__57503 = smdef;
var G__57503__$1 = (((G__57503 == null))?null:new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308).cljs$core$IFn$_invoke$arity$1(G__57503));
var G__57503__$2 = (((G__57503__$1 == null))?null:cljs.core.get.cljs$core$IFn$_invoke$arity$2(G__57503__$1,current_state_id));
var G__57503__$3 = (((G__57503__$2 == null))?null:new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","events","com.fulcrologic.fulcro.ui-state-machines/events",301935363).cljs$core$IFn$_invoke$arity$1(G__57503__$2));
if((G__57503__$3 == null)){
return null;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(G__57503__$3,current_event);
}
})();
var map__57502__$1 = cljs.core.__destructure_map(map__57502);
var event_def = map__57502__$1;
var event_predicate = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57502__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-predicate","com.fulcrologic.fulcro.ui-state-machines/event-predicate",620527987));
var handler = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57502__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182));
var target_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57502__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-state","com.fulcrologic.fulcro.ui-state-machines/target-state",-332924947));
if(cljs.core.truth_(event_def)){
return (function (env){
if(cljs.core.truth_((function (){var or__5002__auto__ = (event_predicate == null);
if(or__5002__auto__){
return or__5002__auto__;
} else {
var and__5000__auto__ = event_predicate;
if(cljs.core.truth_(and__5000__auto__)){
return (event_predicate.cljs$core$IFn$_invoke$arity$1 ? event_predicate.cljs$core$IFn$_invoke$arity$1(env) : event_predicate.call(null, env));
} else {
return and__5000__auto__;
}
}
})())){
var env__$1 = (cljs.core.truth_(handler)?(function (){var or__5002__auto__ = (handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(env) : handler.call(null, env));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return env;
}
})():env);
var post_handler_state = com.fulcrologic.fulcro.ui_state_machines.asm_value(env__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193));
var state_changed_QMARK_ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(post_handler_state,current_state_id);
var G__57510 = env__$1;
if(cljs.core.truth_((function (){var and__5000__auto__ = (!(state_changed_QMARK_));
if(and__5000__auto__){
return target_state;
} else {
return and__5000__auto__;
}
})())){
return com.fulcrologic.fulcro.ui_state_machines.activate(G__57510,target_state);
} else {
return G__57510;
}
} else {
return original_env;
}
});
} else {
return null;
}
});
/**
 * Find the handler for the active state in the current env.
 */
com.fulcrologic.fulcro.ui_state_machines.active_state_handler = (function com$fulcrologic$fulcro$ui_state_machines$active_state_handler(env){
var smdef = com.fulcrologic.fulcro.ui_state_machines.lookup_state_machine(env);
var current_state = com.fulcrologic.fulcro.ui_state_machines.asm_value(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193));
var handler = (function (){var or__5002__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(smdef,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","states","com.fulcrologic.fulcro.ui-state-machines/states",-1501579308),current_state,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","handler","com.fulcrologic.fulcro.ui-state-machines/handler",1642623182)], null));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return com.fulcrologic.fulcro.ui_state_machines.generic_event_handler(env);
}
})();
if(cljs.core.truth_(handler)){
return handler;
} else {
var map__57516 = env;
var map__57516__$1 = cljs.core.__destructure_map(map__57516);
var event_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57516__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",689,9,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["UNEXPECTED EVENT: Did not find a way to handle event",event_id,"in the current active state:",current_state,"See https://book.fulcrologic.com/#warn-uism-unexpected-event"], null);
}),null)),null,(356),null,null,null);

return cljs.core.identity;
}
});
/**
 * Returns a vector of things to refresh in Fulcro based on the final state of an active SM env.
 */
com.fulcrologic.fulcro.ui_state_machines.ui_refresh_list = (function com$fulcrologic$fulcro$ui_state_machines$ui_refresh_list(env){
var actor_idents = (function (){var or__5002__auto__ = (function (){var G__57522 = env;
var G__57522__$1 = (((G__57522 == null))?null:cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(G__57522,com.fulcrologic.fulcro.ui_state_machines.asm_path(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928))));
var G__57522__$2 = (((G__57522__$1 == null))?null:cljs.core.vals(G__57522__$1));
if((G__57522__$2 == null)){
return null;
} else {
return cljs.core.vec(G__57522__$2);
}
})();
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})();
return actor_idents;
});
com.fulcrologic.fulcro.ui_state_machines.get_js_timer = (function com$fulcrologic$fulcro$ui_state_machines$get_js_timer(env,timer_id){
var G__57526 = com.fulcrologic.fulcro.ui_state_machines.asm_value(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-timers","com.fulcrologic.fulcro.ui-state-machines/active-timers",2018369193),timer_id], null));
var G__57526__$1 = (((G__57526 == null))?null:new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","js-timer","com.fulcrologic.fulcro.ui-state-machines/js-timer",1529432544).cljs$core$IFn$_invoke$arity$1(G__57526));
var G__57526__$2 = (((G__57526__$1 == null))?null:cljs.core.meta(G__57526__$1));
if((G__57526__$2 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"timer","timer",-1266967739).cljs$core$IFn$_invoke$arity$1(G__57526__$2);
}
});
/**
 * INTERNAL: actually schedule the timers that were submitted during the event handler.
 */
com.fulcrologic.fulcro.ui_state_machines.schedule_timeouts_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$schedule_timeouts_BANG_(app,env){
var map__57532 = env;
var map__57532__$1 = cljs.core.__destructure_map(map__57532);
var queued_timeouts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57532__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-timeouts","com.fulcrologic.fulcro.ui-state-machines/queued-timeouts",1249273499));
var asm_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57532__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (env__$1,p__57535){
var map__57536 = p__57535;
var map__57536__$1 = cljs.core.__destructure_map(map__57536);
var descriptor = map__57536__$1;
var timeout = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57536__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timeout","com.fulcrologic.fulcro.ui-state-machines/timeout",2023435248));
var event_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57536__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868));
var event_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57536__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031));
var timer_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57536__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","timer-id","com.fulcrologic.fulcro.ui-state-machines/timer-id",-720883271));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",710,9,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Setting timeout",timer_id,"on",asm_id,"to send",event_id,"in",timeout,"ms"], null);
}),null)),null,(357),null,null,null);

var current_timer = com.fulcrologic.fulcro.ui_state_machines.get_js_timer(env__$1,timer_id);
var js_timer = com.fulcrologic.fulcro.ui_state_machines.set_js_timeout_BANG_((function (){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",713,48,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, ["TIMEOUT on",asm_id,"due to timer",timer_id,"after",timeout,"ms"], null);
}),null)),null,(358),null,null,null);

return com.fulcrologic.fulcro.ui_state_machines.trigger_BANG_.cljs$core$IFn$_invoke$arity$4(app,asm_id,event_id,(function (){var or__5002__auto__ = event_data;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})());
}),timeout);
var descriptor__$1 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$6(descriptor,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","js-timer","com.fulcrologic.fulcro.ui-state-machines/js-timer",1529432544)], null),cljs.core.vary_meta,cljs.core.assoc,new cljs.core.Keyword(null,"timer","timer",-1266967739),js_timer);
if(cljs.core.truth_(current_timer)){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",717,13,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Clearing old timer (new timer supercedes)"], null);
}),null)),null,(359),null,null,null);

com.fulcrologic.fulcro.ui_state_machines.clear_js_timeout_BANG_(current_timer);
} else {
}

return cljs.core.assoc_in(env__$1,com.fulcrologic.fulcro.ui_state_machines.asm_path(env__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-timers","com.fulcrologic.fulcro.ui-state-machines/active-timers",2018369193),timer_id], null)),descriptor__$1);
}),env,queued_timeouts);
});
/**
 * Processes the auto-cancel of events. This is a normal part of the internals, but can be used in handlers
 *   to simulate a *different* event than acutally occured for the purpose of clearing sets of timers that
 *   auto-cancel on other events than what occurred.
 */
com.fulcrologic.fulcro.ui_state_machines.clear_timeouts_on_event_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$clear_timeouts_on_event_BANG_(env,event_id){
var active_timers = com.fulcrologic.fulcro.ui_state_machines.asm_value(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-timers","com.fulcrologic.fulcro.ui-state-machines/active-timers",2018369193));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (env__$1,timer_id){
var cancel_predicate = (function (){var G__57554 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(active_timers,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [timer_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","cancel-on","com.fulcrologic.fulcro.ui-state-machines/cancel-on",1719737833)], null));
var G__57554__$1 = (((G__57554 == null))?null:cljs.core.meta(G__57554));
if((G__57554__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"cancel-on","cancel-on",-479584301).cljs$core$IFn$_invoke$arity$1(G__57554__$1);
}
})();
if(cljs.core.truth_(cancel_predicate)){
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",734,13,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["INTERNAL ERROR: Cancel predicate was nil for timer ",timer_id,"See https://book.fulcrologic.com/#err-uism-cancel-pred-nil"], null);
}),null)),null,(360),null,null,null);
}

if(cljs.core.truth_((function (){var and__5000__auto__ = cancel_predicate;
if(cljs.core.truth_(and__5000__auto__)){
return (cancel_predicate.cljs$core$IFn$_invoke$arity$1 ? cancel_predicate.cljs$core$IFn$_invoke$arity$1(event_id) : cancel_predicate.call(null, event_id));
} else {
return and__5000__auto__;
}
})())){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",737,15,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Cancelling timer ",timer_id,"on",com.fulcrologic.fulcro.ui_state_machines.asm_id(env__$1),"due to event",event_id], null);
}),null)),null,(361),null,null,null);

return com.fulcrologic.fulcro.ui_state_machines.clear_timeout_BANG_(env__$1,timer_id);
} else {
return env__$1;
}
}),env,cljs.core.keys(active_timers));
});
cljs.spec.alpha.def_impl(new cljs.core.Keyword("fulcro","app","fulcro/app",1396752010),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","fulcro-app","com.fulcrologic.fulcro.ui-state-machines/fulcro-app",-163883279),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","fulcro-app","com.fulcrologic.fulcro.ui-state-machines/fulcro-app",-163883279));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("fulcro","state","fulcro/state",1036558546),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","atom","com.fulcrologic.fulcro.ui-state-machines/atom",1971230309),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","atom","com.fulcrologic.fulcro.ui-state-machines/atom",1971230309));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-env","com.fulcrologic.fulcro.ui-state-machines/mutation-env",-350046782),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("fulcro","state","fulcro/state",1036558546),new cljs.core.Keyword("fulcro","app","fulcro/app",1396752010)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("fulcro","state","fulcro/state",1036558546),new cljs.core.Keyword("fulcro","app","fulcro/app",1396752010)], null),null,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__57566){
return cljs.core.map_QMARK_(G__57566);
}),(function (G__57566){
return cljs.core.contains_QMARK_(G__57566,new cljs.core.Keyword(null,"state","state",-1988618099));
}),(function (G__57566){
return cljs.core.contains_QMARK_(G__57566,new cljs.core.Keyword(null,"app","app",-560961707));
})], null),(function (G__57566){
return ((cljs.core.map_QMARK_(G__57566)) && (((cljs.core.contains_QMARK_(G__57566,new cljs.core.Keyword(null,"state","state",-1988618099))) && (cljs.core.contains_QMARK_(G__57566,new cljs.core.Keyword(null,"app","app",-560961707))))));
}),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("fulcro","state","fulcro/state",1036558546),new cljs.core.Keyword("fulcro","app","fulcro/app",1396752010)], null),null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"state","state",-1988618099),new cljs.core.Keyword(null,"app","app",-560961707)], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"state","state",-1988618099))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"app","app",-560961707)))], null),null])));
com.fulcrologic.fulcro.ui_state_machines.trigger_queued_events_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$trigger_queued_events_BANG_(mutation_env,queued_triggers,refresh_list){
var result = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (refresh_list__$1,event){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(refresh_list__$1,(com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event_BANG_.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event_BANG_.cljs$core$IFn$_invoke$arity$2(mutation_env,event) : com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event_BANG_.call(null, mutation_env,event)));
}),refresh_list,queued_triggers);
return result;
});
/**
 * IMPLEMENTATION DETAIL. Low-level implementation of triggering a state machine event. Does no direct interaction with
 *   Fulcro UI refresh.  Use `trigger!` instead.
 * 
 *   - `env` - A fulcro mutation env, containing at least the state atom and optionally the ref of the
 *  component that was the source of the event.
 *   - params - The parameters for the event
 * 
 *   Returns a vector of actor idents that should be refreshed.
 */
com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$trigger_state_machine_event_BANG_(p__57606,p__57607){
var map__57609 = p__57606;
var map__57609__$1 = cljs.core.__destructure_map(map__57609);
var mutation_env = map__57609__$1;
var app = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57609__$1,new cljs.core.Keyword(null,"app","app",-560961707));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57609__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57609__$1,new cljs.core.Keyword(null,"ref","ref",1289896967));
var map__57610 = p__57607;
var map__57610__$1 = cljs.core.__destructure_map(map__57610);
var params = map__57610__$1;
var event_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57610__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868));
var event_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57610__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031));
var asm_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57610__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",768,3,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Trigger",asm_id,event_id], null);
}),null)),null,(362),null,null,null);

if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),asm_id], null)))){
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",770,5,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Attempted to trigger event ",event_id,"on state machine",asm_id,", but that state machine has not been started (call begin! first). See https://book.fulcrologic.com/#err-uism-trigger-not-started-machine"], null);
}),null)),null,(363),null,null,null);
}

var sm_env = com.fulcrologic.fulcro.ui_state_machines.state_machine_env.cljs$core$IFn$_invoke$arity$6(cljs.core.deref(state),ref,asm_id,event_id,event_data,app);
var handler = com.fulcrologic.fulcro.ui_state_machines.active_state_handler(sm_env);
var valued_env = com.fulcrologic.fulcro.ui_state_machines.apply_event_value(sm_env,params);
var handled_env = (function (){try{var _STAR_after_render_STAR__orig_val__57621 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__57622 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__57622);

try{var G__57625 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(valued_env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","fulcro-app","com.fulcrologic.fulcro.ui-state-machines/fulcro-app",-163883279),app);
return (handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(G__57625) : handler.call(null, G__57625));
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__57621);
}}catch (e57617){var e = e57617;
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",778,26,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,"Handler for event",event_id,"threw an exception for ASM ID",asm_id,"See https://book.fulcrologic.com/#err-uism-evt-handler-exc"], null);
}),null)),null,(364),null,null,null);

return null;
}})();
var final_env = (function (){var e = (function (){var or__5002__auto__ = handled_env;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return valued_env;
}
})();
var e__$1 = com.fulcrologic.fulcro.ui_state_machines.clear_timeouts_on_event_BANG_(e,event_id);
return com.fulcrologic.fulcro.ui_state_machines.schedule_timeouts_BANG_(app,e__$1);
})();
var refresh_list = com.fulcrologic.fulcro.ui_state_machines.ui_refresh_list(final_env);
com.fulcrologic.fulcro.ui_state_machines.queue_transactions_BANG_(app,final_env);

com.fulcrologic.fulcro.ui_state_machines.queue_mutations_BANG_(app,final_env);

com.fulcrologic.fulcro.ui_state_machines.queue_loads_BANG_(app,final_env);

com.fulcrologic.fulcro.ui_state_machines.update_fulcro_state_BANG_(final_env,state);

return com.fulcrologic.fulcro.ui_state_machines.trigger_queued_events_BANG_(mutation_env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-triggers","com.fulcrologic.fulcro.ui-state-machines/queued-triggers",1577632329).cljs$core$IFn$_invoke$arity$1(final_env),refresh_list);
});
/**
 * Trigger an event on a state machine. Events sent this way will be processed immediately (synchronously) after
 * the handler for the calling handler completes. If you prefer that a trigger happens as a separate transaction
 * then use `trigger!`.
 * 
 *   `env` - is the env in a state machine handler
 *   `asm-id` - The ID of the state machine you want to trigger an event on.
 *   `event` - The event ID you want to send.
 *   `event-data` - A map of data to send with the event
 * 
 *   Returns the updated env.  The actual event will not be sent until this handler finishes.
 */
com.fulcrologic.fulcro.ui_state_machines.trigger = (function com$fulcrologic$fulcro$ui_state_machines$trigger(var_args){
var G__57634 = arguments.length;
switch (G__57634) {
case 3:
return com.fulcrologic.fulcro.ui_state_machines.trigger.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return com.fulcrologic.fulcro.ui_state_machines.trigger.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.ui_state_machines.trigger.cljs$core$IFn$_invoke$arity$3 = (function (env,asm_id,event){
return com.fulcrologic.fulcro.ui_state_machines.trigger.cljs$core$IFn$_invoke$arity$4(env,asm_id,event,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.ui_state_machines.trigger.cljs$core$IFn$_invoke$arity$4 = (function (env,asm_id,event,event_data){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-triggers","com.fulcrologic.fulcro.ui-state-machines/queued-triggers",1577632329),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),asm_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),event,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),event_data], null));
}));

(com.fulcrologic.fulcro.ui_state_machines.trigger.cljs$lang$maxFixedArity = 4);

/**
 * Similar to Fulcro's set-string, but it sets the string on an active state machine's data alias.
 *   event-or-string can be a string or a React DOM onChange event.
 * 
 *   The incoming `event-data` to your handler will include `::uism/alias` and `:value` (if you care to do anything
 *   with the value change event).
 * 
 *   NOTE: Generates a ::uism/value-changed event. If you're state machine is implemented with the events
 *   structure that allows an event-predicate, then this set will be ignored if the current state's event-predicate
 *   returns false.
 */
com.fulcrologic.fulcro.ui_state_machines.set_string_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$set_string_BANG_(this$,active_state_machine_id,alias,event_or_string){
var value = ((typeof event_or_string === 'string')?event_or_string:(function (){var or__5002__auto__ = (function (){var G__57644 = event_or_string;
var G__57644__$1 = (((G__57644 == null))?null:G__57644.target);
if((G__57644__$1 == null)){
return null;
} else {
return G__57644__$1.value;
}
})();
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "";
}
})());
return com.fulcrologic.fulcro.ui_state_machines.trigger_BANG_.cljs$core$IFn$_invoke$arity$4(this$,active_state_machine_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","value-changed","com.fulcrologic.fulcro.ui-state-machines/value-changed",-292687479),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","alias","com.fulcrologic.fulcro.ui-state-machines/alias",466933196),alias,new cljs.core.Keyword(null,"value","value",305978217),value], null));
});
/**
 * Similar to Fulcro's set-value, but it sets the raw value on an active state machine's data alias.
 * 
 *   The incoming `event-data` to your handler will include `::uism/alias` and `:value` (if you care to do anything
 *   with the value change event).
 * 
 *   NOTE: Generates a ::uism/value-changed event. If you're state machine is implemented with the events
 *   structure that allows an event-predicate, then this set will be ignored if the current state's event-predicate
 *   returns false.
 */
com.fulcrologic.fulcro.ui_state_machines.set_value_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$set_value_BANG_(this$,active_state_machine_id,alias,value){
return com.fulcrologic.fulcro.ui_state_machines.trigger_BANG_.cljs$core$IFn$_invoke$arity$4(this$,active_state_machine_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","value-changed","com.fulcrologic.fulcro.ui-state-machines/value-changed",-292687479),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","alias","com.fulcrologic.fulcro.ui-state-machines/alias",466933196),alias,new cljs.core.Keyword(null,"value","value",305978217),value], null));
});
/**
 * Mutation to begin a state machine. Use `begin!` instead.
 */
com.fulcrologic.fulcro.ui_state_machines.begin = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","begin","com.fulcrologic.fulcro.ui-state-machines/begin",-751995886,null));

com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","begin","com.fulcrologic.fulcro.ui-state-machines/begin",-751995886,null),(function (fulcro_mutation_env_symbol){
var map__57653 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"ast","ast",-860334068).cljs$core$IFn$_invoke$arity$1(fulcro_mutation_env_symbol));
var map__57653__$1 = cljs.core.__destructure_map(map__57653);
var params = map__57653__$1;
var asm_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57653__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394));
var event_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57653__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),(function com$fulcrologic$fulcro$ui_state_machines$action(p__57654){
var map__57658 = p__57654;
var map__57658__$1 = cljs.core.__destructure_map(map__57658);
var env = map__57658__$1;
var app = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57658__$1,new cljs.core.Keyword(null,"app","app",-560961707));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57658__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var _STAR_after_render_STAR__orig_val__57659_58175 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__57660_58176 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__57660_58176);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(state,(function (s){
return cljs.core.assoc_in(s,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),asm_id], null),com.fulcrologic.fulcro.ui_state_machines.new_asm(params));
}));

com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event_BANG_(env,(function (){var G__57664 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","started","com.fulcrologic.fulcro.ui-state-machines/started",-1306384334),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),asm_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),cljs.core.PersistentArrayMap.EMPTY], null);
if(cljs.core.truth_(event_data)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57664,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),event_data);
} else {
return G__57664;
}
})());

com.fulcrologic.fulcro.raw.application.schedule_render_BANG_.cljs$core$IFn$_invoke$arity$1(app);
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__57659_58175);
}
return null;
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),(function (env){
var _STAR_after_render_STAR__orig_val__57667 = com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_;
var _STAR_after_render_STAR__temp_val__57668 = true;
(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__temp_val__57668);

try{var temp__5825__auto__ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(new cljs.core.Keyword(null,"app","app",-560961707).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"default-result-action!","default-result-action!",-622954374));
if(cljs.core.truth_(temp__5825__auto__)){
var default_action = temp__5825__auto__;
return (default_action.cljs$core$IFn$_invoke$arity$1 ? default_action.cljs$core$IFn$_invoke$arity$1(env) : default_action.call(null, env));
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = _STAR_after_render_STAR__orig_val__57667);
}})], null);
}));
/**
 * Generate an actor->ident map.
 */
com.fulcrologic.fulcro.ui_state_machines.derive_actor_idents = (function com$fulcrologic$fulcro$ui_state_machines$derive_actor_idents(actors){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$1((function (p__57673){
var vec__57676 = p__57673;
var actor_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57676,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57676,(1),null);
if(cljs.core.truth_((function (){var and__5000__auto__ = com.fulcrologic.fulcro.raw.components.component_instance_QMARK_(v);
if(and__5000__auto__){
return cljs.core.second(com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$1(v));
} else {
return and__5000__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [actor_id,com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$1(v)], null);
} else {
if(cljs.core.truth_((function (){var and__5000__auto__ = com.fulcrologic.fulcro.raw.components.component_class_QMARK_(v);
if(and__5000__auto__){
return cljs.core.second(com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(v,cljs.core.PersistentArrayMap.EMPTY));
} else {
return and__5000__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [actor_id,com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(v,cljs.core.PersistentArrayMap.EMPTY)], null);
} else {
if(edn_query_language.core.ident_QMARK_(v)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [actor_id,v], null);
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",872,28,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["The value given for actor",actor_id,"had (or was) an invalid ident:",v,"See https://book.fulcrologic.com/#err-uism-actor-invalid-ident"], null);
}),null)),null,(365),null,null,null);

return null;

}
}
}
})),actors);
});
/**
 * Calculate the map from actor names to the Fulcro component registry names that represent those actors.
 */
com.fulcrologic.fulcro.ui_state_machines.derive_actor_components = (function com$fulcrologic$fulcro$ui_state_machines$derive_actor_components(actors){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$1((function (p__57687){
var vec__57689 = p__57687;
var actor_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57689,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57689,(1),null);
var temp__5825__auto__ = com.fulcrologic.fulcro.ui_state_machines.any__GT_actor_component_registry_key(v);
if(cljs.core.truth_(temp__5825__auto__)){
var k = temp__5825__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [actor_id,k], null);
} else {
return null;
}
})),actors);
});
/**
 * Install and start a state machine.
 * 
 *   this - A UI component or app
 *   machine - A state machine defined with defstatemachine
 *   instance-id - An ID by which you will refer to this active instance.
 *   actors - A map of actor-names -> The ident, class, or react instance that represent them in the UI. Raw idents do not support SM loads.
 *   started-event-data - Data that will be sent with the ::uism/started event as ::uism/event-data
 */
com.fulcrologic.fulcro.ui_state_machines.begin_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$begin_BANG_(var_args){
var G__57705 = arguments.length;
switch (G__57705) {
case 4:
return com.fulcrologic.fulcro.ui_state_machines.begin_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return com.fulcrologic.fulcro.ui_state_machines.begin_BANG_.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.ui_state_machines.begin_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (this$,machine,instance_id,actors){
return com.fulcrologic.fulcro.ui_state_machines.begin_BANG_.cljs$core$IFn$_invoke$arity$5(this$,machine,instance_id,actors,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.ui_state_machines.begin_BANG_.cljs$core$IFn$_invoke$arity$5 = (function (this$,machine,instance_id,actors,started_event_data){
var actors__GT_idents = com.fulcrologic.fulcro.ui_state_machines.derive_actor_idents(actors);
var actors__GT_component_names = com.fulcrologic.fulcro.ui_state_machines.derive_actor_components(actors);
return com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__57712 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),instance_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-machine-id","com.fulcrologic.fulcro.ui-state-machines/state-machine-id",-1104142583).cljs$core$IFn$_invoke$arity$1(machine),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),started_event_data,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446),actors__GT_component_names,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928),actors__GT_idents], null);
return (com.fulcrologic.fulcro.ui_state_machines.begin.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.ui_state_machines.begin.cljs$core$IFn$_invoke$arity$1(G__57712) : com.fulcrologic.fulcro.ui_state_machines.begin.call(null, G__57712));
})()], null));
}));

(com.fulcrologic.fulcro.ui_state_machines.begin_BANG_.cljs$lang$maxFixedArity = 5);

cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-actor","com.fulcrologic.fulcro.ui-state-machines/target-actor",362646538),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-alias","com.fulcrologic.fulcro.ui-state-machines/target-alias",284018720),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","alias","com.fulcrologic.fulcro.ui-state-machines/alias",466933196),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","alias","com.fulcrologic.fulcro.ui-state-machines/alias",466933196));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-event","com.fulcrologic.fulcro.ui-state-machines/ok-event",2043770126),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-event","com.fulcrologic.fulcro.ui-state-machines/error-event",-1577789384),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-data","com.fulcrologic.fulcro.ui-state-machines/ok-data",664644701),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),cljs.core.map_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-data","com.fulcrologic.fulcro.ui-state-machines/error-data",1731316624),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),cljs.core.map_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation","com.fulcrologic.fulcro.ui-state-machines/mutation",-2113032120),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),new cljs.core.Symbol("cljs.core","symbol?","cljs.core/symbol?",1422196122,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","do-something","com.fulcrologic.fulcro.ui-state-machines/do-something",1808599788,null)),"null"], null), null)))),cljs.spec.alpha.with_gen(cljs.core.symbol_QMARK_,(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","do-something","com.fulcrologic.fulcro.ui-state-machines/do-something",1808599788,null),null], null), null));
})));
com.fulcrologic.fulcro.ui_state_machines.spec_mutation = com.fulcrologic.fulcro.mutations.__GT_Mutation(new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","spec-mutation","com.fulcrologic.fulcro.ui-state-machines/spec-mutation",-1214366849,null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-decl","com.fulcrologic.fulcro.ui-state-machines/mutation-decl",-1004883610),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","with-gen","cljs.spec.alpha/with-gen",1999495028,null),new cljs.core.Symbol("com.fulcrologic.fulcro.mutations","mutation-declaration?","com.fulcrologic.fulcro.mutations/mutation-declaration?",1865681563,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","gen","cljs.spec.alpha/gen",147877780,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","spec-mutation","com.fulcrologic.fulcro.ui-state-machines/spec-mutation",-1214366849,null),"null"], null), null)))),cljs.spec.alpha.with_gen(com.fulcrologic.fulcro.mutations.mutation_declaration_QMARK_,(function (){
return cljs.spec.alpha.gen.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.createAsIfByAssoc([com.fulcrologic.fulcro.ui_state_machines.spec_mutation]));
})));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-context","com.fulcrologic.fulcro.ui-state-machines/mutation-context",1639102703),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-descriptor","com.fulcrologic.fulcro.ui-state-machines/mutation-descriptor",1232629368),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-context","com.fulcrologic.fulcro.ui-state-machines/mutation-context",1639102703),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation","com.fulcrologic.fulcro.ui-state-machines/mutation",-2113032120)], null),new cljs.core.Keyword(null,"opt","opt",-794706369),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.data-targeting","target","com.fulcrologic.fulcro.algorithms.data-targeting/target",-1540673140),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-event","com.fulcrologic.fulcro.ui-state-machines/ok-event",2043770126),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-data","com.fulcrologic.fulcro.ui-state-machines/ok-data",664644701),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-event","com.fulcrologic.fulcro.ui-state-machines/error-event",-1577789384),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-data","com.fulcrologic.fulcro.ui-state-machines/error-data",1731316624),new cljs.core.Keyword("com.fulcrologic.fulcro.mutations","returning","com.fulcrologic.fulcro.mutations/returning",-1484421614),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-remote","com.fulcrologic.fulcro.ui-state-machines/mutation-remote",-672492740)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[null,null,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__57746){
return cljs.core.map_QMARK_(G__57746);
}),(function (G__57746){
return cljs.core.contains_QMARK_(G__57746,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-context","com.fulcrologic.fulcro.ui-state-machines/mutation-context",1639102703));
}),(function (G__57746){
return cljs.core.contains_QMARK_(G__57746,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation","com.fulcrologic.fulcro.ui-state-machines/mutation",-2113032120));
})], null),(function (G__57746){
return ((cljs.core.map_QMARK_(G__57746)) && (((cljs.core.contains_QMARK_(G__57746,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-context","com.fulcrologic.fulcro.ui-state-machines/mutation-context",1639102703))) && (cljs.core.contains_QMARK_(G__57746,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation","com.fulcrologic.fulcro.ui-state-machines/mutation",-2113032120))))));
}),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.data-targeting","target","com.fulcrologic.fulcro.algorithms.data-targeting/target",-1540673140),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-event","com.fulcrologic.fulcro.ui-state-machines/ok-event",2043770126),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-data","com.fulcrologic.fulcro.ui-state-machines/ok-data",664644701),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-event","com.fulcrologic.fulcro.ui-state-machines/error-event",-1577789384),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-data","com.fulcrologic.fulcro.ui-state-machines/error-data",1731316624),new cljs.core.Keyword("com.fulcrologic.fulcro.mutations","returning","com.fulcrologic.fulcro.mutations/returning",-1484421614),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-remote","com.fulcrologic.fulcro.ui-state-machines/mutation-remote",-672492740)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-context","com.fulcrologic.fulcro.ui-state-machines/mutation-context",1639102703),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation","com.fulcrologic.fulcro.ui-state-machines/mutation",-2113032120)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-context","com.fulcrologic.fulcro.ui-state-machines/mutation-context",1639102703),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation","com.fulcrologic.fulcro.ui-state-machines/mutation",-2113032120)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-context","com.fulcrologic.fulcro.ui-state-machines/mutation-context",1639102703),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation","com.fulcrologic.fulcro.ui-state-machines/mutation",-2113032120)], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.data-targeting","target","com.fulcrologic.fulcro.algorithms.data-targeting/target",-1540673140),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-event","com.fulcrologic.fulcro.ui-state-machines/ok-event",2043770126),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-data","com.fulcrologic.fulcro.ui-state-machines/ok-data",664644701),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-event","com.fulcrologic.fulcro.ui-state-machines/error-event",-1577789384),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-data","com.fulcrologic.fulcro.ui-state-machines/error-data",1731316624),new cljs.core.Keyword("com.fulcrologic.fulcro.mutations","returning","com.fulcrologic.fulcro.mutations/returning",-1484421614),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-remote","com.fulcrologic.fulcro.ui-state-machines/mutation-remote",-672492740)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-context","com.fulcrologic.fulcro.ui-state-machines/mutation-context",1639102703))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation","com.fulcrologic.fulcro.ui-state-machines/mutation",-2113032120)))], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.data-targeting","target","com.fulcrologic.fulcro.algorithms.data-targeting/target",-1540673140),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-event","com.fulcrologic.fulcro.ui-state-machines/ok-event",2043770126),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-data","com.fulcrologic.fulcro.ui-state-machines/ok-data",664644701),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-event","com.fulcrologic.fulcro.ui-state-machines/error-event",-1577789384),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-data","com.fulcrologic.fulcro.ui-state-machines/error-data",1731316624),new cljs.core.Keyword("com.fulcrologic.fulcro.mutations","returning","com.fulcrologic.fulcro.mutations/returning",-1484421614),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-remote","com.fulcrologic.fulcro.ui-state-machines/mutation-remote",-672492740)], null)])));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-remote","com.fulcrologic.fulcro.ui-state-machines/mutation-remote",-672492740),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.keyword_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-mutations","com.fulcrologic.fulcro.ui-state-machines/queued-mutations",-652604760),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-descriptor","com.fulcrologic.fulcro.ui-state-machines/mutation-descriptor",1232629368)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-descriptor","com.fulcrologic.fulcro.ui-state-machines/mutation-descriptor",1232629368),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-descriptor","com.fulcrologic.fulcro.ui-state-machines/mutation-descriptor",1232629368),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-descriptor","com.fulcrologic.fulcro.ui-state-machines/mutation-descriptor",1232629368)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__57787){
return cljs.core.coll_QMARK_(G__57787);
})], null),null));
/**
 * Compute a raw Fulcro target based on the possible options.
 * 
 *   `env` - The SM env
 * 
 *   targeting options:
 * 
 *   `:com.fulcrologic.fulcro.algorithms.data-targeting/target explicit-target` - A raw Fulcro data fetch target.
 *   `::uism/target-actor actor-alias` - Helper that can translate an actor alias to a target
 *   `::uism/target-alias field-alias` - Helper that can translate a data alias to a target (ident + field)
 * 
 *   If more than one option is used, then `df/mutliple-targets` will be used to encode them all.
 *   
 */
com.fulcrologic.fulcro.ui_state_machines.compute_target = (function com$fulcrologic$fulcro$ui_state_machines$compute_target(env,p__57790){
var map__57791 = p__57790;
var map__57791__$1 = cljs.core.__destructure_map(map__57791);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57791__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.data-targeting","target","com.fulcrologic.fulcro.algorithms.data-targeting/target",-1540673140));
var target_actor = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57791__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-actor","com.fulcrologic.fulcro.ui-state-machines/target-actor",362646538));
var target_alias = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57791__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-alias","com.fulcrologic.fulcro.ui-state-machines/target-alias",284018720));
var noptions = cljs.core.count(cljs.core.keep.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [target,target_actor,target_alias], null)));
var actor = (cljs.core.truth_(target_actor)?com.fulcrologic.fulcro.ui_state_machines.actor__GT_ident(env,target_actor):null);
var field = (cljs.core.truth_(target_alias)?com.fulcrologic.fulcro.ui_state_machines.resolve_alias(env,target_alias):null);
if((noptions > (1))){
if(cljs.core.truth_((function (){var and__5000__auto__ = target;
if(cljs.core.truth_(and__5000__auto__)){
return com.fulcrologic.fulcro.algorithms.data_targeting.multiple_targets_QMARK_(target);
} else {
return and__5000__auto__;
}
})())){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(target,cljs.core.keep.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [actor,field], null)));
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.algorithms.data_targeting.multiple_targets,cljs.core.keep.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [target,actor,field], null)));
}
} else {
var or__5002__auto__ = target;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = actor;
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return field;
}
}
}
});
var mtrigger_BANG__58189 = (function com$fulcrologic$fulcro$ui_state_machines$mutation_trigger_STAR_(p__57793,actor_ident,asm_id,event,data){
var map__57794 = p__57793;
var map__57794__$1 = cljs.core.__destructure_map(map__57794);
var app = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57794__$1,new cljs.core.Keyword(null,"app","app",-560961707));
var result = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57794__$1,new cljs.core.Keyword(null,"result","result",1415092211));
if(cljs.core.truth_((function (){var and__5000__auto__ = asm_id;
if(cljs.core.truth_(and__5000__auto__)){
return event;
} else {
return and__5000__auto__;
}
})())){
var event_data = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-result","com.fulcrologic.fulcro.ui-state-machines/mutation-result",-1418456314),result);
return com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$3(app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__57797 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),asm_id,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),event,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),event_data], null);
return (com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.cljs$core$IFn$_invoke$arity$1(G__57797) : com.fulcrologic.fulcro.ui_state_machines.trigger_state_machine_event.call(null, G__57797));
})()], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ref","ref",1289896967),actor_ident], null));
} else {
return null;
}
});
com.fulcrologic.fulcro.mutations.mutate.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","mutation-delegate","com.fulcrologic.fulcro.ui-state-machines/mutation-delegate",-2068639436,null),(function (p__57799){
var map__57800 = p__57799;
var map__57800__$1 = cljs.core.__destructure_map(map__57800);
var env = map__57800__$1;
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57800__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var ast = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57800__$1,new cljs.core.Keyword(null,"ast","ast",-860334068));
var app = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57800__$1,new cljs.core.Keyword(null,"app","app",-560961707));
var map__57801 = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(ast);
var map__57801__$1 = cljs.core.__destructure_map(map__57801);
var mp = map__57801__$1;
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57801__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.data-targeting","target","com.fulcrologic.fulcro.algorithms.data-targeting/target",-1540673140));
var asm_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57801__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394));
var error_event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57801__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-event","com.fulcrologic.fulcro.ui-state-machines/error-event",-1577789384));
var mutation_context = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57801__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-context","com.fulcrologic.fulcro.ui-state-machines/mutation-context",1639102703));
var mutation_remote = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57801__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-remote","com.fulcrologic.fulcro.ui-state-machines/mutation-remote",-672492740));
var error_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57801__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-data","com.fulcrologic.fulcro.ui-state-machines/error-data",1731316624));
var ok_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57801__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-data","com.fulcrologic.fulcro.ui-state-machines/ok-data",664644701));
var mutation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57801__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation","com.fulcrologic.fulcro.ui-state-machines/mutation",-2113032120));
var returning = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57801__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.mutations","returning","com.fulcrologic.fulcro.mutations/returning",-1484421614));
var ok_event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57801__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-event","com.fulcrologic.fulcro.ui-state-machines/ok-event",2043770126));
var params = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(mp,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-event","com.fulcrologic.fulcro.ui-state-machines/ok-event",2043770126),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-event","com.fulcrologic.fulcro.ui-state-machines/error-event",-1577789384),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation","com.fulcrologic.fulcro.ui-state-machines/mutation",-2113032120),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-context","com.fulcrologic.fulcro.ui-state-machines/mutation-context",1639102703),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-data","com.fulcrologic.fulcro.ui-state-machines/ok-data",664644701),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-data","com.fulcrologic.fulcro.ui-state-machines/error-data",1731316624),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-remote","com.fulcrologic.fulcro.ui-state-machines/mutation-remote",-672492740),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),new cljs.core.Keyword("com.fulcrologic.fulcro.mutations","returning","com.fulcrologic.fulcro.mutations/returning",-1484421614),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.data-targeting","target","com.fulcrologic.fulcro.algorithms.data-targeting/target",-1540673140)], 0));
var sm_env = com.fulcrologic.fulcro.ui_state_machines.state_machine_env.cljs$core$IFn$_invoke$arity$6(cljs.core.deref(state),null,asm_id,ok_event,ok_data,app);
var actor_ident = com.fulcrologic.fulcro.ui_state_machines.actor__GT_ident(sm_env,mutation_context);
var ast__$1 = edn_query_language.core.query__GT_ast1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.List(null,mutation,(new cljs.core.List(null,params,null,(1),null)),(2),null))], null));
return cljs.core.PersistentArrayMap.createAsIfByAssoc([(function (){var or__5002__auto__ = mutation_remote;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.Keyword(null,"remote","remote",-1593576576);
}
})(),(function (env__$1){
var env__$2 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env__$1,new cljs.core.Keyword(null,"ast","ast",-860334068),ast__$1);
var G__57803 = env__$2;
var G__57803__$1 = (cljs.core.truth_(returning)?com.fulcrologic.fulcro.mutations.returning.cljs$core$IFn$_invoke$arity$2(G__57803,returning):G__57803);
if(cljs.core.truth_(target)){
return com.fulcrologic.fulcro.mutations.with_target(G__57803__$1,target);
} else {
return G__57803__$1;
}
}),new cljs.core.Keyword(null,"result-action","result-action",-1254630246),com.fulcrologic.fulcro.mutations.default_result_action_BANG_,new cljs.core.Keyword(null,"ok-action","ok-action",1253795573),(function (env__$1){
var tid__GT_rid = com.fulcrologic.fulcro.algorithms.tempid.result__GT_tempid__GT_realid(new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(env__$1)));
var actor_ident__$1 = com.fulcrologic.fulcro.algorithms.tempid.resolve_tempids(actor_ident,tid__GT_rid);
var ok_data__$1 = com.fulcrologic.fulcro.algorithms.tempid.resolve_tempids(ok_data,tid__GT_rid);
var asm_id__$1 = com.fulcrologic.fulcro.algorithms.tempid.resolve_tempids(asm_id,tid__GT_rid);
return mtrigger_BANG__58189(env__$1,actor_ident__$1,asm_id__$1,ok_event,ok_data__$1);
}),new cljs.core.Keyword(null,"error-action","error-action",-1147840498),(function (env__$1){
var tid__GT_rid = com.fulcrologic.fulcro.algorithms.tempid.result__GT_tempid__GT_realid(new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(env__$1)));
var actor_ident__$1 = com.fulcrologic.fulcro.algorithms.tempid.resolve_tempids(actor_ident,tid__GT_rid);
var error_data__$1 = com.fulcrologic.fulcro.algorithms.tempid.resolve_tempids(error_data,tid__GT_rid);
var asm_id__$1 = com.fulcrologic.fulcro.algorithms.tempid.resolve_tempids(asm_id,tid__GT_rid);
return mtrigger_BANG__58189(env__$1,actor_ident__$1,asm_id__$1,error_event,error_data__$1);
})]);
}));
/**
 * Run the given REMOTE mutation (a symbol or mutation declaration) in the context of the state machine.
 * 
 *   `env` - The SM handler environment
 *   `actor` - The name (keyword) of a defined actor.
 *   `mutation` - The symbol (or mutation declaration) of the *server* mutation to run. This function will *not* run a local
 *   version of the mutation.
 *   `options-and-params` - The parameters to pass to your mutation. This map can also include these additional
 *   state-machine options:
 * 
 *   `::uism/target-actor actor` - If you use this it will set JUST the `target` (not necessary for loading an actor). Use `::m/returning` to override the type if necessary.
 *   `::uism/target-alias field-alias` - Helper that can translate a data alias to a target (ident + field). You must also use `returning` to specify the normalization type.
 *   `:com.fulcrologic.fulcro.mutations/returning Class` - Class to use for normalizing the result.
 *   `:com.fulcrologic.fulcro.algorithms.data-targeting/target explicit-target` - Target for result
 *   `::uism/ok-event event-id` - The SM event to trigger when the pessimistic mutation succeeds (no default).
 *   `::uism/error-event event-id` - The SM event to trigger when the pessimistic mutation fails (no default).
 *   `::uism/ok-data map-of-data` - Data to include in the event-data on an ok event
 *   `::uism/error-data map-of-data` - Data to include in the event-data on an error event
 *   `::uism/mutation-remote` - The keyword name of the Fulcro remote (defaults to :remote)
 *   `:com.fulcrologic.fulcro.algorithms.tx-processing/abort-id` - An abort ID for being able to cancel the mutation.
 * 
 *   NOTE: The mutation response *will be merged* into the event data that is sent to the SM handler.
 * 
 *   This function does *not* side effect.  It queues the mutation to run after the handler exits.
 */
com.fulcrologic.fulcro.ui_state_machines.trigger_remote_mutation = (function com$fulcrologic$fulcro$ui_state_machines$trigger_remote_mutation(env,actor,mutation,options_and_params){
var target = com.fulcrologic.fulcro.ui_state_machines.compute_target(env,options_and_params);
var abort_id = (function (){var or__5002__auto__ = new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","abort-id","com.fulcrologic.fulcro.algorithms.tx-processing/abort-id",2068829184).cljs$core$IFn$_invoke$arity$1(options_and_params);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.Keyword(null,"abort-id","abort-id",1559937819).cljs$core$IFn$_invoke$arity$1(options_and_params);
}
})();
var asm_id = com.fulcrologic.fulcro.ui_state_machines.asm_id(env);
var mutation_sym = com.fulcrologic.fulcro.mutations.mutation_symbol(mutation);
var mutation_descriptor = (function (){var G__57816 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(options_and_params,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-actor","com.fulcrologic.fulcro.ui-state-machines/target-actor",362646538),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-alias","com.fulcrologic.fulcro.ui-state-machines/target-alias",284018720),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.data-targeting","target","com.fulcrologic.fulcro.algorithms.data-targeting/target",-1540673140)], 0)),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),asm_id,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation","com.fulcrologic.fulcro.ui-state-machines/mutation",-2113032120),mutation_sym,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","mutation-context","com.fulcrologic.fulcro.ui-state-machines/mutation-context",1639102703),actor], 0));
var G__57816__$1 = (cljs.core.truth_(abort_id)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57816,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","abort-id","com.fulcrologic.fulcro.algorithms.tx-processing/abort-id",2068829184),abort_id):G__57816);
if(cljs.core.seq(target)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57816__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.data-targeting","target","com.fulcrologic.fulcro.algorithms.data-targeting/target",-1540673140),target);
} else {
return G__57816__$1;
}
})();
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-mutations","com.fulcrologic.fulcro.ui-state-machines/queued-mutations",-652604760),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),mutation_descriptor);
});
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load-options","com.fulcrologic.fulcro.ui-state-machines/load-options",-2118314091),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),cljs.core.map_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","query-key","com.fulcrologic.fulcro.ui-state-machines/query-key",-1158698423),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword(null,"ident","ident",-742346),new cljs.core.Symbol("edn-query-language.core","ident?","edn-query-language.core/ident?",-1410852474,null)),cljs.spec.alpha.or_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"ident","ident",-742346)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Symbol("edn-query-language.core","ident?","edn-query-language.core/ident?",-1410852474,null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword_QMARK_,edn_query_language.core.ident_QMARK_], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load","com.fulcrologic.fulcro.ui-state-machines/load",178791414),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"opt","opt",-794706369),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","query-key","com.fulcrologic.fulcro.ui-state-machines/query-key",-1158698423),new cljs.core.Keyword("com.fulcrologic.fulcro.components","component-class","com.fulcrologic.fulcro.components/component-class",-316082369),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load-options","com.fulcrologic.fulcro.ui-state-machines/load-options",-2118314091)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[null,null,null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__57818){
return cljs.core.map_QMARK_(G__57818);
})], null),(function (G__57818){
return cljs.core.map_QMARK_(G__57818);
}),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","query-key","com.fulcrologic.fulcro.ui-state-machines/query-key",-1158698423),new cljs.core.Keyword("com.fulcrologic.fulcro.components","component-class","com.fulcrologic.fulcro.components/component-class",-316082369),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load-options","com.fulcrologic.fulcro.ui-state-machines/load-options",-2118314091)], null),cljs.core.PersistentVector.EMPTY,null,cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","query-key","com.fulcrologic.fulcro.ui-state-machines/query-key",-1158698423),new cljs.core.Keyword("com.fulcrologic.fulcro.components","component-class","com.fulcrologic.fulcro.components/component-class",-316082369),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load-options","com.fulcrologic.fulcro.ui-state-machines/load-options",-2118314091)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null)))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","query-key","com.fulcrologic.fulcro.ui-state-machines/query-key",-1158698423),new cljs.core.Keyword("com.fulcrologic.fulcro.components","component-class","com.fulcrologic.fulcro.components/component-class",-316082369),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load-options","com.fulcrologic.fulcro.ui-state-machines/load-options",-2118314091)], null)])));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-loads","com.fulcrologic.fulcro.ui-state-machines/queued-loads",1234134533),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load","com.fulcrologic.fulcro.ui-state-machines/load",178791414)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load","com.fulcrologic.fulcro.ui-state-machines/load",178791414),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load","com.fulcrologic.fulcro.ui-state-machines/load",178791414),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load","com.fulcrologic.fulcro.ui-state-machines/load",178791414)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__57827){
return cljs.core.coll_QMARK_(G__57827);
})], null),null));
/**
 * INTERNAL: Convert SM load options into Fulcro load options.
 */
com.fulcrologic.fulcro.ui_state_machines.convert_load_options = (function com$fulcrologic$fulcro$ui_state_machines$convert_load_options(env,options){
var map__57829 = options;
var map__57829__$1 = cljs.core.__destructure_map(map__57829);
var ok_event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57829__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-event","com.fulcrologic.fulcro.ui-state-machines/ok-event",2043770126));
var ok_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57829__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-data","com.fulcrologic.fulcro.ui-state-machines/ok-data",664644701));
var error_event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57829__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-event","com.fulcrologic.fulcro.ui-state-machines/error-event",-1577789384));
var error_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57829__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-data","com.fulcrologic.fulcro.ui-state-machines/error-data",1731316624));
var target_actor = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57829__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-actor","com.fulcrologic.fulcro.ui-state-machines/target-actor",362646538));
var target_alias = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57829__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-alias","com.fulcrologic.fulcro.ui-state-machines/target-alias",284018720));
var map__57830 = options;
var map__57830__$1 = cljs.core.__destructure_map(map__57830);
var marker = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57830__$1,new cljs.core.Keyword(null,"marker","marker",865118313));
var marker__$1 = (((marker == null))?false:marker);
var map__57831 = env;
var map__57831__$1 = cljs.core.__destructure_map(map__57831);
var asm_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57831__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394));
var options__$1 = (function (){var G__57836 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(options,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-event","com.fulcrologic.fulcro.ui-state-machines/ok-event",2043770126),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","ok-data","com.fulcrologic.fulcro.ui-state-machines/ok-data",664644701),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-event","com.fulcrologic.fulcro.ui-state-machines/error-event",-1577789384),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-data","com.fulcrologic.fulcro.ui-state-machines/error-data",1731316624),new cljs.core.Keyword("com.fulcrologic.fulcro.components","component-class","com.fulcrologic.fulcro.components/component-class",-316082369),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-alias","com.fulcrologic.fulcro.ui-state-machines/target-alias",284018720),new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","target-actor","com.fulcrologic.fulcro.ui-state-machines/target-actor",362646538)], 0)),new cljs.core.Keyword(null,"marker","marker",865118313),marker__$1,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"abort-id","abort-id",1559937819),cljs.core.get.cljs$core$IFn$_invoke$arity$3(options,new cljs.core.Keyword(null,"abort-id","abort-id",1559937819),asm_id),new cljs.core.Keyword(null,"fallback","fallback",761637929),new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","handle-load-error","com.fulcrologic.fulcro.ui-state-machines/handle-load-error",145527222,null),new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([ok_data,new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897).cljs$core$IFn$_invoke$arity$1(options),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),asm_id], null)], 0))], 0));
var G__57836__$1 = (cljs.core.truth_((function (){var or__5002__auto__ = target_actor;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return target_alias;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57836,new cljs.core.Keyword(null,"target","target",253001721),com.fulcrologic.fulcro.ui_state_machines.compute_target(env,options)):G__57836);
var G__57836__$2 = (cljs.core.truth_(ok_event)?cljs.core.update.cljs$core$IFn$_invoke$arity$5(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57836__$1,new cljs.core.Keyword(null,"post-mutation","post-mutation",-1076606705),new cljs.core.Symbol("com.fulcrologic.fulcro.ui-state-machines","trigger-state-machine-event","com.fulcrologic.fulcro.ui-state-machines/trigger-state-machine-event",717825464,null)),new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897),cljs.core.assoc,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-id","com.fulcrologic.fulcro.ui-state-machines/event-id",196307868),ok_event):G__57836__$1);
var G__57836__$3 = (cljs.core.truth_(ok_data)?cljs.core.update.cljs$core$IFn$_invoke$arity$5(G__57836__$2,new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897),cljs.core.assoc,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","event-data","com.fulcrologic.fulcro.ui-state-machines/event-data",742794031),ok_data):G__57836__$2);
var G__57836__$4 = (cljs.core.truth_(error_event)?cljs.core.update.cljs$core$IFn$_invoke$arity$5(G__57836__$3,new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897),cljs.core.assoc,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-event","com.fulcrologic.fulcro.ui-state-machines/error-event",-1577789384),error_event):G__57836__$3);
if(cljs.core.truth_(error_data)){
return cljs.core.update.cljs$core$IFn$_invoke$arity$5(G__57836__$4,new cljs.core.Keyword(null,"post-mutation-params","post-mutation-params",-849425897),cljs.core.assoc,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","error-data","com.fulcrologic.fulcro.ui-state-machines/error-data",1731316624),error_data);
} else {
return G__57836__$4;
}
})();
return options__$1;
});
/**
 * Identical API to fulcro's data fetch `load`, but using a handle `env` instead of a component/app.
 * Adds the load request to then env which will be sent to Fulcro as soon as the handler finishes.
 * 
 * The 3rd argument can be a Fulcro class or a UISM actor name that was registered with `begin!`.
 * 
 *   The `options` can include anything from data fetch's load, but the following additional keys are
 *   more supported for better integration with UISM:
 * 
 *   `::uism/ok-event`:: An event to send when the load is done (instead of calling a mutation)
 *   `::uism/ok-data`:: To send as event-data on the ok-event.
 *   `::uism/error-event`:: The event to send if the load has a network error.
 *   `::uism/error-data`:: To send as event-data on error.
 *   `::uism/target-actor`:: Set target to a given actor's ident. See also `load-actor`.
 *   `::uism/target-alias`:: Set load target to the path defined by the given alias.
 * 
 * NOTE: In general a state machine should declare an actor for items in the machine and use `load-actor` instead of
 * this function so that the state definitions themselves need not be coupled (via code) to the UI.
 */
com.fulcrologic.fulcro.ui_state_machines.load = (function com$fulcrologic$fulcro$ui_state_machines$load(var_args){
var G__57850 = arguments.length;
switch (G__57850) {
case 3:
return com.fulcrologic.fulcro.ui_state_machines.load.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return com.fulcrologic.fulcro.ui_state_machines.load.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.ui_state_machines.load.cljs$core$IFn$_invoke$arity$3 = (function (env,key_or_ident,component_class_or_actor_name){
return com.fulcrologic.fulcro.ui_state_machines.load.cljs$core$IFn$_invoke$arity$4(env,key_or_ident,component_class_or_actor_name,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.ui_state_machines.load.cljs$core$IFn$_invoke$arity$4 = (function (env,key_or_ident,component_class_or_actor_name,options){
var options__$1 = com.fulcrologic.fulcro.ui_state_machines.convert_load_options(env,options);
var class$ = (((component_class_or_actor_name instanceof cljs.core.Keyword))?com.fulcrologic.fulcro.ui_state_machines.actor_class(env,component_class_or_actor_name):component_class_or_actor_name);
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-loads","com.fulcrologic.fulcro.ui-state-machines/queued-loads",1234134533),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),(function (){var G__57855 = cljs.core.PersistentArrayMap.EMPTY;
var G__57855__$1 = (cljs.core.truth_(class$)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57855,new cljs.core.Keyword("com.fulcrologic.fulcro.components","component-class","com.fulcrologic.fulcro.components/component-class",-316082369),class$):G__57855);
var G__57855__$2 = (cljs.core.truth_(key_or_ident)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57855__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","query-key","com.fulcrologic.fulcro.ui-state-machines/query-key",-1158698423),key_or_ident):G__57855__$1);
if(cljs.core.truth_(options__$1)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57855__$2,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load-options","com.fulcrologic.fulcro.ui-state-machines/load-options",-2118314091),options__$1);
} else {
return G__57855__$2;
}
})());
}));

(com.fulcrologic.fulcro.ui_state_machines.load.cljs$lang$maxFixedArity = 4);

/**
 * Load (refresh) the given actor. If the actor *is not* on the UI, then you *must* specify
 * `:com.fulcrologic.fulcro.components/component-class` in the `options` map.
 * 
 * options can contain the normal `df/load` parameters, and also:
 * 
 *   `::comp/component-class` - The defsc name of the component to use for normalization and query. Only needed if the
 *  actor was not declared using a Fulcro component or component class.
 *   `::uism/ok-event`:: An event to send when the load is done (instead of calling a mutation)
 *   `::uism/ok-data`:: To send as event-data on the ok-event.
 *   `::uism/error-event`:: The event to send if the load has a network error.
 *   `::uism/error-data`:: To send as event-data on error.
 * 
 * Adds a load request to then env which will be sent to Fulcro as soon as the handler finishes.
 */
com.fulcrologic.fulcro.ui_state_machines.load_actor = (function com$fulcrologic$fulcro$ui_state_machines$load_actor(var_args){
var G__57860 = arguments.length;
switch (G__57860) {
case 2:
return com.fulcrologic.fulcro.ui_state_machines.load_actor.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.ui_state_machines.load_actor.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.ui_state_machines.load_actor.cljs$core$IFn$_invoke$arity$2 = (function (env,actor_name){
return com.fulcrologic.fulcro.ui_state_machines.load_actor.cljs$core$IFn$_invoke$arity$3(env,actor_name,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.ui_state_machines.load_actor.cljs$core$IFn$_invoke$arity$3 = (function (env,actor_name,p__57863){
var map__57864 = p__57863;
var map__57864__$1 = cljs.core.__destructure_map(map__57864);
var options = map__57864__$1;
var component_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57864__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.components","component-class","com.fulcrologic.fulcro.components/component-class",-316082369));
var options__$1 = com.fulcrologic.fulcro.ui_state_machines.convert_load_options(env,options);
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-loads","com.fulcrologic.fulcro.ui-state-machines/queued-loads",1234134533),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),(function (){var G__57865 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor-name","com.fulcrologic.fulcro.ui-state-machines/actor-name",-147583310),actor_name,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","load-options","com.fulcrologic.fulcro.ui-state-machines/load-options",-2118314091),options__$1], null);
if(cljs.core.truth_(component_class)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__57865,new cljs.core.Keyword("com.fulcrologic.fulcro.components","component-class","com.fulcrologic.fulcro.components/component-class",-316082369),component_class);
} else {
return G__57865;
}
})());
}));

(com.fulcrologic.fulcro.ui_state_machines.load_actor.cljs$lang$maxFixedArity = 3);

/**
 * Run a mutation helper function (e.g. a fn of Fulcro state).
 */
com.fulcrologic.fulcro.ui_state_machines.apply_action = (function com$fulcrologic$fulcro$ui_state_machines$apply_action(var_args){
var args__5732__auto__ = [];
var len__5726__auto___58220 = arguments.length;
var i__5727__auto___58221 = (0);
while(true){
if((i__5727__auto___58221 < len__5726__auto___58220)){
args__5732__auto__.push((arguments[i__5727__auto___58221]));

var G__58222 = (i__5727__auto___58221 + (1));
i__5727__auto___58221 = G__58222;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return com.fulcrologic.fulcro.ui_state_machines.apply_action.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(com.fulcrologic.fulcro.ui_state_machines.apply_action.cljs$core$IFn$_invoke$arity$variadic = (function (env,mutation_helper,args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$5(cljs.core.update,env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","state-map","com.fulcrologic.fulcro.ui-state-machines/state-map",1280764138),mutation_helper,args);
}));

(com.fulcrologic.fulcro.ui_state_machines.apply_action.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(com.fulcrologic.fulcro.ui_state_machines.apply_action.cljs$lang$applyTo = (function (seq57866){
var G__57867 = cljs.core.first(seq57866);
var seq57866__$1 = cljs.core.next(seq57866);
var G__57868 = cljs.core.first(seq57866__$1);
var seq57866__$2 = cljs.core.next(seq57866__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__57867,G__57868,seq57866__$2);
}));

/**
 * Get the name of the active state for an active state machine using a component. If you use this to represent UI changes then you should
 *   include the ident of your state machine instance in the query of the component that uses it so that `shouldComponentUpdate` will
 *   see props change:
 * 
 *   ```
 *   (defsc Component [this props]
 *  {:query (fn [] [ [::uism/asm-id ::my-machine] ...])
 *   ...}
 *  ...
 *  (let [s (get-active-state this ::my-machine)] ...))
 *   ```
 *   
 */
com.fulcrologic.fulcro.ui_state_machines.get_active_state = (function com$fulcrologic$fulcro$ui_state_machines$get_active_state(this$,asm_id){
var state_map = com.fulcrologic.fulcro.raw.application.current_state(com.fulcrologic.fulcro.raw.components.any__GT_app(this$));
var G__57887 = state_map;
var G__57887__$1 = (((G__57887 == null))?null:new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394).cljs$core$IFn$_invoke$arity$1(G__57887));
var G__57887__$2 = (((G__57887__$1 == null))?null:cljs.core.get.cljs$core$IFn$_invoke$arity$2(G__57887__$1,asm_id));
if((G__57887__$2 == null)){
return null;
} else {
return new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193).cljs$core$IFn$_invoke$arity$1(G__57887__$2);
}
});
/**
 * Returns a map that contains the given state-machine's ID and actor state.
 * 
 * `state-map` - The current Fulcro state map
 * `asm-id` - The ID of the state machine of interest.
 */
com.fulcrologic.fulcro.ui_state_machines.current_state_and_actors = (function com$fulcrologic$fulcro$ui_state_machines$current_state_and_actors(state_map,id){
var map__57889 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),id], null));
var map__57889__$1 = cljs.core.__destructure_map(map__57889);
var active_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57889__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193));
var actor__GT_ident = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57889__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928));
var actor__GT_component_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57889__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446));
var props = cljs.core.reduce_kv((function (result,actor,ident){
var cname = (actor__GT_component_name.cljs$core$IFn$_invoke$arity$1 ? actor__GT_component_name.cljs$core$IFn$_invoke$arity$1(actor) : actor__GT_component_name.call(null, actor));
var cls = com.fulcrologic.fulcro.raw.components.registry_key__GT_class(cname);
var query = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(cls);
if(cljs.core.truth_(cls)){
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",1174,23,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["You forgot to give actor",actor,"a :componentName"], null);
}),null)),null,(366),null,null,null);
}

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(result,actor,com.fulcrologic.fulcro.algorithms.denormalize.traced_db__GT_tree(state_map,ident,query));
}),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active-state","active-state",-1185168001),active_state], null),actor__GT_ident);
return props;
});
/**
 * Add a UISM to Fulcro in a manner disconnected from React.
 * 
 * The options map should contain:
 * 
 * * `:state-machine-definition` - The state machine you want to create/use.
 * * `:id` - The ID you want to use for the instance of the state machine.
 * * `:receive-props` - A `(fn [props])` that is called whenever the state changes in a way that affects an actor. The
 *                      `props` is a map that contains the actor props (by actor name `{:actor/x actor-x-props}`) and the current
 *                      state of the state machine as `:active-state`.
 * * `:actors` - The actor definitions. See `begin!`.
 * * `:initial-event-data` - The data to pass to the initial event if the machine is started (not remounted).
 * 
 * This will set up the given state machine under the given ID, and start it (if not
 * already started). Your initial state handler MUST set up actors and otherwise initialize based on initial-event-data.
 * 
 * If the machine is already started at the given ID then this will send it an `:event/remounted` event.
 * 
 * You MUST include `:componentName` in each of your actor's normalizing component options (e.g. `(nc query {:componentName ::uniqueName})`)
 * because UISM requires component appear in the component registry (components cannot be safely stored in app state, just their
 * names).
 * 
 * NOTE: This function automatically supports a very fast variant of props change detection, so you will not receive
 * calls when there is a transaction that does not change the actors/active state of this UISM.
 */
com.fulcrologic.fulcro.ui_state_machines.add_uism_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$add_uism_BANG_(app,p__57899){
var map__57900 = p__57899;
var map__57900__$1 = cljs.core.__destructure_map(map__57900);
var state_machine_definition = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57900__$1,new cljs.core.Keyword(null,"state-machine-definition","state-machine-definition",-64300746));
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57900__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var receive_props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57900__$1,new cljs.core.Keyword(null,"receive-props","receive-props",-391890642));
var actors = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57900__$1,new cljs.core.Keyword(null,"actors","actors",-1845636398));
var initial_event_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57900__$1,new cljs.core.Keyword(null,"initial-event-data","initial-event-data",184944047));
var last_return_value_58229 = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var last_ident_58230 = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
com.fulcrologic.fulcro.raw.application.add_render_listener_BANG_(app,id,(function() { 
var G__58232__delegate = function (args){
var state_map = com.fulcrologic.fulcro.raw.application.current_state(app);
var map__57905 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),id], null));
var map__57905__$1 = cljs.core.__destructure_map(map__57905);
var active_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57905__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","active-state","com.fulcrologic.fulcro.ui-state-machines/active-state",235193193));
var actor__GT_ident = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57905__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->ident","com.fulcrologic.fulcro.ui-state-machines/actor->ident",-1901210928));
var actor__GT_component_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57905__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","actor->component-name","com.fulcrologic.fulcro.ui-state-machines/actor->component-name",-2090352446));
var props = cljs.core.reduce_kv((function (result,actor,ident){
var prior_ident = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(last_ident_58230),actor);
var prior_props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(last_return_value_58229),actor);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(last_ident_58230,cljs.core.assoc,actor,ident);

if(cljs.core.truth_((function (){var or__5002__auto__ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(prior_ident,ident);
if(or__5002__auto__){
return or__5002__auto__;
} else {
return com.fulcrologic.fulcro.algorithms.denormalize.possibly_stale_QMARK_(state_map,prior_props);
}
})())){
var cname = (actor__GT_component_name.cljs$core$IFn$_invoke$arity$1 ? actor__GT_component_name.cljs$core$IFn$_invoke$arity$1(actor) : actor__GT_component_name.call(null, actor));
var cls = com.fulcrologic.fulcro.raw.components.registry_key__GT_class(cname);
var query = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(cls);
if(cljs.core.truth_(cls)){
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.ui-state-machines","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/ui_state_machines.cljc",1221,37,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["You forgot to give actor",actor,"a :componentName"], null);
}),null)),null,(367),null,null,null);
}

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(result,actor,com.fulcrologic.fulcro.algorithms.denormalize.traced_db__GT_tree(state_map,ident,query));
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(result,actor,prior_props);
}
}),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active-state","active-state",-1185168001),active_state], null),actor__GT_ident);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(last_return_value_58229),props)){
return null;
} else {
cljs.core.reset_BANG_(last_return_value_58229,props);

return (receive_props.cljs$core$IFn$_invoke$arity$1 ? receive_props.cljs$core$IFn$_invoke$arity$1(props) : receive_props.call(null, props));
}
};
var G__58232 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__58237__i = 0, G__58237__a = new Array(arguments.length -  0);
while (G__58237__i < G__58237__a.length) {G__58237__a[G__58237__i] = arguments[G__58237__i + 0]; ++G__58237__i;}
  args = new cljs.core.IndexedSeq(G__58237__a,0,null);
} 
return G__58232__delegate.call(this,args);};
G__58232.cljs$lang$maxFixedArity = 0;
G__58232.cljs$lang$applyTo = (function (arglist__58238){
var args = cljs.core.seq(arglist__58238);
return G__58232__delegate(args);
});
G__58232.cljs$core$IFn$_invoke$arity$variadic = G__58232__delegate;
return G__58232;
})()
);

var s = com.fulcrologic.fulcro.raw.application.current_state(app);
var started_QMARK_ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(s,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),id], null));
if(cljs.core.truth_(started_QMARK_)){
return com.fulcrologic.fulcro.ui_state_machines.trigger_BANG_.cljs$core$IFn$_invoke$arity$3(app,id,new cljs.core.Keyword("event","remounted","event/remounted",496340590));
} else {
return com.fulcrologic.fulcro.ui_state_machines.begin_BANG_.cljs$core$IFn$_invoke$arity$5(app,state_machine_definition,id,(function (){var or__5002__auto__ = actors;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})(),initial_event_data);
}
});
/**
 * Remove a previously-added UISM from state and the render listener. The state machine will not receive any
 * (final) events.
 */
com.fulcrologic.fulcro.ui_state_machines.remove_uism_BANG_ = (function com$fulcrologic$fulcro$ui_state_machines$remove_uism_BANG_(app,id){
com.fulcrologic.fulcro.raw.application.remove_render_listener_BANG_(app,id);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366).cljs$core$IFn$_invoke$arity$1(app),cljs.core.update,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","asm-id","com.fulcrologic.fulcro.ui-state-machines/asm-id",232311394),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([id], 0));
});
/**
 * Just like `components/transact!`, but simply queues the transaction to be submitted after the handler completes.
 * Usually you can use `apply-action` to do local state changes, and `trigger-remote-mutation` to do remote operations;
 * however, sometimes external users of a state machine wish to supply ad-hoc operations that should be run by a
 * state machine.
 * 
 * NOTE: It is legal to side-effect in an event handler, but in general the desired operation is to defer
 * the side effects (e.g. `comp/transact!`) until the handler has finished. Running, for example, a synchronous
 * transact inside of a handler will not work as expected because the handler will finish after such a transaction
 * and overwrite the changes to state that such a transaction caused.
 * 
 * So, for example, someone might begin a state machine with:
 * 
 * ```
 * (begin! this machine :id actors {:on-success `[(something-happened)])
 * ```
 * 
 * which the state machine can save with `store`, and later look up with `retrieve`.
 * 
 * `options` is as described in `components/transact!`.
 * 
 */
com.fulcrologic.fulcro.ui_state_machines.transact = (function com$fulcrologic$fulcro$ui_state_machines$transact(var_args){
var G__57916 = arguments.length;
switch (G__57916) {
case 2:
return com.fulcrologic.fulcro.ui_state_machines.transact.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.ui_state_machines.transact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.ui_state_machines.transact.cljs$core$IFn$_invoke$arity$2 = (function (env,txn){
return com.fulcrologic.fulcro.ui_state_machines.transact.cljs$core$IFn$_invoke$arity$3(env,txn,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.ui_state_machines.transact.cljs$core$IFn$_invoke$arity$3 = (function (env,txn,options){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(env,new cljs.core.Keyword("com.fulcrologic.fulcro.ui-state-machines","queued-transactions","com.fulcrologic.fulcro.ui-state-machines/queued-transactions",-998495741),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"txn","txn",-469204789),txn,new cljs.core.Keyword(null,"options","options",99638489),options], null));
}));

(com.fulcrologic.fulcro.ui_state_machines.transact.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=com.fulcrologic.fulcro.ui_state_machines.js.map
