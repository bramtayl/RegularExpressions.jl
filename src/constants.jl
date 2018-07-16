const SIMPLES = Dict(
    :anything => '.',
    :start => '^',
    :end => '$'
)

"Shortcut components"
const ESCAPES = Dict(
    :alarm => 'a',
    :strict_start => 'A',
    :word_boundary => 'b',
    :unit => 'C',
    :digit => 'd',
    :escape => 'e',
    :feed => 'f',
    :horizontal_space => 'h',
    :reset => 'k',
    :newline => 'n',
    :return => 'r',
    :newlines => 'R',
    :space => 's',
    :tab => 't',
    :U => 'U',
    :vertical_space => 'v',
    :word_character => 'w',
    :unicode_cluster => 'X',
    :end => 'z',
    :end_newline => 'Z'
)

"Character classes"
const CLASSES = Dict(
    :letter_or_digit => :alnum,
    :letter => :alpha,
    :standard => :ascii,
    :blank => :blank,
    :control => :cntrl,
    :digit => :digit,
    :visible => :graph,
    :lowercase => :lower,
    :prints => :print,
    :punctuation => :punct,
    :space => :space,
    :uppercase => :upper,
    :word => :word,
    :hex => :xdigit
)

"Character property classes"
const PROPERTIES = Dict(
    :other => ('C', Dict(
        :control => :c,
        :format => :f,
        :unassigned => :n,
        :private => :o,
        :surrogate => :s
    )),
    :letter => ('L', Dict(
        :lowercase => :l,
        :modifier => :m,
        :other => :o,
        :uppercase => :u,
        :titlecase => :t,
        :cased => Symbol("&")
    )),
    :mark => ('M', Dict(
        :spacing => :c,
        :enclosing => :e,
        :non_spacing => :n
    )),
    :digit => ('N', Dict(
        :decimal => :d,
        :letter => :l,
        :other => :o
    )),
    :punctuation => ('P', Dict(
        :connector => :c,
        :dash => :d,
        :close => :e,
        :final => :f,
        :initial => :i,
        :other => :o,
        :open => :s
    )),
    :symbol => ('S', Dict(
        :currency => :c,
        :modifier => :k,
        :math => :m,
        :other => :o
    )),
    :seperator => ('Z', Dict(
        :line => :l,
        :paragraph => :p,
        :space => :s
    )),
    :special => ('X', Dict(
        :letter_or_digit => :an,
        :POSIX_space => :ps,
        :Perl_space => :sp,
        :named => :uc,
        :Perl_word_character => :wd
    ))
)

# OPTION SETTING, NEWLINE CONVENTION, WHAT \R MATCHES
const OPTIONS_SUB_ROUTINE = Dict(
    :caseless => :i,
    :allow_duplicate_names => :J,
    :multiline => :m,
    :no_autocapture => :n,
    :single_line => :s,
    :default_ungreedy => :U,
    :extended => :x,
    :tab_extended => :xx,
    :recurse => :R
)

const START_OPTIONS_BACKTRACKING = Dict(
    :any_unicode_newline => "ANY",
    :any_newlines => "ANYCRLF",
    :any_boundary => "BSR_ANYCRLF",
    :unicode_newlines => "BSR_UNICODE",
    :return_only => "CR",
    :return_then_linefeed_only => "CRLF",
    :linefeed_only => "LF",
    :not_empty_matching => "NOTEMPTY",
    :not_empty_at_start_matching => "NOTEMPTY_ATSTART",
    :no_auto_possessification => "NO_AUTO_POSSESS",
    :no_dot_star_anchoring => "NO_DOTSTAR_ANCHOR",
    :no_just_in_time_optimization => "NO_JIT",
    :no_start_match_optimization => "NO_START_OPT",
    :NUL_only => "NUL",
    :appropriate_UTF_mode => "UTF",
    :use_unicode_properties => "UCP",
    :accept => "ACCEPT",
    :fail => "FAIL",
    :mark_name => "MARK:NAME",
    :commit => "COMMIT",
    :prune => "PRUNE",
    :skip => "SKIP",
    :skip_name => "SKIP:NAME",
    :then => "THEN",
    :then_name => "THEN:NAME"
)

KEYWORD_OPTIONS = Dict(
    :backtracking_limit => :LIMIT_DEPTH,
    :heap_size_limit => :LIMIT_HEAP,
    :match_limit => :LIMIT_MATCH
)

BACKTRACING = Dict(

)

const SCRIPTS = Set([
    :Ahom, :Anatolian_Hieroglyphs, :Arabic, :Armenian, :Avestan, :Balinese,
    :Bamum, :Bassa_Vah, :Batak, :Bengali, :Bopomofo, :Brahmi, :Braille,
    :Buginese, :Buhid, :Canadian_Aboriginal, :Carian, :Caucasian_Albanian,
    :Chakma, :Cham, :Cherokee, :Common, :Coptic, :Cuneiform, :Cypriot,
    :Cyrillic, :Deseret, :Devanagari, :Duployan, :Egyptian_Hieroglyphs,
    :Elbasan, :Ethiopic, :Georgian, :Glagolitic, :Gothic, :Grantha, :Greek,
    :Gujarati, :Gurmukhi, :Han, :Hangul, :Hanunoo, :Hatran, :Hebrew, :Hiragana,
    :Imperial_Aramaic, :Inherited, :Inscriptional_Pahlavi,
    :Inscriptional_Parthian, :Javanese, :Kaithi, :Kannada, :Katakana, :Kayah_Li,
    :Kharoshthi, :Khmer, :Khojki, :Khudawadi, :Lao, :Latin, :Lepcha, :Limbu,
    :Linear_A, :Linear_B, :Lisu, :Lycian, :Lydian, :Mahajani, :Malayalam,
    :Mandaic, :Manichaean, :Meetei_Mayek, :Mende_Kikakui, :Meroitic_Cursive,
    :Meroitic_Hieroglyphs, :Miao, :Modi, :Mongolian, :Mro, :Multani, :Myanmar,
    :Nabataean, :New_Tai_Lue, :Nko, :Ogham, :Ol_Chiki, :Old_Hungarian,
    :Old_Italic, :Old_North_Arabian, :Old_Permic, :Old_Persian,
    :Old_South_Arabian, :Old_Turkic, :Oriya, :Osmanya, :Pahawh_Hmong,
    :Palmyrene, :Pau_Cin_Hau, :Phags_Pa, :Phoenician, :Psalter_Pahlavi, :Rejang,
    :Runic, :Samaritan, :Saurashtra, :Sharada, :Shavian, :Siddham, :SignWriting,
    :Sinhala, :Sora_Sompeng, :Sundanese, :Syloti_Nagri, :Syriac, :Tagalog,
    :Tagbanwa, :Tai_Le, :Tai_Tham, :Tai_Viet, :Takri, :Tamil, :Telugu, :Thaana,
    :Thai, :Tibetan, :Tifinagh, :Tirhuta, :Ugaritic, :Vai, :Warang_Citi, :Yi
])
