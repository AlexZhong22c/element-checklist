import Vue from 'vue';
const vue = new Vue();

export const emitShowLabelArrayDialog = params => vue.$emit('showLabelArrayDialog', params);
export const listenShowLabelArrayDialog = cb => vue.$on('showLabelArrayDialog', cb);

export const emitSubmitLabelArrayDialog = params => vue.$emit('submitLabelArrayDialog', params);
export const listenSubmitLabelArrayDialog = cb => vue.$on('submitLabelArrayDialog', cb);
