import { Select, Divider, ColorPicker, Tooltip } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  FontColorsOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  RollbackOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TiptapToolbar = ({ editor, activeFormats }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ButtonStyle = ({ active, onClick, icon, tooltip, disabled }: any) => (
    <Tooltip title={tooltip}>
      <button
        className={`w-8 h-8 flex items-center justify-center rounded transition-all duration-200 disabled:opacity-50 ${
          active
            ? "bg-blue-100 text-[#1D2EB6] shadow-sm"
            : "text-[#1D2EB6] hover:bg-gray-100"
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {icon}
      </button>
    </Tooltip>
  );

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md shadow-blue-600/50">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1 border-b border-gray-200 bg-white rounded-t-lg ">
        {/* Undo / Redo */}
        <div className="flex items-center gap-1">
          <ButtonStyle
            onClick={() => editor.chain().focus().undo().run()}
            icon={
              <RollbackOutlined
                style={{
                  fontSize: "20px",
                  width: "20px",
                  height: "20px",
                }}
              />
            }
            disabled={!editor.can().undo()}
            tooltip="Deshacer (Ctrl+Z)"
          />
          <ButtonStyle
            onClick={() => editor.chain().focus().redo().run()}
            icon={
              <RollbackOutlined
                style={{
                  fontSize: "20px",
                  width: "20px",
                  height: "20px",
                }}
                className="rotate-y-180"
              />
            }
            disabled={!editor.can().redo()}
            tooltip="Rehacer (Ctrl+Y)"
          />
        </div>

        <Divider type="vertical" className="h-6" />

        {/* Font Family */}
        <Select
          defaultValue="Montserrat"
          size="small"
          onChange={(value) =>
            editor.chain().focus().setFontFamily(value).run()
          }
          bordered={false}
          options={[
            { value: "montserrat", label: "Montserrat" },
            { value: "arial", label: "Arial" },
            { value: "times", label: "Times New Roman" },
            { value: "courier", label: "Courier New" },
          ]}
        />

        <Divider type="vertical" className="h-6" />

        {/* Font Size */}
        <Select
          placeholder={
            <FontSizeOutlined
              style={{
                fontSize: "20px",
                width: "20px",
                height: "20px",
                color: "#1D2EB6",
              }}
            />
          }
          optionFilterProp="label"
          bordered={false}
          size="small"
          onChange={(value) => {
            if (value === "pequeño") {
              editor
                .chain()
                .focus()
                .setParagraph()
                .setMark("textStyle", { fontSize: "12px" })
                .run();
            }
            if (value === "normal") {
              editor
                .chain()
                .focus()
                .setParagraph()
                .unsetMark("textStyle")
                .run();
            }
            if (value === "grande") {
              editor.chain().focus().setHeading({ level: 4 }).run();
            }
            if (value === "enorme") {
              editor.chain().focus().setHeading({ level: 2 }).run();
            }
          }}
          options={[
            { value: "pequeño", label: "Pequeño" },
            { value: "normal", label: "Normal" },
            { value: "grande", label: "Grande" },
            { value: "enorme", label: "Enorme" },
          ]}
        />

        <Divider type="vertical" className="h-6" />

        {/* Format buttons */}
        <ButtonStyle
          active={activeFormats.bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={
            <BoldOutlined
              style={{
                fontSize: "20px",
                width: "20px",
                height: "20px",
              }}
            />
          }
          tooltip="Negrita (Ctrl+B)"
        />

        <ButtonStyle
          active={activeFormats.italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={
            <ItalicOutlined
              style={{
                fontSize: "20px",
                width: "20px",
                height: "20px",
              }}
            />
          }
          tooltip="Cursiva (Ctrl+I)"
        />

        <ButtonStyle
          active={activeFormats.underline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          icon={
            <UnderlineOutlined
              style={{
                fontSize: "20px",
                width: "20px",
                height: "20px",
              }}
            />
          }
          tooltip="Subrayado (Ctrl+U)"
        />

        {/* Text Color */}
        <Tooltip title="Color de texto">
          <ColorPicker
            size="small"
            onChange={(color) => {
              editor.chain().focus().setColor(color.toHexString()).run();
            }}
          >
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-[#1D2EB6] transition-colors">
              <FontColorsOutlined
                style={{
                  fontSize: "20px",
                  width: "20px",
                  height: "20px",
                }}
              />
            </button>
          </ColorPicker>
        </Tooltip>

        <Divider type="vertical" className="h-6 mx-1" />

        {/* Alignment */}
        <Select
          placeholder={
            <AlignLeftOutlined
              style={{
                fontSize: "20px",
                width: "20px",
                height: "20px",
                color: "#1D2EB6",
              }}
            />
          }
          optionFilterProp="label"
          size="small"
          variant="borderless"
          onChange={(value) => {
            if (value === "left")
              editor.chain().focus().setTextAlign("left").run();
            if (value === "center")
              editor.chain().focus().setTextAlign("center").run();
            if (value === "right")
              editor.chain().focus().setTextAlign("right").run();
          }}
          options={[
            {
              value: "left",
              label: (
                <AlignLeftOutlined
                  style={{
                    fontSize: "20px",
                    width: "20px",
                    height: "20px",
                    color: "#1D2EB6",
                  }}
                />
              ),
            },
            {
              value: "center",
              label: (
                <AlignCenterOutlined
                  style={{
                    fontSize: "20px",
                    width: "20px",
                    height: "20px",
                    color: "#1D2EB6",
                  }}
                />
              ),
            },
            {
              value: "right",
              label: (
                <AlignRightOutlined
                  style={{
                    fontSize: "20px",
                    width: "20px",
                    height: "20px",
                    color: "#1D2EB6",
                  }}
                />
              ),
            },
          ]}
        />
        {/* Lists */}
        <ButtonStyle
          active={activeFormats.bulletList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          icon={
            <UnorderedListOutlined
              style={{
                fontSize: "20px",
                width: "20px",
                height: "20px",
              }}
            />
          }
          tooltip="Lista con viñetas"
        />

        <ButtonStyle
          active={activeFormats.orderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          icon={
            <OrderedListOutlined
              style={{
                fontSize: "20px",
                width: "20px",
                height: "20px",
              }}
            />
          }
          tooltip="Lista numerada"
        />

        <Divider type="vertical" className="h-6 mx-1" />
      </div>

      <style jsx global>{`
        .ProseMirror {
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .ProseMirror h2 {
          font-size: 24px;
          font-weight: bold;
          margin: 1rem 0;
        }
        .ProseMirror h4 {
          font-size: 18px;
          font-weight: bold;
          margin: 0.75rem 0;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .ProseMirror ul li {
          list-style-type: disc;
        }
        .ProseMirror ol li {
          list-style-type: decimal;
        }
      `}</style>
    </div>
  );
};

export default TiptapToolbar;
