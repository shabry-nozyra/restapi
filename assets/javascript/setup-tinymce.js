function initialiseInstance(editor) {
    //This script taken from www.matthewkenny.com 
    var container = $('#' + editor.editorId);
    $(editor.formElement).find("input[type=submit]").click(
        function (event) {
            tinyMCE.triggerSave();
            $("#" + editor.id).valid();
            container.val(editor.getContent());
        }
    );
}

tinymce.init({
    selector: 'textarea.content',
    plugins: 'print preview fullpage importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons code ',
    menubar: 'file edit view insert format tools table ',
    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview print | insertfile image media link anchor codesample | ltr rtl | code',
    image_advtab: true,
    content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i'
    ],
    extended_valid_elements: ' i[class]',
    relative_urls: false,
    remove_script_host: false,
    convert_urls: true,
    document_base_url: 'http://portalberita/',



    height: 600,
    image_caption: true,
    forced_root_block: false,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: "mceNonEditable",
    toolbar_drawer: 'sliding',
    spellchecker_dialog: true,
    spellchecker_whitelist: ['Ephox', 'Moxiecode'],
    contextmenu: "link image imagetools table configurepermanentpen",
    setup: function (editor) {
        editor.on('change', function () {
            editor.save();
        });
    },

});