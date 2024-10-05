CURRENT_DIR := $(abspath $(dir $(lastword $(MAKEFILE_LIST))))
PROTO_SOURCE := ${CURRENT_DIR}/proto
BACK := ${CURRENT_DIR}/back
DESKTOP := ${CURRENT_DIR}/desktop

PROTO_TARGET_BACK := ${BACK}/src/generated
PROTO_TARGET_DESKTOP := ${DESKTOP}/generated

proto_py:
	cd ${BACK} && \
	rm -fr ${PROTO_TARGET_BACK}/* && \
	pipenv run python -m grpc_tools.protoc \
	--proto_path ${PROTO_SOURCE} \
	--python_out=${PROTO_TARGET_BACK} \
	--grpc_python_out=${PROTO_TARGET_BACK} \
	${PROTO_SOURCE}/*.proto && \
	find ${PROTO_TARGET_BACK} -type f -name "*.py" \
	-exec sed -i '' \
	-E 's/import ([_a-zA-Z0-9]+_pb2)/from . import \1/g' {} \; \
	-exec sed -i '' -E 's/import ([_a-zA-Z0-9]+_grpc)/from . import \1/g' {} \;
proto_desktop:
	cd ${DESKTOP} && \
	npx grpc_tools_node_protoc \
	--js_out=import_style=commonjs,binary:${PROTO_TARGET_DESKTOP} \
	--grpc_out=grpc_js:${PROTO_TARGET_DESKTOP} \
	--ts_out=grpc_js:${PROTO_TARGET_DESKTOP} \
	--proto_path=${PROTO_SOURCE} \
	${PROTO_SOURCE}/*.proto
proto_gen:
	make proto_py && make proto_desktop
install_deps:
	cd ${BACK} && \
	pipenv sync && \
	cd ${DESKTOP} && \
	npm i
start_back:
	cd ${BACK} && pipenv run python ./src/main.py